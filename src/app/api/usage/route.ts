import { NextResponse } from 'next/server';

// Mock data - in a real app this would come from your database/service
const generateMockUsageData = () => {
  // Generate high usage data to demonstrate the full color range
  const baseUsed = 930; // Base usage around 93%
  const variation = Math.floor(Math.sin(Date.now() / 86400000) * 20); // Daily variation
  const used = Math.max(0, Math.min(1000, baseUsed + variation));
  const quota = 1000;
  
  return { used, quota };
};

export async function GET() {
  try {
    // Simulate some API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = generateMockUsageData();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching usage data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
} 