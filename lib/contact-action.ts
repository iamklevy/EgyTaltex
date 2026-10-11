"use server";

import { EMAIL, HONEYPOT_FIELD } from "@/lib/contact";
import { sendEmail } from "@/lib/email/client";

const MAX_LEN = { name: 200, email: 320, company: 200, message: 5000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const field = (f: FormData, key: keyof typeof MAX_LEN) => String(f.get(key) ?? "").trim().slice(0, MAX_LEN[key]);

export async function sendContactMessage(formData: FormData): Promise<{ ok: boolean }> {
  // Pretend success so bots don't learn to skip the honeypot.
  if (String(formData.get(HONEYPOT_FIELD) ?? "")) return { ok: true };

  const name = field(formData, "name");
  const email = field(formData, "email");
  const company = field(formData, "company");
  const message = field(formData, "message");

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false };

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b6259">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  const ok = await sendEmail({
    to: process.env.CONTACT_TO ?? EMAIL,
    replyTo: email,
    subject: `Website enquiry from ${name}${company ? ` (${company})` : ""}`,
    html: `<table style="font-family:sans-serif;font-size:14px">${rows}</table>
<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  return { ok };
}
