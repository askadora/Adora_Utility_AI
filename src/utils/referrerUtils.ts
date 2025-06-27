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
  let demoUrl: string;
  
  if (currentSiteUrl.includes('.ai')) {
    // If it's a .ai domain, replace with .com and add /demo
    demoUrl = currentSiteUrl.replace('.ai', '.com') + '/demo';
  } else if (currentSiteUrl.includes('localhost')) {
    // If it's localhost, use environment variable or default to adorahq.com
    const defaultSite = process.env.NEXT_PUBLIC_DEFAULT_SITE || 'https://www.adorahq.com';
    demoUrl = defaultSite + '/demo';
  } else {
    // For any other case, just add /demo to the current URL
    demoUrl = currentSiteUrl + '/demo';
  }
  
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
    
    // Check if the URL is valid
    if (!demoUrl || demoUrl === 'undefined/demo' || demoUrl === 'null/demo') {
      console.error('Invalid demo URL generated:', demoUrl);
      return;
    }
    
    window.open(demoUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error opening demo URL:', error);
    // Fallback to default URL using environment variable
    const fallbackUrl = getDemoUrl();
    console.log('Using fallback URL:', fallbackUrl);
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  }
}; 