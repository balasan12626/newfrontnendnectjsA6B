import { Metadata } from 'next';
import ProfileLayout from '@/components/profile/profile-layout';
import SecuritySettings from '@/components/profile/security-settings';

export const metadata: Metadata = {
  title: 'Security Settings | Boult.neu',
  description: 'Manage your account security settings and passwords.',
};

export default function SecurityPage() {
  return (
    <ProfileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground">
            Manage your account security settings and passwords.
          </p>
        </div>
        
        <SecuritySettings />
      </div>
    </ProfileLayout>
  );
}