import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, profile, email, phone } = await req.json();

    // Validate required fields
    if (!name || !profile || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Use the Supabase function to create job application
    const { data, error } = await supabase
      .rpc('create_job_application', {
        applicant_name: name,
        profile_url: profile,
        applicant_email: email,
        applicant_phone: phone
      });

    if (error) {
      console.error('Supabase function error:', error);
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 }
      );
    }

    // Check if the function returned an error
    console.log('data', data);
    console.log('error', error);
    if (data && !data.success) {
      console.error('Function error:', data.error);
      return NextResponse.json(
        { error: data},
        { status: 500 }
      );
    }

    // Send email notification
    // try {
    //   await resend.emails.send({
    //     from: 'Adora AI <noreply@adorahq.com>',
    //     to: ['hello@adorahq.com'],
    //     subject: 'New Job Application - Adora AI',
    //     html: `
    //       <h2>New Job Application Received</h2>
    //       <p><strong>Name:</strong> ${name}</p>
    //       <p><strong>LinkedIn/GitHub Profile:</strong> <a href="${profile}">${profile}</a></p>
    //       <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    //       <p><strong>Phone:</strong> ${phone}</p>
    //       <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    //       <hr>
    //       <p>This application has been automatically saved to the database.</p>
    //     `
    //   });
    // } catch (emailError) {
    //   console.error('Email sending error:', emailError);
    //   // Don't fail the request if email fails, just log it
    // }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      data 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 