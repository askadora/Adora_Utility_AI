import { supabase } from "@/lib/supabaseClient";

export const clearAvatarUrl = async () => {
  await supabase.auth.updateUser({
    data: { avatar_url: null }
  });
};

export const updateAvatarUrl = async (signedUrl: string) => {
  const { error } = await supabase.auth.updateUser({
    data: { avatar_url: signedUrl }
  });
  if (error) throw error;
};

export const getSignedUrl = async (userId: string, filePath: string) => {
  const { data, error } = await supabase.storage
    .from('user-profile-image')
    .createSignedUrl(`${userId}/${filePath}`, 3600);
  console.log('error', error);
  if (error) {
    if (error.message.includes('not found') || error.message.includes('expired')) {
      await clearAvatarUrl();
      return null;
    }
    throw error;
  }
  return data.signedUrl;
};

export const uploadImage = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('user-profile-image')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) throw uploadError;
  return fileName;
};

export const refreshAvatarUrl = async (avatarUrl: string | null, userId: string) => {
  if (!avatarUrl) return null;
  
  try {
    // First try to fetch the existing URL to check if it's still valid
    const response = await fetch(avatarUrl, { method: 'HEAD' });
    if (response.ok) {
      return avatarUrl; // If the existing URL works, return it
    }

    // If the existing URL doesn't work, try to refresh it
    const url = new URL(avatarUrl);
    const filePath = url.pathname.split('/').pop();
    
    if (filePath) {
      const signedUrl = await getSignedUrl(userId, filePath);
      if (signedUrl) {
        await updateAvatarUrl(signedUrl);
        return signedUrl;
      }
    }
    return null;
  } catch (err) {
    console.error('Error refreshing avatar URL:', err);
    // If there's an error with the existing URL, try to refresh it
    try {
      const url = new URL(avatarUrl);
      const filePath = url.pathname.split('/').pop();
      
      if (filePath) {
        const signedUrl = await getSignedUrl(userId, filePath);
        if (signedUrl) {
          await updateAvatarUrl(signedUrl);
          return signedUrl;
        }
      }
      return null;
    } catch (refreshErr) {
      console.error('Error during URL refresh:', refreshErr);
      await clearAvatarUrl();
      return null;
    }
  }
}; 