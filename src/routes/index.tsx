import { usePreferences } from '@/components/preferences';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Send, UserRoundPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServicesSection, TelegramSection } from '@/components/site';
import { Calculator } from '@/components/calculator';
import { TELEGRAM_URL } from '@/lib/paypal';
import hero from '@/assets/payments-hero.jpg';
import content from '@/data/source-content.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Done Cogel — Convert PayPal, Jasa Bayar & Pembuatan Akun' },
    { name: 'description', content: 'Convert saldo PayPal ke bank dan e-wallet, jasa bayar, pembuatan akun PayPal, dan bantuan WD limit. Konsultasi dengan Done Cogel.' },
    { property: 'og:title', content: 'Done Cogel — Solusi PayPal Anda' },
    { property: 'og:description', content: 'Convert, jasa bayar, pembuatan akun dan bantuan limit PayPal. Lihat testimoni di Telegram @paypaldonecogel.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Home,
});
function Home(){ const { tr } = usePreferences(); return <>
  <section className="home-hero"><img className="hero-image" src={hero} alt="Ponsel pembayaran digital dan kartu biru" width={1536} height={1024} fetchPriority="high"/><div className="site-width hero-inner"><div className="hero-copy"><span className="hero-badge"><ShieldCheck size={13}/>{tr("PARTNER TRANSAKSI DIGITAL ANDA")}</span><h1>{tr("Solusi PayPal Anda.")}<br/><span className="text-primary">{tr("Cepat. Mudah.")}<br/>{tr("Terpercaya.")}</span></h1><p>{tr("Convert saldo, bayar belanja global, hingga pembuatan akun PayPal. Semua lebih praktis bersama Done Cogel.")}</p><div className="hero-actions"><Button asChild size="lg"><a href="#kalkulator">{tr("Convert PayPal Sekarang")} <ArrowRight/></a></Button><Button asChild size="lg" variant="outline"><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"><Send/>{tr("Lihat Testimoni")} <ArrowUpRight/></a></Button></div><div className="hero-trust"><ShieldCheck size={14}/><span>{tr("Sejak 2018")}</span><span>·</span><Zap size={13}/><span>{tr("Proses 5–15 menit setelah validasi")}</span></div></div></div></section>
  <div className="payment-strip"><div className="site-width payment-inner"><span>{tr("Cair langsung ke bank")}<br/>{tr("dan e-wallet favorit Anda")}</span><div className="payment-logos"><span className="payment-blue">BCA</span><span>mandiri</span><span>BNI</span><span>BRI</span><span className="payment-blue">DANA</span><span>OVO</span><span className="payment-green">gopay</span><span className="payment-small">{tr("& lainnya")}</span></div></div></div>
  <ServicesSection/>
  <Calculator/>
  <section className="section site-width"><div className="section-centered centered-title"><span className="eyebrow">{tr("CARA TRANSAKSI")}</span><h2>{tr("Tiga langkah, beres.")}</h2></div><div className="steps-grid">{[{t:'Pilih layanan & nominal',d:'Gunakan kalkulator atau pilih layanan yang sesuai dengan kebutuhan Anda.'},{t:'Konfirmasi dengan admin',d:'Kirim detail pesanan melalui WhatsApp. Admin mengonfirmasi rate dan langkah berikutnya.'},{t:'Transaksi diproses',d:'Setelah saldo diterima dan divalidasi, dana dikirim ke tujuan yang Anda pilih.'}].map((s,i)=><div key={tr(s.t)}><span className="step-number">0{i+1}</span><h3>{tr(s.t)}</h3><p>{tr(s.d)}</p></div>)}</div></section>
  <TelegramSection/>
  <section className="section site-width faq-preview"><div className="section-heading"><div><span className="eyebrow">{tr("PERTANYAAN UMUM")}</span><h2>{tr("Masih ada yang ingin ditanyakan?")}</h2></div></div>{content.faqItems.slice(1,4).map(f=><details key={tr(f.q)}><summary>{tr(f.q)}</summary><p>{tr(f.a)}</p></details>)}<details><summary>{tr("Bagaimana cara membuat akun PayPal?")}</summary><p>{tr("Kami mendampingi pendaftaran dengan identitas asli, email, dan nomor telepon milik Anda. Verifikasi dilakukan oleh pemilik akun sesuai ketentuan PayPal.")} <Link to="/pembuatan-akun" className="text-primary">{tr("Lihat jasa pembuatan akun PayPal.")}</Link></p></details><div className="faq-more"><Button asChild variant="link"><Link to="/faq">{tr("Lihat semua FAQ")} <ArrowRight/></Link></Button></div></section>
  <div className="new-service-banner"><div className="site-width new-service-inner"><span><UserRoundPlus size={21}/><span>{tr("Belum punya akun PayPal?")} <strong>{tr("Kami bantu dari awal.")}</strong></span></span><Button asChild variant="link"><Link to="/pembuatan-akun">{tr("Jasa Pembuatan Akun")} <ArrowUpRight/></Link></Button></div></div>
</>;}
