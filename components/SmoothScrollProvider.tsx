"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type LenisScrollContextValue = {
  scrollToTop: () => void;
};

const LenisScrollContext = createContext<LenisScrollContextValue>({
  scrollToTop: () => window.scrollTo({ top: 0, left: 0 }),
});

export const useLenisScroll = (): LenisScrollContextValue =>
  useContext(LenisScrollContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [scrollToTop, setScrollToTop] = useState<() => void>(() => () =>
    window.scrollTo({ top: 0, left: 0 })
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setScrollToTop(() => () => {
      lenis.scrollTo(0, { immediate: true });
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisScrollContext.Provider value={{ scrollToTop }}>
      {children}
    </LenisScrollContext.Provider>
  );
}
