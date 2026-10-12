"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { HONEYPOT_FIELD } from "@/lib/contact";
import { sendContactMessage } from "@/lib/contact-action";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "h-12 rounded-none border-input bg-paper px-4 text-base text-ink placeholder:text-ink-muted/60 focus-visible:border-ink focus-visible:ring-0 md:text-base";

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
      <Label htmlFor={name} className="mb-2 block text-sm font-normal text-ink-muted">
        {label}
      </Label>
      {textarea ? (
        <Textarea id={name} name={name} rows={6} required={required} className={cn(fieldClass, "h-auto min-h-40 resize-y py-3")} />
      ) : (
        <Input id={name} name={name} type={type} required={required} className={fieldClass} />
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

      <div className="flex flex-wrap items-center gap-5 pt-2" aria-live="polite">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {t("formSubmit")}
        </button>
        {status === "sent" && <span className="text-sm text-success">{t("formSent")}</span>}
        {status === "error" && <span className="text-sm text-destructive">{t("formError")}</span>}
      </div>
    </form>
  );
}
