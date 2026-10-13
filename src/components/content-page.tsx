import { usePreferences } from '@/components/preferences';
import { useState } from 'react';
import {
  X,
  BookOpen,
  ArrowUpRight,
  Clock,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactLink, PageHeading } from '@/components/site';

type Item = {
  t: string;
  d?: string;
  full?: string;
};

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
  const [selectedItem, setSelectedItem] = useState<{ item: Item; img: string } | null>(null);

  const filtered = items.filter((i) =>
    `${tr(i.t)} ${tr(i.d ?? '')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
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
            placeholder={tr('Cari artikel atau panduan PayPal…')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      <div className="content-grid">
        {filtered.map((item, idx) => {
          // Otomatis mengambil gambar-1.jpg sampai gambar-7.jpg secara bergantian
          const nomorFoto = (idx % 7) + 1;
          const imageSrc = `/gambar-${nomorFoto}.jpg`;

          return (
            <article
              className="content-item"
              key={tr(item.t)}
              style={{
                overflow: 'hidden',
                padding: 0,
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
                boxShadow: 'var(--shadow)',
              }}
            >
              {!inquiry && (
                <div style={{ height: '185px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={imageSrc}
                    alt={tr(item.t)}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0, 48, 135, 0.85)',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)',
                      letterSpacing: '0.5px',
                    }}
                  >
                    PAYPAL PANDUAN
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
                    <span>4 min baca</span>
                    <span>•</span>
                    <span>Terverifikasi</span>
                  </div>
                )}

                {inquiry && <BookOpen size={24} className="text-primary" />}

                <h3 style={{ fontSize: '16px', lineHeight: 1.35, fontWeight: 700, margin: 0 }}>
                  {tr(item.t)}
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.8, margin: 0 }}>
                  {item.d ? tr(item.d) : tr(item.full ?? '').slice(0, 140) + '…'}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  {inquiry ? (
                    <ContactLink service={tr(item.t)} label="Hubungi Admin" />
                  ) : (
                    <Button
                      variant="link"
                      style={{ padding: 0, fontWeight: 700, fontSize: '11px' }}
                      onClick={() => setSelectedItem({ item, img: imageSrc })}
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

      {/* Modal Popup Saat Artikel Diklik */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            className="order-modal article-modal"
            style={{ maxWidth: '800px', padding: 0, overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: '100%', height: '240px', position: 'relative' }}>
              <img
                src={selectedItem.img}
                alt={tr(selectedItem.item.t)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="modal-close"
                aria-label={tr('Tutup artikel')}
                onClick={() => setSelectedItem(null)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  color: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                <X />
              </Button>
            </div>

            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="eyebrow" style={{ margin: 0 }}>
                  EDUKASI & KEAMANAN PAYPAL
                </span>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}>•</span>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> 4 min baca
                </span>
              </div>

              <h2 id="article-title" style={{ fontSize: '24px', lineHeight: 1.3, marginBottom: '18px' }}>
                {tr(selectedItem.item.t)}
              </h2>

              <div style={{ fontSize: '13px', lineHeight: 1.95, color: 'var(--foreground)' }}>
                <p style={{ whiteSpace: 'pre-line' }}>{tr(selectedItem.item.full ?? selectedItem.item.d ?? '')}</p>
              </div>

              <div
                style={{
                  marginTop: '28px',
                  padding: '20px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
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
                <div style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
                  <ContactLink service={tr(selectedItem.item.t)} label="Konsultasikan via WhatsApp" />
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
