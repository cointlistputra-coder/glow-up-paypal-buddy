import { usePreferences } from '@/components/preferences';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Send,
  UserRoundPlus,
  DollarSign,
  Activity,
  Users,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServicesSection, TelegramSection } from '@/components/site';
import { Calculator } from '@/components/calculator';
import { TELEGRAM_URL } from '@/lib/paypal';
import hero from '@/assets/payments-hero.jpg';
import content from '@/data/source-content.json';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'Jasa Convert Saldo PayPal & Mencairkan PayPal ke DANA / BCA — TransferCepat',
      },
      {
        name: 'description',
        content:
          'Jasa convert saldo PayPal tercepat 5-15 menit cair ke DANA, BCA, OVO, Mandiri, BRI. Layanan mencairkan paypal, jasa WD limit permanen 180 hari, dan jasa bayar terpercaya sejak 2018.',
      },
      {
        name: 'keywords',
        content:
          'convert, jasa convert paypal, jasa wd, jasa wd paypal, mencairkan paypal, cairkan saldo paypal, akun paypal limit permanen, cara menarik saldo paypal limit 180 hari, jual beli saldo paypal, paypal ke dana, paypal ke bca, rate convert paypal tertinggi, jasa bayar paypal, transfercepat, done cogel',
      },
      { property: 'og:title', content: 'TransferCepat — Jasa Convert Saldo & Mencairkan PayPal Terpercaya' },
      {
        property: 'og:description',
        content:
          'Convert saldo PayPal ke DANA, GoPay, OVO, dan Bank Lokal dengan rate terbaik. Proses kilat dan 100% aman.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://transfercepat.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Home,
});

