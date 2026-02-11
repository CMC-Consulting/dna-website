'use client';

import mermaid from 'mermaid';
import { useEffect, useMemo, useRef, useState } from 'react';

export type MermaidProps = {
  chart: string;
  /**
   * Mermaid configuration. If a string is provided it will be JSON-parsed.
   *
   * Note: we intentionally keep this shape loose to avoid coupling to a
   * specific Mermaid version's config typings.
   */
  config?: unknown;
};

function getTheme(): 'default' | 'dark' {
  // This project uses Tailwind's dark mode via `.dark` class.
  const html = document.documentElement;
  return html.classList.contains('dark') ? 'dark' : 'default';
}

function parseConfig(config: unknown): any {
  if (!config) return {};
  if (typeof config === 'string') {
    try {
      return JSON.parse(config);
    } catch {
      return {};
    }
  }
  return config;
}

/**
 * Client-side Mermaid renderer.
 *
 * We render diagrams explicitly via `mermaid.run()` to avoid relying on global
 * page lifecycle hooks and to work reliably with Next.js RSC hydration.
 */
export function Mermaid({ chart, config }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const configObj = useMemo(() => parseConfig(config), [config]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    (async () => {
      try {
        const theme = getTheme();
        const mermaidConfig = {
          startOnLoad: false,
          theme,
          ...(configObj?.mermaid ?? {}),
        };

        mermaid.initialize(mermaidConfig);

        // Reset + render this node only.
        el.removeAttribute('data-processed');
        // Use textContent (not innerHTML) so Mermaid receives the raw diagram text.
        el.textContent = chart;
        await mermaid.run({ nodes: [el] } as any);

        if (!cancelled) setError(null);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? String(e));
        // Fallback: show the source so user doesn't get a blank area.
        el.textContent = chart;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, configObj]);

  return (
    <>
      <div
        className="mermaid"
        ref={containerRef}
        data-mermaid-src={chart}
        data-mermaid-error={error ?? undefined}
        suppressHydrationWarning
      />
      {process.env.NODE_ENV !== 'production' && error ? (
        <pre className="mt-2 whitespace-pre-wrap rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
          Mermaid render error: {error}
        </pre>
      ) : null}
    </>
  );
}

