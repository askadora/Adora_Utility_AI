'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useSearchParams } from 'next/navigation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import UserInfoCard from '@/components/user-profile/UserInfoCard';
import UserMetaCard from '@/components/user-profile/UserMetaCard';
import UserAddressCard from '@/components/user-profile/UserAddressCard';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Link from 'next/link';

type SettingsTab = 'general' | 'profile' | 'adoralink' | 'access-permissions' | 'ai-models' | 'usage-billing' | 'security' | 'integrations' | 'team';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [accessPermissionsTab, setAccessPermissionsTab] = useState<'team' | 'companies' | 'roles'>('team');

  // Handle URL parameters for direct tab navigation
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['general', 'profile', 'adoralink', 'access-permissions', 'ai-models', 'usage-billing', 'security', 'integrations', 'team'].includes(tabParam)) {
      setActiveTab(tabParam as SettingsTab);
    }
  }, [searchParams]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [cuAccordionOpen, setCuAccordionOpen] = useState(false);

  // Profile-related state
  const { profile, loading: profileLoading, error: profileError } = useUserProfile();
  const { session } = useAuth();
  const { isOpen: isProfileModalOpen, openModal: openProfileModal, closeModal: closeProfileModal } = useModal();
  const [profileFormData, setProfileFormData] = useState({
    bio: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    address: "",
    facebook: "",
    x: "",
    linkedin: "",
    instagram: "",
    phone: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);

  // Initialize profile form data when profile loads
  useEffect(() => {
    if (profile) {
      setProfileFormData({
        bio: profile.bio || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
        zipCode: profile.zipCode || "",
        address: profile.address || "",
        facebook: profile.facebook || "",
        x: profile.x || "",
        linkedin: profile.linkedin || "",
        instagram: profile.instagram || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  // Profile form handlers
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSave = async () => {
    try {
      console.log('Saving profile...');
      setIsSavingProfile(true);
      setProfileSaveError(null);

      if (!session?.user) {
        throw new Error("Please sign in to update your profile");
      }

      // Format social media URLs
      const formatUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
      };

      const formattedData = {
        auth_user_id: session.user.id,
        bio: profileFormData.bio,
        city: profileFormData.city,
        state: profileFormData.state,
        country: profileFormData.country,
        zip_code: profileFormData.zipCode,
        address: profileFormData.address,
        facebook: formatUrl(profileFormData.facebook),
        x: formatUrl(profileFormData.x),
        linkedin: formatUrl(profileFormData.linkedin),
        instagram: formatUrl(profileFormData.instagram),
        phone: profileFormData.phone
      };

      console.log('Updating profile with data:', formattedData);

      // Call the update_user_profile function
      const { data, error } = await supabase
        .rpc('update_user_profile', formattedData);

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Profile updated successfully:', data);
      closeProfileModal();
      // Add a small delay before reloading to ensure the user sees the success state
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("Error saving profile:", {
        error: err,
        message: err instanceof Error ? err.message : "Unknown error",
        stack: err instanceof Error ? err.stack : undefined
      });
      setProfileSaveError(err instanceof Error ? err.message : "Failed to save profile changes. Please check your internet connection and try again.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // AdoraLink Settings State
  const [adoraLinkActiveTab, setAdoraLinkActiveTab] = useState<'alerts' | 'channels' | 'preferences'>('alerts');
  const [alertSettings, setAlertSettings] = useState([
    { level: 'L3', enabled: true, channels: ['email', 'sms', 'push'], threshold: 80 },
    { level: 'L2', enabled: true, channels: ['email', 'push'], threshold: 60 },
    { level: 'L1', enabled: true, channels: ['push'], threshold: 40 },
    { level: 'L0', enabled: false, channels: [], threshold: 0 }
  ]);
  const [adoraLinkPreferences, setAdoraLinkPreferences] = useState({
    autoMarkAsRead: false,
    groupSimilarMessages: true,
    showPreviewInTicker: true,
    enableKeyboardShortcuts: true,
    theme: 'system' as 'light' | 'dark' | 'system'
  });

  // Handle plan upgrades
  const handleUpgrade = async (targetTier: string) => {
    try {
      // In real implementation, this would call the API
      console.log(`Upgrading to ${targetTier} tier`);
      
      // Mock API call
      const response = await fetch('/api/billing/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTier })
      });

      if (response.ok) {
        // Refresh billing data and show success message
        alert(`Successfully upgraded to ${targetTier.toUpperCase()} plan!`);
        // In real app: refetch user data, update UI state
      } else {
        alert('Upgrade failed. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Handle add-on purchases
  const handlePurchaseAddon = async (addonId: string) => {
    try {
      console.log(`Purchasing addon: ${addonId}`);
      
      // Mock API call
      const response = await fetch('/api/billing/purchaseAddon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: addonId })
      });

      if (response.ok) {
        // Animate quota increase and show success
        alert(`Successfully purchased ${addonId} add-on!`);
        // In real app: refetch quota, animate new numbers
      } else {
        alert('Purchase failed. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Handle switching to Play mode
  const handleSwitchToPlay = () => {
    // In real implementation, this would switch the user to Play mode
    console.log('Switching to Play mode');
    alert('Switching to your personal Play workspace!');
    // Could redirect to Play dashboard or toggle the navbar mode
  };

  // AdoraLink helper function
  const handleAlertSettingChange = (level: string, field: string, value: any) => {
    setAlertSettings(prev => prev.map(setting => 
      setting.level === level ? { ...setting, [field]: value } : setting
    ));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'adoralink', label: 'AdoraLink', icon: '🔗' },
    { id: 'access-permissions', label: 'Access & Permissions', icon: '🔐' },
    { id: 'ai-models', label: 'AI & Models', icon: '🤖' },
    { id: 'usage-billing', label: 'Usage & Billing', icon: '🔋' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
  return (
        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Notifications</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Receive email updates</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Enable email notifications</span>
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Receive push notifications</p>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Enable push notifications</span>
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      pushNotifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Timezone</h3>
            <div>
                <select className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="CST">CST (Central Standard Time)</option>
                <option value="MST">MST (Mountain Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="GMT">GMT (Greenwich Mean Time)</option>
                <option value="IST">IST (Indian Standard Time)</option>
                <option value="JST">JST (Japan Standard Time)</option>
                <option value="AEST">AEST (Australian Eastern Standard Time)</option>
              </select>
              <p className="text-base text-gray-500 dark:text-gray-400 mt-2">Select your local timezone for accurate time display</p>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Toggle dark mode appearance</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Language</h3>
            <div>
                <select className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'profile':
        if (profileLoading) {
          return (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</div>
            </div>
          );
        }

        if (profileError) {
          return (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-lg text-red-600 dark:text-red-400">Error: {profileError}</div>
            </div>
          );
        }

        if (!profile) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[600px] px-4 py-12 bg-gradient-to-br from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
              <div className="w-full max-w-md text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                    <svg className="w-12 h-12 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome to Your Profile
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Sign in to access your personalized profile and manage your account settings.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-sky-600 bg-white border border-sky-600 rounded-lg hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors dark:bg-gray-800 dark:text-sky-400 dark:border-sky-500 dark:hover:bg-gray-700"
                  >
                    Create Account
                  </Link>
                </div>
                
                <div className="pt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => window.location.href = '/auth/signin?provider=google'}
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Profile Settings
                </h3>
                <button
                  onClick={openProfileModal}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                      fill=""
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
              
              <div className="space-y-6">
                <UserMetaCard />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <UserInfoCard />
                  <UserAddressCard />
                </div>
              </div>
            </div>

            {/* Profile Edit Modal */}
            <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal} className="max-w-[700px] m-4">
              <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                  <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Edit Profile Information
                  </h4>
                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update your details to keep your profile up-to-date.
                  </p>
                </div>
                <form className="flex flex-col">
                  <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                    <div>
                      <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Social Links
                      </h5>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                          <Label>Facebook</Label>
                          <Input
                            type="text"
                            name="facebook"
                            value={profileFormData.facebook}
                            onChange={handleProfileInputChange}
                          />
                        </div>

                        <div>
                          <Label>X.com</Label>
                          <Input
                            type="text"
                            name="x"
                            value={profileFormData.x}
                            onChange={handleProfileInputChange}
                          />
                        </div>

                        <div>
                          <Label>Linkedin</Label>
                          <Input
                            type="text"
                            name="linkedin"
                            value={profileFormData.linkedin}
                            onChange={handleProfileInputChange}
                          />
                        </div>

                        <div>
                          <Label>Instagram</Label>
                          <Input
                            type="text"
                            name="instagram"
                            value={profileFormData.instagram}
                            onChange={handleProfileInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-7">
                      <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Personal Information
                      </h5>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div className="col-span-2 lg:col-span-1">
                          <Label>Email Address</Label>
                          <div className="flex h-11 w-full items-center rounded-lg border border-gray-300 bg-gray-300 px-4 text-sm font-medium text-gray-600 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-300">
                            {profile.email}
                          </div>
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <Label>Bio</Label>
                          <Input
                            type="text"
                            name="bio"
                            value={profileFormData.bio}
                            onChange={handleProfileInputChange}
                          />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <Label>Phone</Label>
                          <Input
                            type="text"
                            name="phone"
                            value={profileFormData.phone}
                            onChange={handleProfileInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-7">
                      <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Address Information
                      </h5>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div className="col-span-2">
                          <Label>Street Address</Label>
                          <Input
                            type="text"
                            name="address"
                            value={profileFormData.address}
                            onChange={handleProfileInputChange}
                            placeholder="Enter your street address"
                          />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <Label>City</Label>
                          <Input
                            type="text"
                            name="city"
                            value={profileFormData.city}
                            onChange={handleProfileInputChange}
                            placeholder="Enter your city"
                          />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <Label>State</Label>
                          <Input
                            type="text"
                            name="state"
                            value={profileFormData.state}
                            onChange={handleProfileInputChange}
                            placeholder="Enter your state"
                          />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <Label>Zip Code</Label>
                          <Input
                            type="text"
                            name="zipCode"
                            value={profileFormData.zipCode}
                            onChange={handleProfileInputChange}
                            placeholder="Enter your zip code"
                          />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <Label>Country</Label>
                          <Input
                            type="text"
                            name="country"
                            value={profileFormData.country}
                            onChange={handleProfileInputChange}
                            placeholder="Enter your country"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeProfileModal} disabled={isSavingProfile}>
                      Close
                    </Button>
                    <Button size="sm" onClick={handleProfileSave} disabled={isSavingProfile}>
                      {isSavingProfile ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                  {profileSaveError && (
                    <div className="mt-4 px-2 text-sm text-red-600 dark:text-red-400">
                      {profileSaveError}
                    </div>
                  )}
                </form>
              </div>
            </Modal>
          </div>
        );

      case 'adoralink':
        return (
          <div className="space-y-8">
            {/* Sub Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">AdoraLink Settings</h3>
              <div className="flex space-x-1 mb-6">
                {[
                  { key: 'alerts', label: 'Alert Levels' },
                  { key: 'channels', label: 'Channels' },
                  { key: 'preferences', label: 'Preferences' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setAdoraLinkActiveTab(tab.key as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      adoraLinkActiveTab === tab.key
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Alert Levels Tab */}
              {adoraLinkActiveTab === 'alerts' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Configure Alert Levels
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Set thresholds and notification preferences for each alert level.
                    </p>
                  </div>

                  {alertSettings.map((setting) => (
                    <div key={setting.level} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            setting.level === 'L0' ? 'bg-gray-400' :
                            setting.level === 'L1' ? 'bg-blue-500' :
                            setting.level === 'L2' ? 'bg-amber-500' :
                            'bg-red-500'
                          }`} />
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                            Level {setting.level}
                          </h5>
                        </div>
                        <button
                          onClick={() => handleAlertSettingChange(setting.level, 'enabled', !setting.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {setting.enabled && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                              Temperature Threshold: {setting.threshold}°
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={setting.threshold}
                              onChange={(e) => handleAlertSettingChange(setting.level, 'threshold', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                              Notification Channels
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {['email', 'sms', 'push', 'desktop'].map((channel) => (
                                <label key={channel} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={setting.channels.includes(channel)}
                                    onChange={(e) => {
                                      const newChannels = e.target.checked
                                        ? [...setting.channels, channel]
                                        : setting.channels.filter(c => c !== channel);
                                      handleAlertSettingChange(setting.level, 'channels', newChannels);
                                    }}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{channel}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Channels Tab */}
              {adoraLinkActiveTab === 'channels' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Channel Configuration
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Configure how different communication channels are handled.
                    </p>
                  </div>

                  {[
                    { channel: 'Email', icon: '✉️', description: 'Configure email processing and filters' },
                    { channel: 'Chat', icon: '💬', description: 'Set up chat integrations and rules' },
                    { channel: 'SMS', icon: '📱', description: 'Manage SMS routing and preferences' },
                    { channel: 'Voice', icon: '🎤', description: 'Configure voice message handling' }
                  ].map((item) => (
                    <div key={item.channel} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white">{item.channel}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Preferences Tab */}
              {adoraLinkActiveTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      General Preferences
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Customize your AdoraLink experience.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'autoMarkAsRead', label: 'Auto-mark messages as read', description: 'Automatically mark messages as read when viewed' },
                      { key: 'groupSimilarMessages', label: 'Group similar messages', description: 'Combine related messages into conversation threads' },
                      { key: 'showPreviewInTicker', label: 'Show previews in live ticker', description: 'Display message previews in the live ticker view' },
                      { key: 'enableKeyboardShortcuts', label: 'Enable keyboard shortcuts', description: 'Use keyboard shortcuts for faster navigation' }
                    ].map((pref) => (
                      <div key={pref.key} className="flex items-start justify-between py-3">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{pref.description}</p>
                        </div>
                        <button
                          onClick={() => setAdoraLinkPreferences(prev => ({ ...prev, [pref.key]: !prev[pref.key as keyof typeof prev] }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 ${
                            adoraLinkPreferences[pref.key as keyof typeof adoraLinkPreferences] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            adoraLinkPreferences[pref.key as keyof typeof adoraLinkPreferences] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}

                    <div className="py-3 border-t border-gray-200 dark:border-gray-600">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Theme</h5>
                      <div className="flex space-x-3">
                        {[
                          { value: 'light', label: 'Light' },
                          { value: 'dark', label: 'Dark' },
                          { value: 'system', label: 'System' }
                        ].map((themeOption) => (
                          <label key={themeOption.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="adoralink-theme"
                              value={themeOption.value}
                              checked={adoraLinkPreferences.theme === themeOption.value}
                              onChange={(e) => setAdoraLinkPreferences(prev => ({ ...prev, theme: e.target.value as any }))}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{themeOption.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'access-permissions':
        return (
          <div className="space-y-8">
            {/* Access & Permissions Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Access & Permissions Management</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Manage team members, roles, and company access in one place.</p>
              
              {/* Sub Navigation */}
              <div className="flex space-x-1 mb-6">
                {[
                  { key: 'team', label: 'Team Members' },
                  { key: 'companies', label: 'Company Access' },
                  { key: 'roles', label: 'Role Management' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setAccessPermissionsTab(tab.key as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      accessPermissionsTab === tab.key
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Team Members Tab */}
              {accessPermissionsTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Team Members</h4>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Invite Member
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'John Doe', email: 'john@adoraai.com', role: 'Admin', avatar: 'JD' },
                      { name: 'Sarah Smith', email: 'sarah@adoraai.com', role: 'Manager', avatar: 'SS' },
                      { name: 'Mike Johnson', email: 'mike@adoraai.com', role: 'View Only User', avatar: 'MJ' },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                            {member.avatar}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{member.name}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{member.role}</span>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Access Tab */}
              {accessPermissionsTab === 'companies' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Your Companies</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Adora AI', role: 'Admin', color: '#6366F1' },
                        { name: 'Law Firm Demo', role: 'Manager', color: '#1F2937' },
                        { name: 'Financial Firm Demo', role: 'Admin', color: '#059669' },
                      ].map((company, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                              style={{ backgroundColor: company.color }}
                            >
                              {company.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{company.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{company.role}</p>
                            </div>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium">
                            Manage
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Request Company Access</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Need access to a new company? Request access from an administrator.</p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Request Access
                    </button>
                  </div>
                </div>
              )}

              {/* Role Management Tab */}
              {accessPermissionsTab === 'roles' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Role Definitions</h4>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Create Role
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Admin', description: 'Full access to all features and settings', permissions: ['All permissions'] },
                      { name: 'Manager', description: 'Can manage team members and access', permissions: ['Invite members', 'Assign roles', 'View analytics'] },
                      { name: 'View Only User', description: 'Can view but not modify settings', permissions: ['View settings', 'View analytics'] },
                    ].map((role, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{role.name}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium">
                            Edit
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission, pIndex) => (
                            <span key={pIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'ai-models':
        return (
          <div className="space-y-8">
            {/* AI Model Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">AI Model Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Default AI Model</label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="gpt-4">GPT-4 (Recommended)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-3">Claude 3</option>
                    <option value="gemini-pro">Gemini Pro</option>
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Choose your preferred AI model for conversations</p>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Response Style</label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="balanced">Balanced</option>
                    <option value="creative">Creative</option>
                    <option value="precise">Precise</option>
                    <option value="concise">Concise</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Stream Responses</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Show AI responses as they're generated</p>
                  </div>
                  <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors bg-indigo-600">
                    <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'usage-billing':
        return (
          <div className="space-y-8">
            {/* Plan Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Usage & Billing</h3>
              
              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
                {/* PLAY Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-green-500 shadow-lg relative">
                  {/* Included with Pro & Org Pill */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Included with PRO & ORG
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">PLAY</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$49</span>
                      <span className="text-gray-500 dark:text-gray-400">/mo</span>
                    </div>
                    <div className="space-y-1 mb-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">1,200 CU</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">≈1.7¢/CU</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      Personal AI workspace included with PRO & ORG plans
                    </div>
                    <button 
                      onClick={() => handleSwitchToPlay()}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Switch to Play
                    </button>
                  </div>
                </div>

                {/* PRO Plan - Current Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-blue-500 shadow-lg relative">
                  {/* Current Plan Pill */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Included in your subscription
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">PRO</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$297</span>
                      <span className="text-gray-500 dark:text-gray-400">/seat/mo</span>
                    </div>
                    <div className="space-y-1 mb-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">15,000 CU</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">≈1.3¢/CU</p>
                    </div>
                    
                    {/* Usage Progress Ring */}
                    <div className="flex justify-center mb-4">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                          {/* Background Circle */}
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          {/* Progress Circle */}
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="text-red-500"
                            strokeDasharray={`${2 * Math.PI * 12}`}
                            strokeDashoffset={`${2 * Math.PI * 12 * (1 - 0.93)}`}
                            style={{ 
                              transition: 'stroke-dashoffset 0.3s ease-out',
                            }}
                          />
                        </svg>
                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-900 dark:text-white">
                            93%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      13,950 / 15,000 CU used
                    </div>
                    
                    <button 
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                    >
                      Current Plan
                    </button>
                  </div>
                </div>

                {/* ORG Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-500 shadow-lg hover:shadow-md transition-shadow relative">
                  {/* Need 30+ Users Pill */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Need 30+ Users?
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">ORG</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$6,000*</span>
                      <span className="text-gray-500 dark:text-gray-400">/mo</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                      *$8k/m starting in 2026
                    </div>
                    <div className="space-y-1 mb-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">500,000 CU</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">≈1.2¢/CU</p>
                    </div>
                    <button 
                      onClick={() => handleUpgrade('org')}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
                              </div>



              {/* CU Explanation Accordion */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={() => setCuAccordionOpen(!cuAccordionOpen)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">?</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      What is a Capacity Unit (CU)?
                    </h4>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      cuAccordionOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {cuAccordionOpen && (
                  <div className="mt-6 space-y-6 text-sm text-gray-600 dark:text-gray-300">
                    {/* Section 1 */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        1. What's a token, anyway?
                      </h5>
                      <p>
                        Most AI providers meter usage in tokens—tiny chunks of text (≈ ¾ of a word). Each model charges a different price per million tokens, so keeping track across dozens of models gets messy fast.
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        2. Why we invented the CU.
                      </h5>
                      <p className="mb-3">
                        Adora AI taps multiple models (OpenAI, Gemini, Claude, Grok, …) whose token prices range from pennies to dollars. Instead of making you juggle that variability, we convert everything into a single, predictable unit:
                      </p>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 text-center">
                        <span className="font-bold text-indigo-900 dark:text-indigo-300">
                          1 CU = the cost of processing about 1,000 average-length words.
                        </span>
                      </div>
                      <p className="mt-3">
                        Think of it as putting fuel from every supplier into one universal gallon. Your plan's "fuel tank" is expressed in CUs, and the on-screen meter simply shows how full that tank is—no token math required.
                      </p>
                    </div>

                    {/* Section 3 - Usage Meter Guide */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        3. What you'll see on your dashboard.
                      </h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Meter</th>
                              <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Tells you</th>
                              <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">What to do</th>
                            </tr>
                          </thead>
                          <tbody className="space-y-2">
                            <tr>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Green (&lt;70%)
                                </span>
                              </td>
                              <td className="py-2 px-3">Plenty of CUs left this month.</td>
                              <td className="py-2 px-3">Create freely.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                  Amber (70-90%)
                                </span>
                              </td>
                              <td className="py-2 px-3">You're on track to use most of your allowance.</td>
                              <td className="py-2 px-3">Consider lighter summaries or a pack purchase.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  Red (&gt;90%)
                                </span>
                              </td>
                              <td className="py-2 px-3">Fuel's almost gone.</td>
                              <td className="py-2 px-3">Top up with an add-on pack or upgrade your plan.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Section 4 - Enterprise Features */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        4. Need fine-grained control?
                      </h5>
                      <p className="mb-3">Enterprise clients can unlock <strong>Transparent Mode</strong>:</p>
                      <ul className="space-y-1 mb-3 pl-4">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Full price sheet for every model in our catalog.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Workflow-level model routing (e.g., "use Gemini Flash for drafts, Claude 4 for contracts").</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Real-time cost simulator before you run a job.</span>
                        </li>
                      </ul>
                      <div className="bg-white dark:bg-gray-900 border border-purple-300 dark:border-purple-700 rounded-lg p-3">
                        <p className="font-medium text-purple-900 dark:text-purple-300">
                          Fee: $12,000 per year, billed up-front
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          (covers admin tooling and dedicated support)
                        </p>
                      </div>
                      <p className="text-xs mt-3">
                        This gives your FinOps or data teams granular levers while individual users keep the same clean CU experience.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add-On Shelf */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add-On Capacity</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Need more capacity? Purchase additional Capacity Units for your current plan.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Fun Pack - Available for Play & Pro */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900 dark:text-white">Fun Pack</h5>
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">+600 CU</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">$15</p>
                    </div>
                    <button 
                      onClick={() => handlePurchaseAddon('fun-pack')}
                      className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Buy Add-On
                    </button>
                  </div>

                  {/* Pro Boost - Available for Pro only */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-50 dark:from-indigo-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900 dark:text-white">Pro Boost</h5>
                      <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">+6,000 CU</p>
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">$75</p>
                    </div>
                    <button 
                      onClick={() => handlePurchaseAddon('pro-boost')}
                      className="w-full px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Buy Add-On
                    </button>
                  </div>

                  {/* Enterprise Block - Requires ORG upgrade */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border-2 border-purple-300 dark:border-purple-600 relative overflow-hidden">
                    {/* Premium indicator */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-pulse"></div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-purple-700 dark:text-purple-200">Enterprise Block</h5>
                      <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                        ⭐ ORG Only
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-300">+100,000 CU</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg font-bold text-purple-700 dark:text-purple-200">$1,000</p>
                        <span className="text-xs text-purple-500 dark:text-purple-400">per block</span>
                      </div>
                    </div>
                    <button 
                      disabled
                      className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm rounded-lg cursor-not-allowed opacity-75 hover:opacity-90 transition-opacity relative overflow-hidden group"
                    >
                      <span className="relative z-10">Upgrade to ORG Plan</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <p className="text-xs text-purple-600 dark:text-purple-300 text-center mt-2 font-medium">
                      💎 Premium Enterprise Feature
                    </p>
                  </div>
                </div>
              </div>

              {/* Founding Org Offer Section */}
              <div className="mt-12 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    🟣 Founding Org Offer — Ends Dec 31, 2025
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Lock in $6,000/month with Unlimited Users Forever
                  </h3>
                  <p className="text-gray-600 dark:text-gray-100 mb-6 max-w-2xl mx-auto">
                    As an existing user, you have priority access to our Founding Org pricing. This exclusive offer ends December 31st, 2025.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* 2025 Founding Org Pricing */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-600 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 dark:bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                        🟣 Founding Org (2025)
                      </span>
                    </div>
                    <div className="text-center pt-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Exclusive Rate</h4>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-purple-600 dark:text-purple-300">$6,000</span>
                        <span className="text-gray-500 dark:text-gray-300">/month</span>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Included Users</span>
                          <span className="font-semibold text-purple-600 dark:text-purple-300">Unlimited ✨</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Extra Users</span>
                          <span className="font-semibold text-purple-600 dark:text-purple-300">$0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Included CU</span>
                          <span className="font-semibold text-gray-800 dark:text-white">500,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Extra CU</span>
                          <span className="font-semibold text-gray-800 dark:text-white">+100K for $1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Price Lock</span>
                          <span className="font-semibold text-green-600 dark:text-green-300">Forever</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2026+ Standard Pricing */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 border border-gray-300 dark:border-gray-600 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gray-500 dark:bg-gray-600 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                        2026+ Standard
                      </span>
                    </div>
                    <div className="text-center pt-2 opacity-75 dark:opacity-90">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">What You'd Pay Later</h4>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-600 dark:text-gray-100">$8,000</span>
                        <span className="text-gray-500 dark:text-gray-300">/month</span>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Included Users</span>
                          <span className="font-semibold text-gray-800 dark:text-white">30 only</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Extra Users</span>
                          <span className="font-semibold text-gray-800 dark:text-white">$197/user</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Included CU</span>
                          <span className="font-semibold text-gray-800 dark:text-white">500,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Extra CU</span>
                          <span className="font-semibold text-gray-800 dark:text-white">+100K for $1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-100">Price Lock</span>
                          <span className="font-semibold text-red-600 dark:text-red-300">None</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-purple-200 dark:border-purple-700 mb-6">
                    <div className="text-2xl">💰</div>
                    <div className="text-left">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">Save $24,000+ per year</div>
                      <div className="text-sm text-gray-600 dark:text-gray-100">Plus unlimited users at no extra cost</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => handleUpgrade('founding-org')}
                      className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      🔒 Lock in Founding Org Rate Now
                    </button>
                    <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                      ⏰ Offer expires December 31, 2025 • Limited availability
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      Contact sales@adora.ai or book a demo to secure your rate
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Management */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Management</h4>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => window.open('#', '_blank')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Billing History
                  </button>
                  <button 
                    onClick={() => window.open('#', '_blank')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Download Invoice
                  </button>
                  <button 
                    onClick={() => window.open('#', '_blank')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Update Payment Method
                  </button>
                </div>
              </div>

              {/* Invoice Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Invoice</h4>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  {/* Invoice Header */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-base font-medium text-gray-900 dark:text-white mb-2">From</h5>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-800 dark:text-white/90">Adora AI</p>
                        <p>1280, Clair Street</p>
                        <p>Massachusetts, New York - 02543</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-base font-medium text-gray-900 dark:text-white mb-2">To</h5>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-800 dark:text-white/90">Albert Ward</p>
                        <p>355, Shobe Lane</p>
                        <p>Colorado, Fort Collins - 80543</p>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Dates */}
                  <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">Issued On:</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">11 March, 2027</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">Due On:</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">16 March, 2027</span>
                    </div>
                  </div>

                  {/* Invoice Table */}
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Product</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Quantity</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Unit Cost</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">PRO Plan</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">1</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$297</td>
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$297</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">Pro Boost Add-on</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">2</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$75</td>
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$150</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">Fun Pack Add-on</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">1</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$15</td>
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Invoice Totals */}
                  <div className="flex flex-col gap-2 items-end mb-6">
                    <div className="flex justify-between w-full max-w-xs gap-8">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sub Total:</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">$462</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs gap-8">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">VAT (10%):</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">$46.20</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs gap-8 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-base font-semibold text-gray-800 dark:text-white/90">Total:</span>
                      <span className="text-base font-semibold text-gray-800 dark:text-white/90">$508.20</span>
                    </div>
                  </div>

                  {/* Invoice Actions */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <button className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                      Download PDF
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                      Print Invoice
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Email Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      twoFactor ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        twoFactor ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Session Timeout</label>
                  <select 
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="never">Never</option>
              </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Automatically log out after inactivity</p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Actions</h4>
                  <div className="space-y-3">
                    <button className="block w-full text-left px-4 py-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      Change Password
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                      Download Data Export
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-8">
            {/* Integrations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Integrations</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Connect Adora AI with your favorite tools and services to streamline your workflows.</p>
              
              <div className="space-y-6">
                {[
                  // Communication & Collaboration
                  { name: 'Slack', description: 'Send AI responses to Slack channels', connected: true, icon: '💬', category: 'Communication' },
                  { name: 'Microsoft Teams', description: 'Collaborate with AI in Teams channels', connected: false, icon: '👥', category: 'Communication' },
                  { name: 'Discord', description: 'Create AI bots for Discord servers', connected: false, icon: '🎮', category: 'Communication' },
                  { name: 'Telegram', description: 'Build AI chatbots for Telegram', connected: true, icon: '📱', category: 'Communication' },
                  
                  // Productivity & Storage
                  { name: 'Google Drive', description: 'Access and analyze documents', connected: false, icon: '📁', category: 'Productivity' },
                  { name: 'Microsoft 365', description: 'Integrate with Office apps', connected: true, icon: '📊', category: 'Productivity' },
                  { name: 'Notion', description: 'Sync AI insights with Notion pages', connected: false, icon: '📝', category: 'Productivity' },
                  { name: 'Google Sheets', description: 'Automate spreadsheet workflows', connected: false, icon: '📋', category: 'Productivity' },
                  { name: 'Airtable', description: 'Connect to your Airtable databases', connected: false, icon: '🗂️', category: 'Productivity' },
                  { name: 'Trello', description: 'Automate project management tasks', connected: false, icon: '📌', category: 'Productivity' },
                  
                  // Email & Marketing
                  { name: 'Gmail', description: 'AI-powered email management', connected: true, icon: '📧', category: 'Email' },
                  { name: 'Outlook', description: 'Microsoft email integration', connected: false, icon: '📮', category: 'Email' },
                  { name: 'Mailchimp', description: 'Automate email marketing campaigns', connected: false, icon: '🐒', category: 'Marketing' },
                  { name: 'HubSpot', description: 'CRM and marketing automation', connected: false, icon: '🎯', category: 'Marketing' },
                  
                  // Development & Business
                  { name: 'GitHub', description: 'Code analysis and review', connected: false, icon: '💻', category: 'Development' },
                  { name: 'Jira', description: 'Project tracking and issue management', connected: false, icon: '🎫', category: 'Development' },
                  { name: 'Salesforce', description: 'CRM data enrichment', connected: false, icon: '☁️', category: 'Sales' },
                  { name: 'Pipedrive', description: 'Sales pipeline automation', connected: false, icon: '🔄', category: 'Sales' },
                  
                  // Automation & Webhooks
                  { name: 'Zapier', description: 'Connect with 5,000+ apps', connected: false, icon: '⚡', category: 'Automation' },
                  { name: 'n8n', description: 'Self-hosted workflow automation', connected: false, icon: '🔗', category: 'Automation' },
                  { name: 'Webhooks', description: 'Custom HTTP integrations', connected: false, icon: '🪝', category: 'Automation' },
                  
                  // Databases & Analytics
                  { name: 'PostgreSQL', description: 'Connect to PostgreSQL databases', connected: false, icon: '🐘', category: 'Database' },
                  { name: 'MySQL', description: 'MySQL database integration', connected: false, icon: '🗄️', category: 'Database' },
                  { name: 'MongoDB', description: 'NoSQL document database', connected: false, icon: '🍃', category: 'Database' },
                  { name: 'Google Analytics', description: 'Website analytics insights', connected: false, icon: '📈', category: 'Analytics' },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{integration.name}</h4>
                          <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                            {integration.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        integration.connected 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>

              {/* See More Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                    <span className="px-4 text-sm font-medium">Need something else?</span>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">📊</span>
                        <span>1000+ Apps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">🔄</span>
                        <span>Custom Workflows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-500">🔗</span>
                        <span>API Connections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-500">⚡</span>
                        <span>Real-time Sync</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => window.open('/integrations', '_blank')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Browse All Integrations
                      </button>
                      <button 
                        onClick={() => window.open('#', '_blank')}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Request Integration
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      Can't find what you need? Our API and webhook support lets you connect to virtually any service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            {/* Team Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Team & Collaboration</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Team Members</h4>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Invite Member
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'John Doe', email: 'john@adoraai.com', role: 'Admin', avatar: 'JD' },
                    { name: 'Sarah Smith', email: 'sarah@adoraai.com', role: 'Manager', avatar: 'SS' },
                    { name: 'Mike Johnson', email: 'mike@adoraai.com', role: 'View Only User', avatar: 'MJ' },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{member.name}</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{member.role}</span>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
} 