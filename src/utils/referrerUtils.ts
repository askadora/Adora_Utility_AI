/**
 * Utility functions for handling site URL-based URL redirection
 */
import { getBaseUrl } from './environment';

/**
 * Determines the appropriate demo URL based on the current site URL
 * @returns The demo URL to redirect to
 */
export const getDemoUrl = (): string => {
  // Get the current site URL from environment variables
  const currentSiteUrl = getBaseUrl();
  console.log('Current site URL:', currentSiteUrl);
  
  // Convert the site URL to the corresponding demo URL
  const demoUrl = currentSiteUrl.replace('.ai', '.com') + '/demo';
  console.log('Demo URL:', demoUrl);
  
  return demoUrl;
};

/**
 * Handles the click event for the Get Started button
 * Opens the appropriate demo URL in a new tab based on current site URL
 */
export const handleGetStartedClick = (): void => {
  try {
    console.log('Get Started button clicked');
    const demoUrl = getDemoUrl();
    console.log('Opening URL:', demoUrl);
    window.open(demoUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error opening demo URL:', error);
    // Fallback to default URL using environment variable
    const fallbackUrl = getBaseUrl().replace('.ai', '.com') + '/demo';
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  }
}; 