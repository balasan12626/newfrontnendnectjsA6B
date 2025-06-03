import { Metadata } from 'next';
import ProfileLayout from '@/components/profile/profile-layout';
import ProfileDetails from '@/components/profile/profile-details';

export const metadata: Metadata = {
  title: 'My Profile | Boult.neu',
  description: 'Manage your personal information and account settings.',
};

export default function ProfilePage() {
  return (
    <ProfileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings.
          </p>
        </div>
        
        <ProfileDetails />
      </div>
    </ProfileLayout>
  );
}