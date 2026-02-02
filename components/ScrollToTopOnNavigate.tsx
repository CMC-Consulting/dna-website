"use client";

import { useLenisScroll } from "@/components/SmoothScrollProvider";
import { usePathname } from "@/i18n/routing";
import { useEffect } from "react";

export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const { scrollToTop } = useLenisScroll();

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
}
