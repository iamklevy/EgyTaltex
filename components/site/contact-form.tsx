"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { HONEYPOT_FIELD } from "@/lib/contact";
import { sendContactMessage } from "@/lib/contact-action";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "h-auto rounded-xl border-ink/15 bg-white/70 px-4 py-3 text-base text-ink transition-all duration-300 placeholder:text-ink-muted/50 focus-visible:border-gold focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-gold/20 md:text-base";

function Field({
  label,
  name,
  type = "text",
  textarea,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} className="mb-2 block text-xs font-medium tracking-widest2 text-ink-muted uppercase">
        {label}
      </Label>
      {textarea ? (
        <Textarea id={name} name={name} rows={4} required={required} placeholder={label} className={cn(fieldClass, "resize-none")} />
      ) : (
        <Input id={name} name={name} type={type} required={required} placeholder={label} className={fieldClass} />
      )}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Blocks a second submit before React re-renders the disabled button.
  const inFlight = useRef(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const { ok } = await sendContactMessage(new FormData(form));
      if (!ok) throw new Error("Submission failed");
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus((s) => (s === "sent" ? "idle" : s)), 5000);
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t("formName")} name="name" />
        <Field label={t("formEmail")} name="email" type="email" />
      </div>
      <Field label={t("formCompany")} name="company" required={false} />
      <Field label={t("formMessage")} name="message" textarea />

      {/* Honeypot — off-screen and skipped by keyboard/assistive tech. */}
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -start-[9999px] h-0 w-0 opacity-0" />

      <div className="flex flex-wrap items-center gap-4 pt-2" aria-live="polite">
        <button type="submit" disabled={status === "sending"} className="btn-dark disabled:opacity-60">
          {t("formSubmit")} <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
        </button>
        {status === "sent" && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-olive"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-olive text-[11px] text-sand-50">✓</span>
            {t("formSent")}
          </motion.span>
        )}
        {status === "error" && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-700"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-red-700 text-[11px] text-sand-50">!</span>
            {t("formError")}
          </motion.span>
        )}
      </div>
    </form>
  );
}
