export type Environment = 'development' | 'production' | 'local';

export const getEnvironment = (): Environment => {
  return (process.env.NEXT_PUBLIC_ENV as Environment) || 'development';
};

export const isDevelopment = () => getEnvironment() === 'development';
export const isProduction = () => getEnvironment() === 'production';
export const isLocal = () => getEnvironment() === 'local';

export const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
};

export const getSupabaseAnonKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}; 