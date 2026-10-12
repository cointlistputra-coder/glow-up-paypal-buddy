import { usePreferences } from '@/components/preferences';
import { useState } from 'react';
import { X, BookOpen, ArrowUpRight, Clock, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactLink, PageHeading } from '@/components/site';

type Item = {
  t: string;
  d?: string;
  full?: string;
  image?: string;
  category?: string;
  readTime?: string;
};

// Koleksi gambar keuangan & PayPal berkualitas tinggi
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&q=80',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
];

export function ContentPage({
  title,
  description,
  eyebrow,
  items,
  inquiry = false,
}: {
  title: string;
  description: string;
  eyebrow: string;
  items: Item[];
  inquiry?: boolean;
}) {
  const { tr } = usePreferences();
  const [query, setQuery] = useState('');
  const [article, setArticle] = useState<Item | null>(null);

  const filtered = items.filter((i) =>
    `${tr(i.t)} ${tr(i.d ?? '')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <main className="site-width section">
      <PageHeading eyebrow={tr(eyebrow)} title={tr(title)} description={tr(description)} />

      {!inquiry && (
        <div style={{ position: 'relative', maxWidth: '480px', marginBottom: '32px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted-foreground)',
            }}
          />
          <input
            className="search-input"
            type="search"
            style={{ paddingLeft: '42px', width: '100%' }}
            aria-label={tr('Cari artikel')}
            placeholder={tr('Cari artikel, panduan, atau tips convert…')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      <div className="content-grid">
        {filtered.map((item, idx) => {
          const cover = item.image ?? SAMPLE_IMAGES[idx % SAMPLE_IMAGES.length];
          return (
            <article
              className="content-item"
              key={tr(item.t)}
              style={{ overflow: 'hidden', padding: 0 }}
            >
              {!inquiry && (
                <div style={{ height: '175px', width: '100%', position: 'relative' }}>
                  <img
                    src={cover}
                    alt={tr(item.t)}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {tr('PANDUAN PAYPAL')}
                  </span>
                </div>
              )}

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                {!inquiry && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '10px',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    <Clock size={12} />
                    <span>{tr('4 min baca')}</span>
                  </div>
                )}

                {inquiry && <BookOpen size={24} className="text-primary" />}

                <h3 style={{ fontSize: '16px', lineHeight: 1.35, fontWeight: 700 }}>{tr(item.t)}</h3>

                <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                  {item.d ? tr(item.d) : tr(item.full ?? '').slice(0, 140) + '…'}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  {inquiry ? (
                    <ContactLink service={tr(item.t)} label="Hubungi Admin" />
                  ) : (
                    <Button
                      variant="link"
                      style={{ padding: 0, fontWeight: 700, fontSize: '11px' }}
                      onClick={() => setArticle({ ...item, image: cover })}
                    >
                      {tr('Baca selengkapnya')} <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                    </Button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="subtle-note">{tr('Tidak ada artikel yang sesuai dengan pencarian Anda.')}</p>
      )}

      {/* Modal Membaca Artikel Lengkap & Rinci */}
      {article && (
        <div className="modal-backdrop" onClick={() => setArticle(null)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            className="order-modal article-modal"
            style={{ maxWidth: '800px', padding: '34px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="modal-close"
              aria-label={tr('Tutup artikel')}
              onClick={() => setArticle(null)}
            >
              <X />
            </Button>

            <span className="eyebrow" style={{ marginBottom: '10px' }}>
              {tr('EDUKASI PAYPAL & FINANSIAL')}
            </span>

            <h2 id="article-title" style={{ fontSize: '24px', lineHeight: 1.3, marginBottom: '18px' }}>
              {tr(article.t)}
            </h2>

            {article.image && (
              <img
                src={article.image}
                alt={tr(article.t)}
                style={{
                  width: '100%',
                  maxHeight: '320px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '22px',
                }}
              />
            )}

            <div style={{ fontSize: '13px', lineHeight: 1.95, color: 'var(--foreground)' }}>
              <p style={{ whiteSpace: 'pre-line' }}>{tr(article.full ?? article.d ?? '')}</p>
            </div>

            {/* Kotak Bantuan WhatsApp di Bawah Artikel */}
            <div
              style={{
                marginTop: '30px',
                padding: '22px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck className="text-primary" size={20} />
                <strong style={{ fontSize: '13px' }}>
                  {tr('Butuh Bantuan Transaksi atau Convert PayPal?')}
                </strong>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: 0 }}>
                {tr(
                  'Admin TransferCepat siap membantu pencairan saldo kilat, transaksi marketplace luar negeri, dan konsultasi akun secara aman.'
                )}
              </p>
              <div style={{ alignSelf: 'flex-start', marginTop: '6px' }}>
                <ContactLink service={tr(article.t)} label="Konsultasikan via WhatsApp" />
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
            }
