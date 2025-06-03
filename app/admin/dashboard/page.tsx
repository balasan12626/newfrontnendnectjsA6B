import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Admin | Boult.neu',
  description: 'Admin dashboard overview',
};

export default function AdminDashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to the Boult.neu admin dashboard
      </p>
    </div>
  );
}