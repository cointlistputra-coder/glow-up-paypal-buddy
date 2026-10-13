import { usePreferences } from '@/components/preferences';
import { useState } from 'react';
import {
  X,
  BookOpen,
  ArrowUpRight,
  Clock,
  Search,
  ShieldCheck,
  CreditCard,
  Landmark,
  Lock,
  ArrowDownUp,
  AlertTriangle,
  Wallet,
  RefreshCw,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactLink, PageHeading } from '@/components/site';

type Item = {
  t: string;
  d?: string;
  full?: string;
};

// Komponen Logo Resmi PayPal (Double P)
function PaypalLogo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M7.076 21.337H2.47a.64.64 0 0 1-.633-.74L4.94 2.802A1.14 1.14 0 0 1 6.066 1.9h7.458c3.09 0 5.438 1.408 5.105 4.512-.39 3.633-2.915 5.568-6.147 5.568h-2.19l-1.48 9.357h-1.736Z"
        fill="#0079C1"
      />
      <path
        d="M8.812 18.067H6.38a.64.64 0 0 1-.632-.74l1.865-11.8a1.14 1.14 0 0 1 1.127-.902h5.776c2.42 0 4.258 1.114 3.998 3.543-.312 2.906-2.316 4.455-4.887 4.455H11.83l-1.282 8.1h-1.736v-2.656Z"
        fill="#00457C"
      />
    </svg>
  );
}

