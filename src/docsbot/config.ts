export const DOCSBOT_CONFIG = {
  teamId: process.env.NEXT_PUBLIC_DOCSBOT_TEAM_ID!,
  apiKey: process.env.NEXT_PUBLIC_DOCSBOT_API_KEY!,
  baseUrl: 'https://api.docsbot.ai',
} as const;

export const DOCSBOT_BOTS = {
  INVESTOR: process.env.NEXT_PUBLIC_DOCSBOT_INVESTOR_ID,
  // Add other bot IDs here as needed
  KNOW_BASE: process.env.NEXT_PUBLIC_DOCSBOT_KNOW_BASE_ID,
  COMMON: process.env.NEXT_PUBLIC_DOCSBOT_COMMON_ID,
} as const;