'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    twoFactorEnabled: z.boolean().default(false),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordValues = z.infer<typeof passwordSchema>;

export default function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false,
    },
  });
  
  // Watch the newPassword field to show password strength
  const newPassword = form.watch('newPassword');
  
  // Password strength checks
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);
  
  // Calculate strength score (0-4)
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  // Get strength label and color
  const getStrengthLabel = () => {
    if (strengthScore === 0) return { label: 'Very Weak', color: 'bg-destructive' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-destructive' };
    if (strengthScore <= 3) return { label: 'Medium', color: 'bg-amber-500' };
    if (strengthScore <= 4) return { label: 'Strong', color: 'bg-green-500' };
    return { label: 'Very Strong', color: 'bg-green-600' };
  };
  
  const strengthInfo = getStrengthLabel();
  
  async function onSubmit(data: PasswordValues) {
    setIsLoading(true);
    
    try {
      // In a real app, you would call your API
      console.log('Security update data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password updated successfully');
      form.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: data.twoFactorEnabled,
      });
    } catch (error) {
      console.error('Password update failed:', error);
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        disabled={isLoading}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showCurrentPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        disabled={isLoading}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showNewPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  
                  {newPassword && (
                    <div className="mt-2 space-y-2">
                      <div className="space-y-1">
                        <div className="text-sm">Password strength: <span className="font-medium">{strengthInfo.label}</span></div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full transition-all ${strengthInfo.color}`}
                            style={{ width: `${(strengthScore / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          {hasMinLength ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span>At least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {hasUppercase ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span>At least one uppercase letter</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {hasLowercase ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span>At least one lowercase letter</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {hasNumber ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span>At least one number</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {hasSpecialChar ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span>At least one special character</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Updating password...' : 'Update password'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      {/* Two-Factor Authentication Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Two-Factor Authentication</h2>
        
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Enhanced Security Feature</AlertTitle>
          <AlertDescription>
            Two-factor authentication adds an extra layer of security to your account by requiring 
            a verification code in addition to your password when signing in.
          </AlertDescription>
        </Alert>
        
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="twoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable Two-Factor Authentication
                    </FormLabel>
                    <FormDescription>
                      Receive a verification code via email or authentication app when signing in.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch('twoFactorEnabled') && (
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication is enabled. You will receive a verification code 
                  each time you sign in to verify your identity.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" type="button">
                    Configure Authentication App
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
      
      {/* Recent Activities Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent Activities</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-4">
            <div>
              <p className="font-medium">Login from new device</p>
              <p className="text-sm text-muted-foreground">Windows PC - Chrome Browser</p>
            </div>
            <div className="text-right">
              <p className="text-sm">3 days ago</p>
              <p className="text-sm text-muted-foreground">192.168.1.1</p>
            </div>
          </div>
          
          <div className="flex justify-between border-b pb-4">
            <div>
              <p className="font-medium">Password changed</p>
              <p className="text-sm text-muted-foreground">Security settings updated</p>
            </div>
            <div className="text-right">
              <p className="text-sm">1 week ago</p>
              <p className="text-sm text-muted-foreground">192.168.1.1</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Account created</p>
              <p className="text-sm text-muted-foreground">Welcome to Boult.neu</p>
            </div>
            <div className="text-right">
              <p className="text-sm">2 weeks ago</p>
              <p className="text-sm text-muted-foreground">192.168.1.1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}