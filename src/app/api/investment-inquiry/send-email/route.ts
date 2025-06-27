import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email' },
        { status: 400 }
      );
    }

    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.adoraos.ai';
    let meetingLink = process.env.NEXT_PUBLIC_ADORAHQ_URL || 'https://adoraos.com/';
    meetingLink += '/meeting';

    try {
      // Send email to the interested investor
      await resend.emails.send({
        from: 'Adora AI <noreply@adorahq.ai>',
        to: [email],
        subject: 'Thank you for your interest in investing - Adora AI',
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Investment Interest - Adora AI</title>
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; }
              .container { background: white; border-radius: 8px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
              .logo { display: block; margin: 0 auto 24px; height: 40px; }
              .header { text-align: center; margin-bottom: 32px; }
              .title { color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 8px 0; }
              .subtitle { color: #64748b; font-size: 16px; margin: 0; }
              .meeting-section { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 24px 0; text-align: center; }
              .meeting-button { display: inline-block; background: #5365FF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0; }
              .meeting-button:hover { background: #4152cc; }
              .next-steps { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 16px; margin: 24px 0; }
              .next-steps-title { font-weight: 600; color: #92400e; margin: 0 0 8px 0; }
              .next-steps-text { color: #92400e; margin: 0; font-size: 14px; }
              .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
              .link { color: #3b82f6; text-decoration: none; }
              .link:hover { text-decoration: underline; }
          </style>
      </head>
      <body>
          <div class="container">
              <img src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/adora-ai-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvYWRvcmEtYWktbG9nby5wbmciLCJpYXQiOjE3NTA5OTk2MDEsImV4cCI6MTc4MjUzNTYwMX0.QCL7iKtPh9OWIhi9YLgR-GtiRNKRQN-S73EEHguGf6A" alt="Adora AI Logo" class="logo">
              
              <div class="header">
                  <h1 class="title">Thank you for your interest!</h1>
                  <p class="subtitle">We're excited to discuss investment opportunities with you</p>
              </div>
              
              <p>Hi ${name},</p>
              
              <p>Thank you for expressing interest in investing in Adora AI. We're building the future of artificial intelligence and would love to discuss how you can be part of our journey.</p>
              
              <div class="meeting-section">
                  <h3 style="margin: 0 0 12px 0; color: #1e293b;">Schedule a Meeting</h3>
                  <p style="margin: 0 0 16px 0; color: #64748b;">Book a time that works for you to discuss investment opportunities and learn more about our vision.</p>
                  <a href="${meetingLink}" class="meeting-button">Book a Meeting</a>
              </div>
              
              <div class="next-steps">
                  <div class="next-steps-title">What's Next?</div>
                  <p class="next-steps-text">
                      • Schedule a meeting using the link above<br>
                      • We'll discuss our investment opportunities and answer your questions<br>
                      • Review our investor materials and financial projections<br>
                      • Explore how you can join our mission to democratize AI
                  </p>
              </div>
              
              <p>If you have any immediate questions or need assistance with scheduling, please don't hesitate to reach out to our team.</p>
              
              <div class="footer">
                  <p>Best regards,<br>The Adora AI Team</p>
                  <p>© 2025 Adora AI. All rights reserved.</p>
                  <p>Questions? Contact us at <a href="mailto:hello.adorahq@gmail.com" class="link">hello.adorahq@gmail.com</a></p>
              </div>
          </div>
      </body>
      </html>`
      });

      // Get team email addresses from environment variables
      const teamEmails = [
        process.env.ADORA_TEAM_EMAIL || 'hello.adorahq@gmail.com',
        process.env.ADORA_KYLE_EMAIL || 'kyle@adorahq.com'
      ].filter(email => email); // Remove any empty emails

      // Send notification email to the team
      await resend.emails.send({
        from: 'Adora AI <noreply@adorahq.ai>',
        to: teamEmails,
        subject: 'New Investment Inquiry - Adora AI',
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Investment Inquiry</title>
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; }
              .container { background: white; border-radius: 8px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
              .header { background: #5365FF; color: white; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 24px; }
              .title { font-size: 20px; font-weight: 600; margin: 0; }
              .info-grid { display: grid; grid-template-columns: auto 1fr; gap: 12px; margin: 20px 0; }
              .label { font-weight: 600; color: #374151; }
              .value { color: #6b7280; }
              .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1 class="title">🎯 New Investment Inquiry</h1>
              </div>
              
              <p>A new investor has expressed interest in Adora AI!</p>
              
              <div class="info-grid">
                  <span class="label">Name:</span>
                  <span class="value">${name}</span>
                  <span class="label">Email:</span>
                  <span class="value">${email}</span>
                  <span class="label">Source:</span>
                  <span class="value">Investor Data Room</span>
                  <span class="label">Status:</span>
                  <span class="value">Interested (awaiting meeting)</span>
                  <span class="label">Time:</span>
                  <span class="value">${new Date().toLocaleString()}</span>
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                  <li>Investor has been sent a meeting booking link</li>
                  <li>Follow up if no meeting is scheduled within 48 hours</li>
                  <li>Prepare investor materials for the meeting</li>
              </ul>
              
              <div class="footer">
                  <p>This notification was sent from the Adora AI investor data room.</p>
              </div>
          </div>
      </body>
      </html>`
      });

      return NextResponse.json({
        message: 'Emails sent successfully',
        success: true
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 