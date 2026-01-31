import EmailTemplate from '@/components/send-email';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log("api call received")
  try {
    const { email, message, firstName, familyName } = await req.json();
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['chafaafateh@gmail.com'],
      subject: `Email from ${familyName} ${firstName}`,
      react: EmailTemplate({ firstName: firstName, familyName: familyName, authorEmail: email, datetime: new Date(), desc: message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);

  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
