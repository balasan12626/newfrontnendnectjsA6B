import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard | Boult.neu',
  description: 'Admin dashboard for Boult.neu e-commerce platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for admin authentication
  const cookieStore = cookies();
  const adminToken = cookieStore.get('admin-token');

  // If not authenticated and not on login page, redirect to admin login
  if (!adminToken && !window.location.pathname.includes('/admin/login')) {
    redirect('/admin/login');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}