import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Newspaper, Calendar, RefreshCw, TrendingUp, ShieldAlert, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import { usePreferences } from '@/components/preferences';

export const Route = createFileRoute('/berita')({
  head: () =>
    pageMetadata(
      'Warta & Berita Finansial PayPal Hari Ini',
      'Pembaruan harian seputar kurs valuta asing, keamanan transaksi digital, dan panduan PayPal global.'
    ),
  component: BeritaPage,
});

// Kumpulan Berita Finansial & PayPal
const POOL_BERITA = [
  {
    kategori: 'PASAR KURS VALAS',
    judul: 'Pergerakan Kurs USD Terhadap Rupiah Pekan Ini Menunjukkan Tren Kuat',
    ringkasan: 'Nilai tukar Dollar AS mengalami penguatan tipis dipengaruhi oleh kebijakan suku bunga The Fed. Momen ini menjadi waktu terbaik bagi freelancer untuk melakukan convert saldo PayPal ke rekening lokal guna memaksimalkan hasil rupiah yang diterima.',
    ikon: TrendingUp,
    sumber: 'Market Review Global',
  },
  {
    kategori: 'KEAMANAN AKUN',
    judul: 'Peringatan Sistem: Waspadai Maraknya Email Phishing Mengatasnamakan Pembaruan Akun PayPal',
    ringkasan: 'Pusat keamanan siber mengimbau pengguna untuk tidak mengklik tautan pada email yang meminta reset sandi mendadak. Selalu pastikan domain resmi paypal.com dan aktifkan autentikasi dua faktor (2FA) demi perlindungan saldo.',
    ikon: ShieldAlert,
    sumber: 'Cyber Security Update',
  },
  {
    kategori: 'TRANSAKSI GLOBAL',
    judul: 'Peningkatan Adopsi PayPal Sebagai Metode Pembayaran Utama Kursus & Aset Digital Luar Negeri',
    ringkasan: 'Platform marketplace seperti Udemy, Canva, dan Upwork mencatatkan lonjakan transaksi dari Indonesia. Layanan jasa bayar independen terus menjadi solusi utama bagi talenta kreatif yang belum memiliki kartu kredit fisik.',
    ikon: Globe,
    sumber: 'Fintech Daily Asia',
  },
  {
    kategori: 'KEBIJAKAN MERCHANT',
    judul: 'Tips Melepas Saldo Ditahan (Hold 21 Hari) Lebih Cepat untuk Penjual Baru',
    ringkasan: 'PayPal menerapkan perlindungan pembeli secara ketat. Memperbarui status barang menjadi "Jasa/Produk Digital Terkirim" dan meminta konfirmasi penerimaan dari pihak pembeli terbukti mampu memotong masa tunggu hingga kurang dari 48 jam.',
    ikon: Newspaper,
    sumber: 'Seller Protection Insight',
  },
];

function BeritaPage() {
  const { tr } = usePreferences();
  const [currentDate, setCurrentDate] = useState('');
  const [items, setItems] = useState(POOL_BERITA);
  const [isShuffling, setIsShuffling] = useState(false);

  // Tanggal Otomatis Real-time Hari Ini
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formatted);
  }, []);

  // Fungsi Berita Random
  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setItems([...POOL_BERITA].sort(() => Math.random() - 0.5));
      setIsShuffling(false);
    }, 400);
  };

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <PageHeading
        eyebrow={tr('WARTA HARIAN & EDUKASI')}
        title={tr('Informasi & Berita Finansial')}
        description={tr('Pembaruan harian seputar nilai kurs, keamanan transaksi, dan ekosistem PayPal global.')}
      />

      {/* Bar Tanggal Real-Time Otomatis Hari Ini */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '16px 24px',
          backgroundColor: 'var(--accent)',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
          <Calendar size={18} className="text-primary" />
          <span>Edisi Hari Ini: <span style={{ color: 'var(--primary)' }}>{currentDate || 'Memuat tanggal...'}</span></span>
        </div>

        <Button size="sm" variant="outline" onClick={handleShuffle} disabled={isShuffling}>
          <RefreshCw size={14} className={isShuffling ? 'animate-spin' : ''} /> {tr('Acak / Muat Berita Lain')}
        </Button>
      </div>

      {/* Grid Berita Harian */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
        {items.map((b, idx) => {
          const Icon = b.ikon;
          return (
            <article
              key={idx}
              style={{
                backgroundColor: 'var(--card)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    backgroundColor: 'var(--accent)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {b.kategori}
                </span>
                <Icon size={18} style={{ color: 'var(--muted-foreground)' }} />
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 800, lineHeight: 1.4, margin: 0 }}>
                {b.judul}
              </h3>

              <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.85, margin: 0 }}>
                {b.ringkasan}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                }}
              >
                <span style={{ color: 'var(--muted-foreground)' }}>Sumber: {b.sumber}</span>
                <a
                  href="/blog"
                  style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Pelajari di Blog <ArrowRight size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
                    }
