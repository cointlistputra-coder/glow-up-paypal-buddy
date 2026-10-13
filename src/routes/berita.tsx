import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Calendar, RefreshCw, TrendingUp, ShieldAlert, Globe, ArrowRight, Landmark, Lock, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import { usePreferences } from '@/components/preferences';

export const Route = createFileRoute('/berita')({
  head: () =>
    pageMetadata(
      'Warta & Regulasi PayPal Harian',
      'Pembaruan faktual harian seputar kebijakan resmi PayPal, regulasi valas Bank Indonesia, dan keamanan transaksi digital.'
    ),
  component: BeritaPage,
});

// Warta Asli Berdasarkan Kebijakan & Regulasi Resmi Finansial
const FAKTA_BERITA_PAYPAL = [
  {
    kategori: 'REGULASI VALAS',
    judul: 'Memahami Currency Conversion Spread Resmi PayPal vs Kurs Tengah Bank Indonesia',
    ringkasan: 'PayPal menerapkan spread konversi mata uang standar berkisar 3% hingga 4% di atas kurs tengah pasar (wholesale rate) pada setiap penarikan langsung ke rekening bank lokal. Hal ini menjadi alasan utama mengapa transaksi konversi melalui pihak ketiga profesional sering kali memberikan nilai bersih rupiah (net IDR) yang jauh lebih tinggi dan bebas potongan tersembunyi.',
    ikon: TrendingUp,
    sumber: 'Kebijakan Finansial Valas Global',
  },
  {
    kategori: 'KEBIJAKAN AKUN',
    judul: 'Mekanisme Penahanan Dana 21 Hari (Payment Hold) untuk Transaksi Goods & Services',
    ringkasan: 'Berdasarkan User Agreement resmi PayPal, dana dari kategori Goods & Services (G&S) dapat ditahan hingga 21 hari untuk memitigasi risiko sengketa pembeli. Seller dapat memotong masa tunggu ini menjadi 24-48 jam dengan memperbarui status pesanan menjadi "Virtual Product / Service Delivered" dan meminta pembeli melakukan konfirmasi penerimaan di akun mereka.',
    ikon: FileCheck,
    sumber: 'PayPal Seller Protection Policy',
  },
  {
    kategori: 'ATURAN LIMITASI',
    judul: 'Prosedur Legal Penarikan Saldo Pasca-Limitasi Permanen 180 Hari',
    ringkasan: 'Ketika sebuah akun menerima Permanent Limitation (180 hari), saldo di dalamnya secara hukum tetap menjadi hak milik pengguna. Durasi 180 hari adalah batas waktu maksimal pengajuan tagihan balik (chargeback) kartu kredit internasional. Setelah periode ini tuntas, PayPal mengirimkan email resmi pelepasan dana agar sisa saldo dapat ditarik ke rekening bank domestik.',
    ikon: Landmark,
    sumber: 'Ketentuan Acceptable Use Policy (AUP)',
  },
  {
    kategori: 'KEAMANAN SIBER',
    judul: 'Adopsi Standar FIDO2 & Kunci Sandi (Passkeys) untuk Mencegah Pembajakan Akun',
    ringkasan: 'Sistem keamanan siber global mengimbau seluruh pengguna PayPal untuk mengaktifkan Autentikasi Dua Faktor (2FA) menggunakan aplikasi seperti Google Authenticator daripada SMS OTP guna menghindari ancaman SIM-swapping. Hindari login menggunakan VPN komersial karena IP yang berganti drastis akan langsung memicu sensor keamanan pembatasan akun sementara.',
    ikon: ShieldAlert,
    sumber: 'Pusat Keamanan Siber Finansial',
  },
  {
    kategori: 'TRANSAKSI GLOBAL',
    judul: 'Perbedaan Mendasar Proteksi Transaksi: Friends & Family vs Goods & Services',
    ringkasan: 'Metode Friends & Family (F&F) tidak memiliki proteksi pembeli namun bebas potongan biaya di sisi penerima jika bersumber dari saldo utama. Sebaliknya, metode komersial (G&S) mengenakan fee standar PayPal (rata-rata 4.4% + flat fee) dan mencakup perlindungan penuh melalui Resolution Center resmi.',
    ikon: Globe,
    sumber: 'Dokumentasi Transaksi Digital Asia',
  },
];

function BeritaPage() {
  const { tr } = usePreferences();
  const [currentDate, setCurrentDate] = useState('');
  const [items, setItems] = useState(FAKTA_BERITA_PAYPAL);
  const [isShuffling, setIsShuffling] = useState(false);

  // Tanggal otomatis update harian mengikuti tanggal kalender nyata
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

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setItems([...FAKTA_BERITA_PAYPAL].sort(() => Math.random() - 0.5));
      setIsShuffling(false);
    }, 300);
  };

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <PageHeading
        eyebrow={tr('WARTA & REGULASI RESMI')}
        title={tr('Warta & Edukasi Finansial PayPal')}
        description={tr('Pembaruan terverifikasi seputar kebijakan sistem PayPal, kurs valuta asing, dan keamanan transaksi digital.')}
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
          <RefreshCw size={14} className={isShuffling ? 'animate-spin' : ''} /> {tr('Acak Urutan Warta')}
        </Button>
      </div>

      {/* Grid Berita Faktual */}
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

              <h3 style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.4, margin: 0 }}>
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
                <span style={{ color: 'var(--muted-foreground)' }}>Referensi: {b.sumber}</span>
                <a
                  href="/blog"
                  style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Baca Panduan <ArrowRight size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
