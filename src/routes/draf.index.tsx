import { createFileRoute, Link } from '@tanstack/react-router';
import { PageHeading } from '@/components/site';
import { draftArticles, noindex, wordCount } from '@/lib/drafts';

export const Route = createFileRoute('/draf/')({
  head: () => ({ meta: [{ title: 'Draf Artikel — Panduan PayPal Indonesia' }, { name: 'description', content: 'Draf artikel tutorial PayPal untuk diperiksa sebelum diterbitkan.' }, { property: 'og:title', content: 'Draf Artikel PayPal' }, { property: 'og:description', content: 'Draf artikel untuk diperiksa.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, ...noindex] }),
  component: Page,
});

function Page() {
  return (
    <main className="site-width reading">
      <PageHeading eyebrow="DRAF — BELUM TERBIT" title="Draf Artikel PayPal" description="Artikel ini belum tampil di blog dan disembunyikan dari mesin pencari. Periksa isinya sebelum diterbitkan." />
      <ol>
        {draftArticles.map((a) => (
          <li key={a.slug} style={{ marginBottom: 12 }}>
            <Link to="/draf/$slug" params={{ slug: a.slug }}><strong>{a.seoTitle}</strong></Link>
            <br /><small>{a.keyword} · ±{wordCount(a)} kata</small>
          </li>
        ))}
      </ol>
    </main>
  );
}
