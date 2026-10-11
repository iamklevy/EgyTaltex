export const PHONE_1 = "+20 122 213 0316";
export const PHONE_2 = "+20 100 213 0316";
export const FAX = "+20 2 2271 6032";
export const EMAIL = "egytaltex@yahoo.com";

export const SITE_URL = "https://egytaltex.com";

/** tel: link for a display-formatted number ("+20 122 …" -> "tel:+20122…"). */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Hidden contact-form field real visitors never fill; bots that auto-fill every input do. */
export const HONEYPOT_FIELD = "website";
