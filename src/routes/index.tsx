import { usePreferences } from '@/components/preferences';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Send,
  UserRoundPlus,
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

  return (
    <>
      {/* HERO SECTION */}
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

      {/* DAFTAR LAYANAN KAMI */}
      <ServicesSection />

      {/* KALKULATOR TRANSAKSI */}
      <Calculator />

      {/* ALUR TRANSAKSI TIGA LANGKAH */}
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

      {/* TESTIMONI TELEGRAM */}
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

      {/* BANNER BAWAH PEMBUATAN AKUN */}
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
