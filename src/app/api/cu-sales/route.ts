import { NextResponse } from 'next/server';

// Mock data for CU sales - in a real app this would come from your database/billing service
const generateMockCUSalesData = () => {
  // Generate realistic CU sales data
  const baseMonthlyVolume = 28500; // Base monthly CU sales volume
  const dailyVariation = Math.floor(Math.sin(Date.now() / 86400000) * 2000); // Daily variation
  const monthlyCUSales = Math.max(15000, baseMonthlyVolume + dailyVariation);
  
  // Calculate growth percentage (mock trending data)
  const baseGrowth = 8.2; // Base growth percentage
  const growthVariation = Math.sin(Date.now() / 604800000) * 2; // Weekly variation
  const growthPercentage = +(baseGrowth + growthVariation).toFixed(1);
  
  // Calculate revenue from CU sales (assuming average price per CU)
  const avgPricePerCU = 0.014; // $0.014 per CU (average across plans)
  const revenue = Math.round(monthlyCUSales * avgPricePerCU);
  
  return { 
    monthlyCUSales, 
    growthPercentage,
    revenue,
    avgPricePerCU: avgPricePerCU.toFixed(3)
  };
};

export async function GET() {
  try {
    // Simulate some API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const data = generateMockCUSalesData();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching CU sales data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CU sales data' },
      { status: 500 }
    );
  }
} 