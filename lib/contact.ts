export const PHONE_1 = "+20 122 213 0316";
export const PHONE_2 = "+20 100 213 0316";
export const FAX = "+20 2 2271 6032";
export const EMAIL = "egytaltex@yahoo.com";

/** The printable company profile; rebuilt from scripts/profile/profile.html. */
export const PROFILE_PDF = "/downloads/egytaltex-company-profile.pdf";

export const SITE_URL = "https://egytaltex.com";

/** tel: link for a display-formatted number ("+20 122 …" -> "tel:+20122…"). */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Hidden contact-form field real visitors never fill; bots that auto-fill every input do. */
export const HONEYPOT_FIELD = "website";

/** Contact-form topics, in messages `contact.topics` order. English labels go in the enquiry email. */
export const CONTACT_TOPICS = ["quote", "samples", "visit", "other"] as const;
export const CONTACT_TOPIC_LABELS: Record<(typeof CONTACT_TOPICS)[number], string> = {
  quote: "Quote for a programme",
  samples: "Samples & development",
  visit: "Factory visit",
  other: "Something else",
};
