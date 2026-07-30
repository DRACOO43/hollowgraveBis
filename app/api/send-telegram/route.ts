export interface TelegramInquiryPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  deadline?: string;
  description?: string;
  message?: string;
  details?: string;
  subject?: string;
}

function escapeHtml(text: string = ''): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(req: Request) {
  try {
    const body: TelegramInquiryPayload = await req.json();

    const name = body.name?.trim() || 'N/A';
    const email = body.email?.trim() || 'N/A';
    const phone = body.phone?.trim() || 'N/A';
    const company = body.company?.trim() || 'N/A';
    const service = body.service?.trim() || body.subject?.trim() || 'General Inquiry';
    const budget = body.budget?.trim() || 'Not Specified';
    const deadline = body.deadline?.trim() || 'Flexible';
    const description = body.description?.trim() || body.message?.trim() || body.details?.trim() || 'No additional details provided.';

    if (!name || name === 'N/A' || !email || email === 'N/A') {
      return Response.json(
        { success: false, error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8884969830:AAG8mFf2ImmKPlYPjxY4Kk_0aFl-H7qIgDY';
    const chatId = process.env.TELEGRAM_CHAT_ID || '7011877702';

    const formattedText = `🚀 <b>NEW PROJECT INQUIRY</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Name:</b> ${escapeHtml(name)}
📧 <b>Email:</b> ${escapeHtml(email)}
📱 <b>Phone:</b> ${escapeHtml(phone)}
🏢 <b>Company:</b> ${escapeHtml(company)}
💼 <b>Service:</b> ${escapeHtml(service)}
💰 <b>Budget:</b> ${escapeHtml(budget)}
📅 <b>Deadline:</b> ${escapeHtml(deadline)}
📝 <b>Project Details:</b>
${escapeHtml(description)}

━━━━━━━━━━━━━━━━━━
🌐 Submitted from HOLLOWGRAVE Official Website`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        text: formattedText,
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error('Telegram API Error:', telegramData);
      return Response.json(
        {
          success: false,
          error: telegramData.description || 'Failed to deliver message via Telegram API.',
        },
        { status: telegramRes.status || 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Telegram notification sent successfully.',
      telegramResponse: telegramData,
    });
  } catch (error: any) {
    console.error('Send Telegram Route Exception:', error);
    return Response.json(
      { success: false, error: error.message || 'Internal server error while sending Telegram notification.' },
      { status: 500 }
    );
  }
}
