"use client";

import { Button } from "@/components/ui/button";
import { useForm, ValidationError } from "@formspree/react";
import { AlertCircleIcon, CheckCircleIcon, Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("Contact.Form");
  const formspreeFormId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID as string;
  const [state, handleSubmit] = useForm(formspreeFormId);

  if (state.succeeded) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{t("successMessage")}</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
          >
            {t("nameLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={state.submitting}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
          >
            {t("emailLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={state.submitting}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={t("emailPlaceholder")}
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-2"
        >
          {t("phoneLabel")}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          disabled={state.submitting}
          autoComplete="tel"
          className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={t("phonePlaceholder")}
          aria-label={t("phonePlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium mb-2"
        >
          {t("subjectLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          disabled={state.submitting}
          className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={t("subjectPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
        >
          {t("messageLabel")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          disabled={state.submitting}
          className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={t("messagePlaceholder")}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <Button
        type="submit"
        disabled={state.submitting}
        className="w-full sm:w-auto"
      >
        {state.submitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("submitting")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            {t("submit")}
          </span>
        )}
      </Button>

      {Array.isArray(state.errors) && state.errors.length > 0 && (
        <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span className="break-words">{t("errorMessage")}</span>
        </div>
      )}
    </form>
  );
};
