import "server-only";
import { Resend } from "resend";

// Sender identity for every email — the domain must be verified in the Resend dashboard.
export const EMAIL_FROM = process.env.EMAIL_FROM ?? "Egytaltex Website <website@egytaltex.com>";

let client: Resend | null = null;

/** Lazy singleton so a missing RESEND_API_KEY only breaks email sending, not the whole module graph. */
function resend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

/** Sends one email; resolves to whether it went out, logging the reason when it didn't. */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email:", opts.subject, "->", opts.to);
    return false;
  }
  try {
    const { error } = await resend().emails.send({ from: EMAIL_FROM, ...opts });
    if (error) {
      console.error("sendEmail failed", opts.subject, "->", opts.to, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("sendEmail threw", opts.subject, "->", opts.to, err);
    return false;
  }
}
