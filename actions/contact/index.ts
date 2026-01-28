'use server';

import { siteConfig } from '@/config/site';
import { ContactNotificationEmail } from '@/emails/contact-notification';
import { checkRateLimit } from '@/lib/rateLimit';
import { normalizeEmail, validateEmail } from '@/lib/email';
import { sendEmail } from '../resend';

export async function submitContact(formData: FormData) {
  try {
    await checkRateLimit();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return {
        success: false,
        error: 'Please enter your name',
      };
    }

    if (!email || typeof email !== 'string') {
      return {
        success: false,
        error: 'Please enter your email address',
      };
    }

    const normalizedEmail = normalizeEmail(email);
    const { isValid, error } = validateEmail(normalizedEmail);

    if (!isValid) {
      return {
        success: false,
        error: error || 'Please enter a valid email address',
      };
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return {
        success: false,
        error: 'Please enter a subject',
      };
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return {
        success: false,
        error: 'Please enter your message',
      };
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL is not configured');
      return {
        success: false,
        error: 'Contact service is not configured',
      };
    }

    const submittedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // Send notification email to admin
    const emailResult = await sendEmail({
      email: adminEmail,
      subject: `[${siteConfig.name}] New Contact Form Submission: ${subject}`,
      react: ContactNotificationEmail,
      reactProps: {
        name,
        email: normalizedEmail,
        subject,
        message,
        submittedAt,
      },
    });

    if (!emailResult.success) {
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
