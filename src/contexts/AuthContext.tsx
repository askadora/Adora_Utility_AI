'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient'; // Assuming your path alias is set up

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Debug function to log auth state
  const logAuthState = (source: string) => {
    console.log(`[Auth Debug] ${source}:`, {
      hasSession: !!session,
      hasUser: !!user,
      sessionId: session?.access_token?.slice(0, 10),
      userId: user?.id,
      isLoading,
      timestamp: new Date().toISOString()
    });
  };

  useEffect(() => {
    console.log('[Auth Debug] Initializing auth state');

    const getSession = async () => {
      setIsLoading(true);
      try {
        console.log('[Auth Debug] Starting getSession');
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        console.log('[Auth Debug] getSession result:', { 
          hasSession: !!currentSession,
          error: error?.message,
          sessionId: currentSession?.access_token?.slice(0, 10)
        });

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (err) {
        console.error('[Auth Debug] Unexpected error in getSession:', err);
        setSession(null);
        setUser(null);
      } finally {
        setIsLoading(false);
        logAuthState('getSession completed');
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        console.log('[Auth Debug] Auth state changed:', { 
          event: _event,
          hasSession: !!currentSession,
          sessionId: currentSession?.access_token?.slice(0, 10)
        });

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
        logAuthState('auth state change completed');
      }
    );

    return () => {
      console.log('[Auth Debug] Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setIsLoading(true);
    try {
      console.log('[Auth Debug] Starting signOut');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[Auth Debug] Error signing out:', error.message);
      }
      setSession(null);
      setUser(null);
      console.log('[Auth Debug] SignOut completed');
    } catch (err) {
      console.error('[Auth Debug] Unexpected error in signOut:', err);
    } finally {
      setIsLoading(false);
      logAuthState('signOut completed');
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 