function Home() {
  const { tr } = usePreferences();

  // Data Statistik Live yang Terhubung ke Admin
  const [stats, setStats] = useState({
    stockAvailable: '5.240',
    saldoSold: '168.450',
    successTx: '14.800+',
    activeMembers: '6.200+',
    avgProcess: '5–15 Menit',
    cleanFunds: '100% Legal & Clean',
  });

  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('tc_site_stats');
      if (savedStats) setStats(JSON.parse(savedStats));
    } catch {}
  }, []);

  return (
    <>
      {/* HERO SECTION KAYA KATA KUNCI SEO */}
      <section className="home-hero">
        <img
          className="hero-image"
          src={hero}
          alt="Jasa convert saldo PayPal dan mencairkan PayPal ke rekening bank lokal"
          width={1536}
          height={1024}
          fetchPriority="high"
        />
        <div className="site-width hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">
              <ShieldCheck size={13} />
              {tr("JASA CONVERT & PENCAIRAN PAYPAL TERPERCAYA")}
            </span>
            <h1>
              {tr("Solusi PayPal Anda.")}<br />
              <span className="text-primary">
                {tr("Cepat. Mudah.")}<br />
                {tr("Terpercaya.")}
              </span>
            </h1>
            <p>
              {tr("Convert saldo PayPal ke DANA, BCA, dan e-wallet lokal. Layanan mencairkan PayPal, pembayaran transaksi global, hingga pembuatan akun resmi sejak 2018.")}
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#kalkulator">{tr("Convert PayPal Sekarang")} <ArrowRight /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Send />{tr("Lihat Testimoni")} <ArrowUpRight />
                </a>
              </Button>
            </div>
            <div className="hero-trust">
              <ShieldCheck size={14} />
              <span>{tr("Sejak 2018")}</span>
              <span>·</span>
              <Zap size={13} />
              <span>{tr("Proses 5–15 menit setelah validasi")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP REKENING & E-WALLET TUJUAN */}
      <div className="payment-strip">
        <div className="site-width payment-inner">
          <span>{tr("Mencairkan PayPal ke bank")}<br />{tr("dan e-wallet favorit Anda")}</span>
          <div className="payment-logos">
            <span className="payment-blue">BCA</span>
            <span>mandiri</span>
            <span>BNI</span>
            <span>BRI</span>
            <span className="payment-blue">DANA</span>
            <span>OVO</span>
            <span className="payment-green">gopay</span>
            <span className="payment-small">{tr("& lainnya")}</span>
          </div>
        </div>
      </div>

      {/* WIDGET LIVE STOCK & DATA FINANSIAL HARI INI */}
      <section className="site-width" style={{ marginTop: '40px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(5, 150, 105, 0.12)', color: '#059669', padding: '6px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            LIVE STOCK & DATA FINANSIAL HARI INI
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>Update real-time sistem</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#059669', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>STOCK TERSEDIA</span>
              <DollarSign size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              ${stats.stockAvailable} <small style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>USD</small>
            </div>
            <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>● Ready Kirim Instan</span>
          </div>

          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary)', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>SALDO TERJUAL</span>
              <Activity size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              ${stats.saldoSold} <small style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>USD</small>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Total Terakumulasi</span>
          </div>

          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#0284c7', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>TRANSAKSI SUKSES</span>
              <CheckCircle2 size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              {stats.successTx}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Convert & Jasa WD</span>
          </div>

          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#8b5cf6', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>MEMBER AKTIF</span>
              <Users size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              {stats.activeMembers}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Pengguna Terverifikasi</span>
          </div>

          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f59e0b', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>RATA-RATA PROSES</span>
              <Clock size={18} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--foreground)', marginTop: '4px' }}>
              {stats.avgProcess}
            </div>
            <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Pencairan Kilat</span>
          </div>

          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#059669', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>STATUS SALDO</span>
              <ShieldCheck size={18} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--foreground)', marginTop: '6px' }}>
              {stats.cleanFunds}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Bebas Masalah Legal</span>
          </div>
        </div>
      </section>

      {/* DAFTAR LAYANAN */}
      <ServicesSection />

      {/* KALKULATOR CONVERT */}
      <Calculator />

      {/* ALUR TRANSAKSI */}
      <section className="section site-width">
        <div className="section-centered centered-title">
          <span className="eyebrow">{tr("CARA TRANSAKSI")}</span>
          <h2>{tr("Tiga langkah, beres.")}</h2>
        </div>
        <div className="steps-grid">
          {[
            { t: 'Pilih layanan & nominal', d: 'Gunakan kalkulator atau pilih layanan convert/WD yang sesuai.' },
            { t: 'Konfirmasi dengan admin', d: 'Kirim detail pesanan via WhatsApp. Admin mengonfirmasi rate terkini.' },
            { t: 'Dana ditransfer instan', d: 'Setelah saldo tervalidasi, rupiah langsung masuk ke bank atau e-wallet Anda.' },
          ].map((s, i) => (
            <div key={tr(s.t)}>
              <span className="step-number">0{i + 1}</span>
              <h3>{tr(s.t)}</h3>
              <p>{tr(s.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONI */}
      <TelegramSection />

      {/* FAQ */}
      <section className="section site-width faq-preview">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{tr("PERTANYAAN UMUM")}</span>
            <h2>{tr("Masih ada yang ingin ditanyakan?")}</h2>
          </div>
        </div>
        {content.faqItems.slice(1, 4).map((f) => (
          <details key={tr(f.q)}>
            <summary>{tr(f.q)}</summary>
            <p>{tr(f.a)}</p>
          </details>
        ))}
        <details>
          <summary>Apakah melayani jasa WD limit permanen 180 hari?</summary>
          <p>
            Ya, kami memiliki layanan khusus pendampingan penarikan (WD) saldo akun PayPal yang terkena limitasi permanen 180 hari hingga tuntas cair ke rekening bank Anda.{' '}
            <Link to="/bengkel" className="text-primary" style={{ fontWeight: 700 }}>
              Lihat panduan lengkap Jasa WD Limit & Restore di sini.
            </Link>
          </p>
        </details>
        <div className="faq-more">
          <Button asChild variant="link">
            <Link to="/faq">{tr("Lihat semua FAQ")} <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      {/* BANNER BAWAH */}
      <div className="new-service-banner">
        <div className="site-width new-service-inner">
          <span>
            <UserRoundPlus size={21} />
            <span>{tr("Belum punya akun PayPal?")} <strong>{tr("Kami bantu dari awal.")}</strong></span>
          </span>
          <Button asChild variant="link">
            <Link to="/pembuatan-akun">{tr("Jasa Pembuatan Akun")} <ArrowUpRight /></Link>
          </Button>
        </div>
      </div>
    </>
  );
}
