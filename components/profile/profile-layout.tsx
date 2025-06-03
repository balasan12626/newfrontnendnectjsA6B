import Link from 'next/link';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Heart, 
  Bell, 
  Settings,
  LockKeyhole
} from 'lucide-react';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="h-full w-full md:border-r md:pr-6">
          <nav className="sticky top-20 space-y-1">
            <ProfileNavLink href="/profile" icon={User}>
              My Profile
            </ProfileNavLink>
            <ProfileNavLink href="/profile/orders" icon={ShoppingBag}>
              Orders
            </ProfileNavLink>
            <ProfileNavLink href="/profile/addresses" icon={MapPin}>
              Addresses
            </ProfileNavLink>
            <ProfileNavLink href="/profile/payment-methods" icon={CreditCard}>
              Payment Methods
            </ProfileNavLink>
            <ProfileNavLink href="/profile/wishlist" icon={Heart}>
              Wishlist
            </ProfileNavLink>
            <ProfileNavLink href="/profile/notifications" icon={Bell}>
              Notifications
            </ProfileNavLink>
            <ProfileNavLink href="/profile/security" icon={LockKeyhole}>
              Security
            </ProfileNavLink>
            <ProfileNavLink href="/profile/settings" icon={Settings}>
              Settings
            </ProfileNavLink>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="min-h-[500px]">
          {children}
        </main>
      </div>
    </div>
  );
}

interface ProfileNavLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function ProfileNavLink({ href, icon: Icon, children }: ProfileNavLinkProps) {
  // In a real app, you would use usePathname() from next/navigation to check if the link is active
  const isActive = href === '/profile';
  
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm ${
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  );
}