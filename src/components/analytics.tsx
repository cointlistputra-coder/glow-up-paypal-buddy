import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    const id = 'AW-18275591345';
    const existing = document.getElementById('donecogel-google-tag');
    if (existing) return;
    const state = window as typeof window & { dataLayer?: unknown[] };
    state.dataLayer = state.dataLayer ?? [];
    function gtag(..._args: unknown[]) { state.dataLayer?.push(arguments); }
    gtag('js', new Date());
    gtag('config', id);
    const script = document.createElement('script');
    script.id = 'donecogel-google-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }, []);
  return null;
}