"use client";

import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  Loader2,
  Send,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ContactForm = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const t = useTranslations("Contact.Form");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setStatus("loading");
      setErrorMessage("");

      const result = await submitContact(formData);

      if (!result.success) {
        throw new Error(result.error || t("errorMessage"));
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("errorMessage")
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

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
            disabled={status === "loading"}
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
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={t("emailPlaceholder")}
          />
        </div>
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
          disabled={status === "loading"}
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
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
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

      {status === "success" && (
        <div className="flex items-start gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{t("successMessage")}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span className="break-words">{errorMessage}</span>
        </div>
      )}
    </form>
  );
};
