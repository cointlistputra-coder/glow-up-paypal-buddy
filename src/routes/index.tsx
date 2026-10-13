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
  Wrench,
  Lock,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServicesSection, TelegramSection } from '@/components/site';
import { Calculator } from '@/components/calculator';
import { TELEGRAM_URL, whatsappUrl } from '@/lib/paypal';
import hero from '@/assets/payments-hero.jpg';
import content from '@/data/source-content.json';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Done Cogel — Convert PayPal, Jasa Bayar, Pembuatan Akun & WD Limit 180 Hari' },
      { name: 'description', content: 'Convert saldo PayPal ke DANA/BCA, jasa bayar belanja luar negeri, dan pendampingan pencairan akun limit permanen 180 hari. Aman, legal, dan transparan.' },
      { property: 'og:title', content: 'Done Cogel — Solusi PayPal & Pembayaran Digital Terpercaya' },
      { property: 'og:description', content: 'Convert kilat 5-15 menit, stok dollar live, dan spesialis pencairan akun limit 180 hari.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Home,
});

function Home() {
  const { tr } = usePreferences();

  // State Statistik Live yang bisa diatur oleh Admin
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
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch {}
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="home-hero">
        <img className="hero-image" src={hero} alt="Ponsel pembayaran digital dan kartu biru" width={1536} height={1024} fetchPriority="high" />
        <div className="site-width hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">
              <ShieldCheck size={13} />
              {tr("PARTNER TRANSAKSI DIGITAL ANDA")}
            </span>
            <h1>
              {tr("Solusi PayPal Anda.")}<br />
              <span className="text-primary">
                {tr("Cepat. Mudah.")}<br />
                {tr("Terpercaya.")}
              </span>
            </h1>
            <p>
              {tr("Convert saldo, bayar belanja global, jasa WD limit permanen 180 hari, hingga pembuatan akun PayPal. Semua lebih praktis bersama Done Cogel.")}
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

      {/* STRIP LOGO BANK & E-WALLET */}
      <div className="payment-strip">
        <div className="site-width payment-inner">
          <span>{tr("Cair langsung ke bank")}<br />{tr("dan e-wallet favorit Anda")}</span>
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

      {/* ============================================================ */}
      {/* WIDGET LIVE STATS, STOCK DOLLAR & REPUTASI (DAPAT DIATUR ADMIN) */}
      {/* ============================================================ */}
      <section className="site-width" style={{ marginTop: '45px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(5, 150, 105, 0.12)', color: '#059669', padding: '6px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            LIVE STOCK & DATA FINANSIAL HARI INI
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>Pembaruan real-time sistem</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
          {/* Card 1: Stock Tersedia */}
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

          {/* Card 2: Saldo Terjual */}
          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary)', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>SALDO TERJUAL</span>
              <Activity size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              ${stats.saldoSold} <small style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>USD</small>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Volume Akumulasi</span>
          </div>

          {/* Card 3: Transaksi Sukses */}
          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#0284c7', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>TRANSAKSI SUKSES</span>
              <CheckCircle2 size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              {stats.successTx}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Tercatat Sejak 2018</span>
          </div>

          {/* Card 4: Member Aktif */}
          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#8b5cf6', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>MEMBER AKTIF</span>
              <Users size={18} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)' }}>
              {stats.activeMembers}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Freelancer & Bisnis</span>
          </div>

          {/* Card 5: Rata-rata Proses */}
          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f59e0b', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>RATA-RATA PROSES</span>
              <Clock size={18} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--foreground)', marginTop: '4px' }}>
              {stats.avgProcess}
            </div>
            <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Ke Bank & E-Wallet</span>
          </div>

          {/* Card 6: Clean & Legal Funds */}
          <div style={{ padding: '18px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#059669', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>STATUS SALDO</span>
              <ShieldCheck size={18} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--foreground)', marginTop: '6px' }}>
              {stats.cleanFunds}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>Bebas Masalah / Dispute</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BANNER KHUSUS: JASA PENCAIRAN (WD) LIMIT PERMANEN 180 HARI  */}
      {/* ============================================================ */}
      <section className="site-width" style={{ margin: '40px auto' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            alignItems: 'center',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div>
            <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', fontSize: '10px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Wrench size={13} /> SPESIALIS AKUN TERKUNCI (BENGKEL PAYPAL)
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '14px 0 10px 0', lineHeight: 1.25 }}>
              Jasa WD Saldo Akun PayPal Limit Permanen (180 Hari)
            </h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.8, margin: 0 }}>
              Punya saldo dollar yang tertahan di akun PayPal yang terkena penutupan permanen (180 hari)? Jangan dibiarkan hangus! Dana tersebut adalah hak legal Anda. Kami memberikan pendampingan penarikan resmi langsung masuk ke rekening bank lokal Anda (BCA, Mandiri, BRI, dll) dengan aman, transparan, dan bergaransi.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#34d399" /> Tanpa Risiko Retur Bank
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#34d399" /> Pendampingan Step-by-Step
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#34d399" /> Fee Dibayar Setelah Cair
              </span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '26px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: '#38bdf8' }}>
              <Lock size={26} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Konsultasi Saldo Limit Sekarang
            </h3>
            <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '20px' }}>
              Kirimkan screenshot notifikasi email 180 hari Anda kepada admin kami untuk pengecekan status kelayakan secara gratis.
            </p>
            <Button asChild size="lg" style={{ width: '100%', backgroundColor: '#059669', hoverBackgroundColor: '#047857', color: '#ffffff', fontWeight: 800 }}>
              <a href={whatsappUrl('Halo Admin Done Cogel, saya ingin konsultasi jasa WD pencairan saldo PayPal limit permanen 180 hari.')} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> Konsultasi WD Limit via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* LAYANAN KAMI */}
      <ServicesSection />

      {/* KALKULATOR TRANSAKSI */}
      <Calculator />

      {/* CARA TRANSAKSI TIGA LANGKAH */}
      <section className="section site-width">
        <div className="section-centered centered-title">
          <span className="eyebrow">{tr("CARA TRANSAKSI")}</span>
          <h2>{tr("Tiga langkah, beres.")}</h2>
        </div>
        <div className="steps-grid">
          {[
            { t: 'Pilih layanan & nominal', d: 'Gunakan kalkulator atau pilih layanan yang sesuai dengan kebutuhan Anda.' },
            { t: 'Konfirmasi dengan admin', d: 'Kirim detail pesanan melalui WhatsApp. Admin mengonfirmasi rate dan langkah berikutnya.' },
            { t: 'Transaksi diproses', d: 'Setelah saldo diterima dan divalidasi, dana dikirim ke tujuan yang Anda pilih.' },
          ].map((s, i) => (
            <div key={tr(s.t)}>
              <span className="step-number">0{i + 1}</span>
              <h3>{tr(s.t)}</h3>
              <p>{tr(s.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TELEGRAM TESTIMONI */}
      <TelegramSection />

      {/* FAQ PREVIEW */}
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
          <summary>{tr("Bagaimana cara membuat akun PayPal?")}</summary>
          <p>
            {tr("Kami mendampingi pendaftaran dengan identitas asli, email, dan nomor telepon milik Anda. Verifikasi dilakukan oleh pemilik akun sesuai ketentuan PayPal.")}{' '}
            <Link to="/pembuatan-akun" className="text-primary">{tr("Lihat jasa pembuatan akun PayPal.")}</Link>
          </p>
        </details>
        <details>
          <summary>Berapa lama proses pencairan saldo akun limit 180 hari?</summary>
          <p>
            Setelah masa 180 hari genap dan Anda menerima email notifikasi pelepasan dana dari PayPal, proses penarikan saldo ke bank lokal yang kami dampingi umumnya membutuhkan waktu 1 hingga 3 hari kerja mengikuti kliring transfer internasional bank di Indonesia.
          </p>
        </details>
        <div className="faq-more">
          <Button asChild variant="link">
            <Link to="/faq">{tr("Lihat semua FAQ")} <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      {/* BANNER JASA PEMBUATAN AKUN */}
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
