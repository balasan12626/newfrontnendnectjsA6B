import Link from 'next/link';
import { Metadata } from 'next';
import RegisterForm from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Register | Boult.neu',
  description: 'Create a new account to shop at Boult.neu.',
};

export default function RegisterPage() {
  return (
    <div className="container flex min-h-[calc(100vh-65px-200px)] items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}