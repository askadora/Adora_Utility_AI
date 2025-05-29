import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  image: string;
  email: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  facebook: string;
  x: string;
  linkedin: string;
  instagram: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        if (!session?.user) {
          setLoading(false);
          return;
        }

        // Call the Supabase function to get all user data in one call
        const { data, error: functionError } = await supabase
          .rpc('get_user_profile', {
            auth_user_id: session.user.id
          });

        if (functionError) throw functionError;

        if (data) {
          setProfile(data as UserProfile);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching profile data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [session]);

  return { profile, loading, error };
} 