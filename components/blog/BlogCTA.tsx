"use client";

import { Button } from "@/components/ui/button";
import { normalizeEmail, validateEmail } from "@/lib/email";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle, Loader2, Mail, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function BlogCTA() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const t = useTranslations("BlogCTA");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const normalizedEmailAddress = normalizeEmail(email);
    const { isValid, error } = validateEmail(normalizedEmailAddress);

    if (!isValid) {
      setSubscribeStatus("error");
      setErrorMessage(error || t("defaultErrorMessage"));
      setTimeout(() => setSubscribeStatus("idle"), 5000);
      return;
    }

    try {
      setSubscribeStatus("loading");

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmailAddress }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("errorMessage"));
      }

      setSubscribeStatus("success");
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      setSubscribeStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("errorMessage2")
      );
      setTimeout(() => setSubscribeStatus("idle"), 5000);
    }
  };

  return (
    <section className="mt-12 sm:mt-16 lg:mt-20">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6 sm:p-8 lg:p-10">
        {/* Background decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 size-40 rounded-full bg-primary/5 blur-3xl"
        />

        <div className="relative">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            <span>{t("badge")}</span>
          </div>

          {/* Heading */}
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {t("title")}
          </h3>

          {/* Description */}
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t("description")}
          </p>

          {/* Form */}
          {subscribeStatus === "success" ? (
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-green-500/10 p-4 text-green-600 dark:text-green-400">
              <CheckCircle className="size-5 shrink-0" />
              <p className="text-sm font-medium">{t("successMessage")}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("placeholder")}
                  required
                  className={cn(
                    "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-all",
                    "placeholder:text-muted-foreground/60",
                    "focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    subscribeStatus === "error" && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                  disabled={subscribeStatus === "loading"}
                />
              </div>
              <Button
                type="submit"
                disabled={subscribeStatus === "loading"}
                className="group h-[46px] rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 sm:shrink-0"
              >
                {subscribeStatus === "loading" ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t("subscribing")}
                  </>
                ) : (
                  <>
                    {t("subscribe")}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Error message */}
          {subscribeStatus === "error" && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}

          {/* Privacy note */}
          <p className="mt-4 text-xs text-muted-foreground/80">
            {t("privacyNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
