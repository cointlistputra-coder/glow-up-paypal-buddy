import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { findDraft, noindex, wordCount } from '@/lib/drafts';

export const Route = createFileRoute('/draf/$slug')({
  loader: ({ params }) => { const a = findDraft(params.slug); if (!a) throw notFound(); return a; },
  head: ({ loaderData: a }) => ({ meta: [
    { title: a ? `${a.seoTitle} — Panduan PayPal Indonesia` : 'Draf tidak ditemukan' },
    { name: 'description', content: a?.metaDescription ?? '' },
    { property: 'og:title', content: a?.seoTitle ?? 'Draf' },
    { property: 'og:description', content: a?.metaDescription ?? '' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary' },
    ...noindex,
  ] }),
  notFoundComponent: () => <main className="site-width reading"><p>Draf tidak ditemukan.</p><Link to="/draf">Kembali ke daftar draf</Link></main>,
  component: Page,
});

const paras = (t: string) => t.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>);

function Page() {
  const a = Route.useLoaderData();
  return (
    <main className="site-width reading">
      <p><Link to="/draf">← Semua draf</Link></p>
      <aside className="subtle-note" style={{ border: '1px dashed var(--border)', padding: 12, borderRadius: 8 }}>
        <strong>Draf — belum terbit.</strong> Kata kunci: {a.keyword} · ±{wordCount(a)} kata<br />
        Meta description: {a.metaDescription}
      </aside>
      <h1>{a.seoTitle}</h1>
      {paras(a.intro)}
      <h2>Langkah demi langkah</h2>
      {a.steps.map((s, i) => <section key={i}><h3>{i + 1}. {s.title}</h3>{paras(s.body)}</section>)}
      <h2>Tips dan solusi masalah</h2>
      {a.tips.map((t, i) => <section key={i}><h3>{t.problem}</h3>{paras(t.solution)}</section>)}
      <h2>FAQ</h2>
      {a.faq.map((f, i) => <details key={i}><summary>{f.q}</summary><p>{f.a}</p></details>)}
      <h2>Kesimpulan</h2>
      {paras(a.conclusion)}
      <h2>Sumber resmi</h2>
      <ul>{a.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
    </main>
  );
}