// Konfigurasi 20 banner khusus PayPal sesuai topik artikel
const THEMES = [
  { label: 'AKUN & LIMIT', bg: 'linear-gradient(135deg, #001C38 0%, #003087 100%)', icon: ShieldCheck, badge: 'SISTEM KEAMANAN' },
  { label: 'BANK & E-WALLET', bg: 'linear-gradient(135deg, #003087 0%, #0079C1 100%)', icon: Landmark, badge: 'PENARIKAN DANA' },
  { label: 'G&S vs F&F', bg: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)', icon: ArrowDownUp, badge: 'METODE TRANSFER' },
  { label: 'DISPUTE RESOLUTION', bg: 'linear-gradient(135deg, #1D2A44 0%, #3B5360 100%)', icon: AlertTriangle, badge: 'PUSAT RESOLUSI' },
  { label: 'VERIFIKASI KARTU', bg: 'linear-gradient(135deg, #002B49 0%, #005F9E 100%)', icon: CreditCard, badge: 'VCC & DEBIT' },
  { label: 'HOLD 21 HARI', bg: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', icon: Clock, badge: 'DANA TERTUNDA' },
  { label: 'KURS & CONVERT', bg: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)', icon: Zap, badge: 'USD ⇄ IDR' },
  { label: 'KEAMANAN IP & VPN', bg: 'linear-gradient(135deg, #450A0A 0%, #991B1B 100%)', icon: Lock, badge: 'CYBER PROTECTION' },
  { label: 'LIMIT 180 HARI', bg: 'linear-gradient(135deg, #31111D 0%, #701A75 100%)', icon: RefreshCw, badge: 'PEMULIHAN WD' },
  { label: 'PERSONAL vs BISNIS', bg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', icon: Wallet, badge: 'TIPE AKUN' },
  { label: 'AUTENTIKASI 2FA', bg: 'linear-gradient(135deg, #003087 0%, #0284C7 100%)', icon: Lock, badge: 'KEAMANAN 2 LANGKAH' },
  { label: 'JASA BAYAR GLOBAL', bg: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)', icon: ShoppingBag, badge: 'CHECKOUT LUAR NEGERI' },
  { label: 'PROFIL & DATA', bg: 'linear-gradient(135deg, #134E4A 0%, #0F766E 100%)', icon: Landmark, badge: 'IDENTITAS LEGAL' },
  { label: 'PRODUK DIGITAL', bg: 'linear-gradient(135deg, #022C22 0%, #059669 100%)', icon: Zap, badge: 'SELLER DIGITAL' },
  { label: 'REFUND RESMI', bg: 'linear-gradient(135deg, #1C1917 0%, #44403C 100%)', icon: RefreshCw, badge: 'PENGEMBALIAN DANA' },
  { label: 'SWIFT CODE INDONESIA', bg: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)', icon: Landmark, badge: 'BCA • MANDIRI • BRI' },
  { label: 'ANTI-PHISHING', bg: 'linear-gradient(135deg, #450A0A 0%, #7F1D1D 100%)', icon: ShieldCheck, badge: 'PROTEKSI DINI' },
  { label: 'TRUST SCORE', bg: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)', icon: Zap, badge: 'SKOR AKUN' },
  { label: 'UPGRADE AKUN', bg: 'linear-gradient(135deg, #14532D 0%, #16A34A 100%)', icon: Wallet, badge: 'PREMIER & MERCHANT' },
  { label: 'SALDO RECEH', bg: 'linear-gradient(135deg, #003087 0%, #059669 100%)', icon: ArrowDownUp, badge: 'CAIR KE DANA & OVO' },
];

// Banner Grafis Khusus dengan Logo PayPal
function BlogBannerGraphic({ index, title }: { index: number; title: string }) {
  const theme = THEMES[index % THEMES.length]!;
  const IconComponent = theme.icon;

  return (
    <div
      style={{
        height: '185px',
        width: '100%',
        background: theme.bg,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px',
        color: '#ffffff',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Pola Lingkaran Background */}
      <div
        style={{
          position: 'absolute',
          right: '-25px',
          bottom: '-25px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bagian Atas: Logo PayPal + Badge Topik */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            padding: '5px 10px',
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <PaypalLogo size={20} />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#003087', letterSpacing: '-0.2px' }}>
            PayPal
          </span>
        </div>

        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '4px 9px',
            borderRadius: '4px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {theme.badge}
        </span>
      </div>

      {/* Bagian Bawah: Ikon Topik + Judul Kategori */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', zIndex: 1 }}>
        <div>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {theme.label}
          </span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginTop: '2px', maxWidth: '240px' }}>
            Done Cogel Guide
          </div>
        </div>

        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <IconComponent size={22} style={{ color: '#ffffff' }} />
        </div>
      </div>
    </div>
  );
}

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
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filtered = items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) =>
      `${tr(item.t)} ${tr(item.d ?? '')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

  const activeArticle = selectedIdx !== null ? items[selectedIdx] : null;

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
            placeholder={tr('Cari artikel, limit, atau panduan PayPal…')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      <div className="content-grid">
        {filtered.map(({ item, originalIndex }) => (
          <article
            className="content-item"
            key={tr(item.t)}
            style={{ overflow: 'hidden', padding: 0, borderRadius: '8px', border: '1px solid var(--border)' }}
          >
            {/* Banner Logo PayPal Khusus untuk Blog */}
            {!inquiry && <BlogBannerGraphic index={originalIndex} title={tr(item.t)} />}

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
                  <span>•</span>
                  <span>{THEMES[originalIndex % THEMES.length]?.badge}</span>
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
                    onClick={() => setSelectedIdx(originalIndex)}
                  >
                    {tr('Baca selengkapnya')} <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="subtle-note">{tr('Tidak ada artikel yang sesuai dengan pencarian Anda.')}</p>
      )}

      {/* Modal Popup Saat Artikel Diklik */}
      {activeArticle && selectedIdx !== null && (
        <div className="modal-backdrop" onClick={() => setSelectedIdx(null)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            className="order-modal article-modal"
            style={{ maxWidth: '800px', padding: 0, overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner Header di Dalam Modal */}
            <BlogBannerGraphic index={selectedIdx} title={tr(activeArticle.t)} />

            <div style={{ padding: '30px' }}>
              <Button
                variant="ghost"
                size="icon"
                className="modal-close"
                aria-label={tr('Tutup artikel')}
                onClick={() => setSelectedIdx(null)}
                style={{ position: 'absolute', right: '14px', top: '14px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                <X />
              </Button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="eyebrow" style={{ margin: 0 }}>
                  {THEMES[selectedIdx % THEMES.length]?.badge}
                </span>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}>•</span>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> 4 min baca
                </span>
              </div>

              <h2 id="article-title" style={{ fontSize: '24px', lineHeight: 1.3, marginBottom: '18px' }}>
                {tr(activeArticle.t)}
              </h2>

              <div style={{ fontSize: '13px', lineHeight: 1.95, color: 'var(--foreground)' }}>
                <p style={{ whiteSpace: 'pre-line' }}>{tr(activeArticle.full ?? activeArticle.d ?? '')}</p>
              </div>

              {/* Box Call To Action WhatsApp */}
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
                  <ContactLink service={tr(activeArticle.t)} label="Konsultasikan via WhatsApp" />
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
            }
