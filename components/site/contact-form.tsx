"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { CONTACT_TOPICS, HONEYPOT_FIELD } from "@/lib/contact";
import { sendContactMessage } from "@/lib/contact-action";
import { cn } from "@/lib/utils";
import { Arrow } from "./editorial";

const fieldClass =
  "block w-full rounded-2xl border border-transparent bg-paper px-4 text-base text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] ring-1 ring-line transition-[box-shadow,border-color] duration-200 outline-none placeholder:text-ink-muted/50 hover:ring-ink/20 focus:border-ink focus:ring-4 focus:ring-ink/5";

function Field({
  label,
  name,
  type = "text",
  textarea,
  required = true,
  optional,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  optional?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-ink-muted">{optional}</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          className={cn(fieldClass, "min-h-36 resize-y py-3.5 leading-relaxed")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(fieldClass, "h-13")}
        />
      )}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentName, setSentName] = useState("");
  // Blocks a second submit before React re-renders the disabled button.
  const inFlight = useRef(false);
  const topics = t.raw("topics") as string[];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const { ok } = await sendContactMessage(data);
      if (!ok) throw new Error("Submission failed");
      setSentName(String(data.get("name") ?? "").trim().split(/\s+/)[0]);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };

  if (status === "sent") {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" aria-live="polite">
        <span className="grid size-16 place-items-center rounded-full bg-ink text-paper duration-500 animate-in zoom-in-50 fade-in-0">
          <Check className="size-7" strokeWidth={2} />
        </span>
        <h3 className="mt-6 text-2xl font-medium tracking-tight text-balance rtl:tracking-normal">
          {t("formSentTitle", { name: sentName })}
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-ink-muted">{t("formSentBody")}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-8">
          {t("formSendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium tracking-tight rtl:tracking-normal">{t("formTitle")}</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">{t("formIntro")}</p>
      </div>

      {/* topic: real radios styled as pills, so keyboard and screen readers get a normal radio group */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">{t("topicLabel")}</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((id, i) => (
            <label key={id} className="cursor-pointer">
              <input type="radio" name="topic" value={id} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-full bg-paper px-4 text-sm ring-1 ring-line transition-colors duration-200 select-none hover:ring-ink/30 peer-checked:bg-ink peer-checked:text-paper peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {topics[i]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("formName")} name="name" autoComplete="name" />
        <Field label={t("formEmail")} name="email" type="email" autoComplete="email" />
      </div>
      <Field
        label={t("formCompany")}
        name="company"
        required={false}
        optional={t("formOptional")}
        autoComplete="organization"
      />
      <Field label={t("formMessage")} name="message" textarea placeholder={t("formMessagePlaceholder")} />

      {/* Honeypot — off-screen and skipped by keyboard/assistive tech. */}
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -start-[9999px] h-0 w-0 opacity-0" />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1" aria-live="polite">
        <button type="submit" disabled={status === "sending"} className="btn-primary group/send disabled:opacity-60">
          {status === "sending" ? t("formSending") : t("formSubmit")}
          <span className="transition-transform duration-200 group-hover/send:translate-x-0.5 rtl:group-hover/send:-translate-x-0.5">
            <Arrow />
          </span>
        </button>
        {status === "error" ? (
          <span className="text-sm text-destructive">{t("formError")}</span>
        ) : (
          <span className="text-sm text-ink-muted">{t("formReplyNote")}</span>
        )}
      </div>
    </form>
  );
}
