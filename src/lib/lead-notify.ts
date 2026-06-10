import type { LeadRecord } from "@/src/lib/leads";

type NotifyResult = {
  channel: "webhook" | "telegram" | "inbox";
  ok: boolean;
  message: string;
};

function leadSummary(lead: LeadRecord) {
  return [
    `Lead ID: ${lead.id}`,
    `Date: ${lead.createdAt}`,
    `Name: ${lead.name}`,
    `Company: ${lead.company || "-"}`,
    `Role: ${lead.role || "-"}`,
    `Email: ${lead.email}`,
    `Phone/Telegram: ${lead.phone_or_telegram}`,
    `Services: ${lead.service_interest.join(", ")}`,
    `Budget: ${lead.budget_range}`,
    `Timeline: ${lead.timeline}`,
    `Language: ${lead.preferred_language}`,
    `Summary: ${lead.project_summary}`,
  ].join("\n");
}

export async function notifyLead(lead: LeadRecord) {
  const results: NotifyResult[] = [];

  const webhook = process.env.LEAD_INBOX_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_lead", lead }),
      });

      results.push({
        channel: "webhook",
        ok: response.ok,
        message: response.ok ? "Webhook delivered" : `Webhook failed (${response.status})`,
      });
    } catch {
      results.push({ channel: "webhook", ok: false, message: "Webhook request failed" });
    }
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (botToken && chatId) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: leadSummary(lead),
          disable_web_page_preview: true,
        }),
      });

      results.push({
        channel: "telegram",
        ok: response.ok,
        message: response.ok ? "Telegram delivered" : `Telegram failed (${response.status})`,
      });
    } catch {
      results.push({ channel: "telegram", ok: false, message: "Telegram request failed" });
    }
  }

  const inbox = process.env.LEAD_INBOX_EMAIL;
  if (inbox) {
    console.info(`[LEAD INBOX] send to ${inbox}\n${leadSummary(lead)}`);
    results.push({ channel: "inbox", ok: true, message: "Lead prepared for inbox delivery" });
  }

  if (!results.length) {
    console.info(`[LEAD FALLBACK]\n${leadSummary(lead)}`);
  }

  return results;
}

