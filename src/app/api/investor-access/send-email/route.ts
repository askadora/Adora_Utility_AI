import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, isAccredited } = await req.json();

    // Validate input
    if (!name || !email || typeof isAccredited !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Only send email to accredited investors
    if (!isAccredited) {
      return NextResponse.json(
        { message: 'No email sent - not an accredited investor' },
        { status: 200 }
      );
    }

    try {
      const investorPassword = process.env.INVESTOR_PASSWORD || '@d0r@!vest0r2025';
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.adoraos.ai';

      // Send investor email with password
      await resend.emails.send({
        from: 'Adora AI <noreply@adorahq.ai>',
        to: [email],
        subject: 'Investor Data Room Access - Adora AI',
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Investor Data Room Access</title>
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; }
              .container { background: white; border-radius: 8px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
              .logo { display: block; margin: 0 auto 24px; height: 40px; }
              .header { text-align: center; margin-bottom: 32px; }
              .title { color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 8px 0; }
              .subtitle { color: #64748b; font-size: 16px; margin: 0; }
              .password-section { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 24px 0; text-align: center; }
              .password-label { font-weight: 600; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
              .password { font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 18px; font-weight: 700; color: #059669; background: white; padding: 12px 16px; border: 2px solid #10b981; border-radius: 4px; display: inline-block; letter-spacing: 1px; }
              .instructions { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 16px; margin: 24px 0; }
              .instructions-title { font-weight: 600; color: #92400e; margin: 0 0 8px 0; }
              .instructions-text { color: #92400e; margin: 0; font-size: 14px; }
              .warning { background: #fee2e2; border: 1px solid #ef4444; border-radius: 6px; padding: 16px; margin: 24px 0; }
              .warning-title { font-weight: 600; color: #dc2626; margin: 0 0 8px 0; }
              .warning-text { color: #dc2626; margin: 0; font-size: 14px; }
              .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
              .link { color: #3b82f6; text-decoration: none; }
              .link:hover { text-decoration: underline; }
          </style>
      </head>
      <body>
          <div class="container">
              <img src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/adora-ai-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvYWRvcmEtYWktbG9nby5wbmciLCJpYXQiOjE3NTA5OTk2MDEsImV4cCI6MTc4MjUzNTYwMX0.QCL7iKtPh9OWIhi9YLgR-GtiRNKRQN-S73EEHguGf6A" alt="Adora AI" class="logo">
              
              <div class="header">
                  <h1 class="title">Welcome to the Investor Data Room</h1>
                  <p class="subtitle">Your access credentials are below</p>
              </div>
              
              <p>Hi ${name},</p>
              
              <p>Thank you for your interest in Adora AI. As an accredited investor, you now have access to our exclusive investor data room.</p>
              
              <div class="password-section">
                  <div class="password-label">Your Access Password</div>
                  <div class="password">${investorPassword}</div>
              </div>
              
              <div class="instructions">
                  <div class="instructions-title">How to Access:</div>
                  <p class="instructions-text">
                      1. Visit our investor portal at <a href="${baseUrl}/company/investors" class="link">adoraos.ai/company/investors</a><br>
                      2. Enter the password above when prompted<br>
                      3. Explore our financial data, projections, and investor materials
                  </p>
              </div>
              
              <div class="warning">
                  <div class="warning-title">⚠️ Important Security Notice</div>
                  <p class="warning-text">
                      This password provides access to confidential investor information. Please keep it secure and do not share it with unauthorized individuals.
                  </p>
              </div>
              
              <p>If you have any questions about the information in the data room or need assistance accessing it, please don't hesitate to reach out to our investor relations team.</p>
              
              <div class="footer">
                  <p>Best regards,<br>The Adora AI Team</p>
                  <p>© 2025 Adora AI. All rights reserved.</p>
                  <p>If you didn't request this access, please contact us immediately at <a href="mailto:hello.adorahq@gmail.com" class="link">hello.adorahq@gmail.com</a></p>
              </div>
          </div>
      </body>
      </html>`
      });

      return NextResponse.json({
        message: 'Email sent successfully',
        success: true
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
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