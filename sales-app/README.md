# 💰 XO Sales Manager: Sales & Inventory Web App

A complete, responsive Sales and Inventory Management solution built for staff and administration at XO Lounge.

## ✨ Stack & Features

| Category | Details |
| :--- | :--- |
| **Frontend Framework** | **Next.js 14 (App Router)** with Server Actions |
| **Styling** | **Tailwind CSS** (Custom Dark + Gold Theme) |
| **Language** | **TypeScript** |
| **Database & Auth** | **Supabase** (Postgres & Email/Password Auth) |
| **Hosting** | **Netlify** |
| **Features** | Staff Login, Automated Stock Deduction, Real-time Profit Calculation, Low Stock Alerts, Admin Product CRUD. |

## 🚀 Quick Start (Local Setup)

1.  **Clone the Repository**
    ```bash
    git clone [YOUR_REPO_URL] xo-sales-manager
    cd xo-sales-manager
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a file named **`.env.local`** in the project root and add your Supabase credentials:
    ```
    # Supabase Credentials
    NEXT_PUBLIC_SUPABASE_URL=https://jmfbwqvyyiogjtywszfd.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZmJ3cXZ5eWlvZ2p0eXdzemZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzk4NjQsImV4cCI6MjA3NjcxNTg2NH0.ArccKuGvsyw_qMuzvBC8_AsG-u0deuGZ3PH67Miz_sk
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Supabase Setup (Database & Security)

### 1. Create Tables

Execute the following SQL commands in your Supabase SQL Editor.

```sql
-- 1. products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category text,
  cost_price float NOT NULL,
  sale_price float NOT NULL,
  stock_quantity int NOT NULL DEFAULT 0,
  low_stock_alert int NOT NULL DEFAULT 10,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. staff_sales table
CREATE TABLE staff_sales (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_name text NOT NULL,
  product_id uuid REFERENCES products(id),
  quantity_sold int NOT NULL,
  total_sale_amount float NOT NULL,
  profit float NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. staff table (for user roles/info)
CREATE TABLE staff (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL, -- e.g., 'admin', 'waiter'
  email text UNIQUE NOT NULL,
  phone text,
  created_at timestamp with time zone DEFAULT now()
);
