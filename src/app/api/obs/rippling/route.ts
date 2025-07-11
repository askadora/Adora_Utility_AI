import { NextRequest, NextResponse } from 'next/server';

// Rippling API configuration
const RIPPLING_API_BASE_URL = process.env.RIPPLING_API_BASE_URL || 'https://api.rippling.com';
const RIPPLING_API_KEY = process.env.RIPPLING_API_KEY;

interface RipplingCandidate {
  id: string;
  name: string;
  email: string;
  role?: string;
  location?: string;
  department?: string;
  hireDate?: string;
  status?: string;
}

export async function GET(req: NextRequest) {
  try {
    // Check if Rippling API is configured
    if (!RIPPLING_API_KEY) {
      return NextResponse.json(
        { error: 'Rippling API not configured. Please set RIPPLING_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('candidateId');
    const email = searchParams.get('email');

    if (!candidateId && !email) {
      return NextResponse.json(
        { error: 'Either candidateId or email parameter is required' },
        { status: 400 }
      );
    }

    // Fetch candidate data from Rippling API
    let ripplingResponse;
    
    if (candidateId) {
      // Fetch by candidate ID
      ripplingResponse = await fetch(`${RIPPLING_API_BASE_URL}/candidates/${candidateId}`, {
        headers: {
          'Authorization': `Bearer ${RIPPLING_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    } else if (email) {
      // Search by email
      ripplingResponse = await fetch(`${RIPPLING_API_BASE_URL}/candidates?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Bearer ${RIPPLING_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    }

    if (!ripplingResponse?.ok) {
      console.error('Rippling API error:', ripplingResponse?.status, ripplingResponse?.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch candidate data from Rippling' },
        { status: ripplingResponse?.status || 500 }
      );
    }

    const ripplingData = await ripplingResponse.json();
    
    // Transform Rippling data to our format
    const candidateData: RipplingCandidate = {
      id: ripplingData.id || ripplingData.candidate_id,
      name: ripplingData.name || ripplingData.full_name,
      email: ripplingData.email,
      role: ripplingData.role || ripplingData.position,
      location: ripplingData.location || ripplingData.city,
      department: ripplingData.department,
      hireDate: ripplingData.hire_date,
      status: ripplingData.status
    };

    return NextResponse.json({
      success: true,
      candidate: candidateData
    });

  } catch (error) {
    console.error('Error fetching candidate data from Rippling:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint to create or update candidate data
export async function POST(req: NextRequest) {
  try {
    if (!RIPPLING_API_KEY) {
      return NextResponse.json(
        { error: 'Rippling API not configured' },
        { status: 503 }
      );
    }

    const candidateData = await req.json();
    
    // Create candidate in Rippling
    const ripplingResponse = await fetch(`${RIPPLING_API_BASE_URL}/candidates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RIPPLING_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidateData),
    });

    if (!ripplingResponse.ok) {
      console.error('Rippling API error:', ripplingResponse.status, ripplingResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to create candidate in Rippling' },
        { status: ripplingResponse.status }
      );
    }

    const result = await ripplingResponse.json();

    return NextResponse.json({
      success: true,
      candidate: result
    });

  } catch (error) {
    console.error('Error creating candidate in Rippling:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 