import { LoginForm } from '@/components/LoginForm'; // Import the new component

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark-card rounded-xl shadow-2xl border border-gold-dark/50">
        <h1 className="text-3xl font-bold text-center text-gold-accent">XO Sales Manager</h1>
        <p className="text-center text-gold-light/70">Staff Login</p>
        
        {/* Render the Client Component Login Form */}
        <LoginForm />
        
      </div>
    </div>
  );
}
