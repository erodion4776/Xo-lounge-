export type Product = {
  id: string;
  name: string;
  category: string;
  cost_price: number;
  sale_price: number;
  stock_quantity: number;
  low_stock_alert: number;
  created_at: string;
};

export type StaffSale = {
  id: string;
  staff_name: string;
  product_id: string;
  quantity_sold: number;
  total_sale_amount: number;
  profit: number;
  created_at: string;
};

export type Staff = {
  id: string;
  name: string;
  role: 'chef' | 'bartender' | 'waiter' | 'admin';
  email: string;
  phone: string;
  created_at: string;
};
