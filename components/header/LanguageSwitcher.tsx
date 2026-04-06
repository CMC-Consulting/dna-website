"use client";

import { ChevronRight, Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale, LOCALE_NAMES, LOCALES, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  mode?: "desktop" | "mobile";
  className?: string;
  onLocaleChange?: () => void;
};

export function LanguageSwitcher({
  mode = "desktop",
  className,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    onLocaleChange?.();
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  if (mode === "mobile") {
    return (
      <div className={cn("py-4", className)}>
        <button
          type="button"
          className="text-primary flex w-full items-center justify-between text-base font-medium"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          disabled={isPending}
        >
          <span className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span>Language</span>
          </span>
          <span className="text-muted-foreground flex items-center gap-2 text-sm font-normal">
            <span>{LOCALE_NAMES[locale] ?? locale.toUpperCase()}</span>
            <ChevronRight
              className={cn(
                "size-4 transition-transform duration-200",
                isMobileOpen && "rotate-90",
              )}
            />
          </span>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isMobileOpen ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-muted/50 space-y-2 rounded-lg p-4">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                className={cn(
                  "hover:bg-accent block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                  locale === loc ? "bg-accent text-accent-foreground" : "text-primary",
                )}
                disabled={isPending}
                onClick={() => {
                  setIsMobileOpen(false);
                  handleLocaleChange(loc as Locale);
                }}
              >
                <span>{LOCALE_NAMES[loc]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", className)}
          disabled={isPending}
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc as Locale)}
            className={locale === loc ? "bg-accent" : ""}
          >
            {LOCALE_NAMES[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
