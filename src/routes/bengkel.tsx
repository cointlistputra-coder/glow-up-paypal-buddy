import { createFileRoute } from '@tanstack/react-router';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Lock,
  MessageCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, ContactLink } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import { whatsappUrl } from '@/lib/paypal';
import { usePreferences } from '@/components/preferences';

export const Route = createFileRoute('/bengkel')({
  head: () =>
    pageMetadata(
      'Jasa WD Limit Permanen 180 Hari & Pemulihan Akun PayPal',
      'Layanan pendampingan resmi mencairkan saldo akun PayPal yang terkena limit permanen 180 hari dan pemulihan pembatasan akun ke bank lokal.'
    ),
  component: BengkelPage,
});

function BengkelPage() {
  const { tr } = usePreferences();

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <PageHeading
        eyebrow={tr('BENGKEL & RESTORE AKUN')}
        title={tr('Jasa WD Limit Permanen 180 Hari & Pemulihan Akun')}
        description={tr('Solusi resmi dan aman untuk mencairkan saldo yang tertahan di akun PayPal terkena penutupan permanen (180 hari) hingga masuk ke rekening bank lokal Anda.')}
      />

      {/* BANNER UTAMA WD LIMIT 180 HARI */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #311042 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '36px',
          margin: '20px 0 45px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          alignItems: 'center',
          boxShadow: 'var(--shadow)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.25)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', fontSize: '10px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Wrench size={13} /> PENDAMPINGAN RESMI SAMPAI CAIR
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '14px 0 10px 0', lineHeight: 1.3 }}>
            Punya Saldo Tertahan di Akun yang Terkena Limit Permanen?
          </h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.8, margin: 0 }}>
            Ketika akun Anda terkena notifikasi <em>"You can't use PayPal anymore"</em>, saldo Anda <strong>bukan berarti hilang</strong>. Secara hukum finansial internasional, dana tersebut tetap milik Anda. Setelah melewati masa karantina 180 hari (masa berlaku chargeback), saldo wajib dilepaskan oleh PayPal. Kami mendampingi proses penarikan resminya ke bank lokal (BCA, Mandiri, BRI, BNI, dll) tanpa risiko retur.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap', fontSize: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#34d399" /> Pendampingan Step-by-Step
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#34d399" /> Solusi Kendala Beda Nama Bank
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#34d399" /> Biaya Jasa Dibayar Setelah Saldo Masuk
            </span>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '26px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 12px', color: '#38bdf8' }}>
            <Lock size={24} />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            Konsultasikan Akun Anda
          </h3>
          <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '18px' }}>
            Kirimkan tangkapan layar email 180 hari dari PayPal kepada admin kami untuk pengecekan kelayakan penarikan saldo secara gratis.
          </p>
          <Button asChild size="lg" style={{ width: '100%', backgroundColor: '#059669', color: '#ffffff', fontWeight: 800 }}>
            <a href={whatsappUrl('Halo Admin TransferCepat, saya ingin konsultasi jasa WD akun PayPal limit permanen 180 hari.')} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> Konsultasi via WhatsApp <ArrowRight size={14} />
            </a>
          </Button>
        </div>
      </div>

      {/* 4 LANGKAH PROSEDUR PENARIKAN WD LIMIT */}
      <div style={{ marginBottom: '45px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span className="eyebrow">ALUR PROSEDUR RESMI</span>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Bagaimana Cara Saldo Limit 180 Hari Dicairkan?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          <div style={{ padding: '22px', backgroundColor: 'var(--card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'var(--primary)', fontWeight: 800, display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
              1
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Konfirmasi Email 180 Hari</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              Memastikan Anda sudah menerima email resmi dari PayPal bertuliskan <em>"Your funds are eligible for withdrawal"</em>.
            </p>
          </div>

          <div style={{ padding: '22px', backgroundColor: 'var(--card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'var(--primary)', fontWeight: 800, display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
              2
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Pembersihan Sesi & Akses Aman</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              Mengakses akun melalui koneksi IP domestik yang bersih tanpa VPN guna menghindari deteksi sistem keamanan pembajakan.
            </p>
          </div>

          <div style={{ padding: '22px', backgroundColor: 'var(--card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'var(--primary)', fontWeight: 800, display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
              3
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Penautan Rekening Kompatibel</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              Menghubungkan rekening bank lokal dengan kode SWIFT dan format nama yang tepat agar tidak terjadi penolakan sistem bank.
            </p>
          </div>

          <div style={{ padding: '22px', backgroundColor: 'var(--card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'var(--primary)', fontWeight: 800, display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
              4
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Kliring Dana ke Rekening Anda</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              Dana otomatis ditransfer ke rekening bank lokal Anda dalam 1 hingga 3 hari kerja mengikuti siklus kliring nasional.
            </p>
          </div>
        </div>
      </div>

      {/* KOTAK KONSULTASI CEPAT */}
      <div style={{ padding: '28px', backgroundColor: 'var(--accent)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <HelpCircle size={28} className="text-primary" style={{ margin: '0 auto 10px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Akun Anda Masih Belum Genap 180 Hari?</h3>
        <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '18px' }}>
          Jangan mencoba membuat akun baru secara sembarangan di perangkat yang sama. Konsultasikan tanggal pembatasan akun Anda agar kami jadwalkan waktu penarikannya dengan tepat.
        </p>
        <ContactLink service="Jasa WD Limit 180 Hari & Pemulihan Akun" label="Tanya Admin via WhatsApp" />
      </div>
    </main>
  );
              }
