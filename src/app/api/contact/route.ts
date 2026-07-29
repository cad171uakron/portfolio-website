import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    };

    // Input validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 20) {
      return NextResponse.json(
        { error: 'Message must be at least 20 characters.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      // Graceful fallback: let the client know the service isn't configured
      return NextResponse.json(
        { error: 'Email service is not configured yet.' },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailSubject = subject?.trim()
      ? subject.trim()
      : `Portfolio contact from ${name}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #070d1a; color: #f0f6ff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #38bdf8; margin-top: 0;">New Portfolio Message</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="color: #94a3b8; padding: 4px 0; width: 80px;">From:</td><td style="color: #f0f6ff;">${name}</td></tr>
          <tr><td style="color: #94a3b8; padding: 4px 0;">Email:</td><td><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
          ${subject?.trim() ? `<tr><td style="color: #94a3b8; padding: 4px 0;">Subject:</td><td style="color: #f0f6ff;">${subject}</td></tr>` : ''}
        </table>
        <hr style="border: none; border-top: 1px solid rgba(56,189,248,0.15); margin: 0 0 24px;" />
        <p style="color: #f0f6ff; white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      // Use your verified Resend domain if configured, otherwise falls back to shared sender
      from: process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>',
      to: ['cad171@uakron.edu'],
      replyTo: email,
      subject: emailSubject,
      html: htmlBody,
      text: `Name: ${name}\nEmail: ${email}\n${subject?.trim() ? `Subject: ${subject}\n` : ''}\n${message}`,
    });

    if (error) {
      console.error('[contact route] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[contact route] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
