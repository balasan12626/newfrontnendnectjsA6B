import Link from 'next/link';
import { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login | Boult.neu',
  description: 'Login to your Boult.neu account to manage orders, addresses, and more.',
};

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-65px-200px)] items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}