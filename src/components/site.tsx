import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Send, MessageCircle, ChevronDown, ArrowDownUp, ShieldCheck, UserRoundPlus, ShoppingBag, Wrench, BookOpen, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TELEGRAM_URL, whatsappUrl } from '@/lib/paypal';

export const services = [
  { title: 'Convert PayPal', text: 'Tukar saldo PayPal ke Rupiah. Cair ke bank lokal atau e-wallet pilihan Anda.', icon: ArrowDownUp, to: '/' as const, tag: 'Paling populer' },
  { title: 'Jasa Bayar PayPal', text: 'Checkout marketplace, bayar invoice, dan langganan layanan internasional.', icon: ShoppingBag, to: '/jasa-bayar' as const },
  { title: 'Pembuatan Akun PayPal', text: 'Pendampingan membuat akun PayPal milik Anda sendiri, dari daftar hingga pengaturan awal.', icon: UserRoundPlus, to: '/pembuatan-akun' as const, tag: 'Layanan baru' },
  { title: 'WD Limit & Restore', text: 'Konsultasi pencairan saldo limit 180 hari dan pemulihan akun PayPal.', icon: Wrench, to: '/bengkel' as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  return <>
    <div className="announcement"><div className="site-width"><span><ShieldCheck size={13} /> Layanan PayPal terpercaya sejak 2018</span><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Testimoni Telegram <ArrowUpRight size={13} /></a></div></div>
    <header className="site-header"><div className="site-width nav-inner">
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><ArrowDownUp size={23} strokeWidth={3}/></span><span>done<span className="text-primary">cogel</span><small>PAYPAL & DIGITAL PAYMENT</small></span></Link>
      <nav className="desktop-nav" aria-label="Navigasi utama"><Link to="/" activeProps={{ className: 'nav-active' }} activeOptions={{exact:true}}>Beranda</Link><div className="nav-dropdown"><Button variant="ghost" onClick={() => setServiceOpen(!serviceOpen)} aria-expanded={serviceOpen}>Layanan <ChevronDown size={14}/></Button>{serviceOpen && <div className="dropdown-list">{services.map(s => <Link key={s.title} to={s.to} onClick={() => setServiceOpen(false)}>{s.title}</Link>)}</div>}</div><Link to="/panduan">Panduan</Link><Link to="/tentang">Tentang Kami</Link><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Testimoni <ArrowUpRight size={13}/></a></nav>
      <Button asChild className="header-contact"><a href={whatsappUrl('Halo Admin Done Cogel, saya ingin konsultasi layanan PayPal.')} target="_blank" rel="noopener noreferrer"><MessageCircle/> Hubungi Admin</a></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={open ? 'Tutup menu' : 'Buka menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
    </div>{open && <nav className="mobile-nav" aria-label="Navigasi seluler"><Link to="/" onClick={() => setOpen(false)}>Beranda</Link>{services.slice(1).map(s => <Link key={s.title} to={s.to} onClick={() => setOpen(false)}>{s.title}</Link>)}<Link to="/panduan" onClick={() => setOpen(false)}>Panduan</Link><Link to="/tentang" onClick={() => setOpen(false)}>Tentang Kami</Link><Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Testimoni Telegram <Send size={15}/></a></nav>}</header>
  </>;
}

export function ServicesSection() {
  return <section className="section site-width" id="layanan"><div className="section-heading"><div><span className="eyebrow">LAYANAN KAMI</span><h2>Semua kebutuhan PayPal,<br/>satu tempat.</h2></div><p>Dari transaksi sehari-hari sampai bantuan akun.<br/>Pilih layanan yang Anda butuhkan.</p></div><div className="service-grid">{services.map((s, i) => <Link to={s.to} key={s.title} className={`service-item service-${i}`}><div className="service-top"><span className="service-icon"><s.icon size={24}/></span>{s.tag && <span className="service-tag">{s.tag}</span>}</div><h3>{s.title}</h3><p>{s.text}</p><span className="service-link">{i === 0 ? 'Hitung konversi' : 'Lihat layanan'} <ArrowUpRight size={16}/></span></Link>)}</div></section>;
}

export function TelegramSection() {
  return <section className="telegram-section"><div className="site-width telegram-inner"><div><span className="eyebrow">BUKTI TRANSAKSI, BUKAN SEKADAR JANJI</span><h2>Kenali kami dari<br/>cerita pelanggan.</h2><p>Lihat testimoni dan dokumentasi transaksi Done Cogel<br/>langsung di Telegram kami.</p><Button asChild variant="telegram" size="lg"><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"><Send/> Lihat Testimoni Telegram <ArrowUpRight/></a></Button></div><a className="telegram-profile" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"><span className="telegram-avatar"><Send size={40}/></span><span className="telegram-profile-name">Done Cogel <ShieldCheck size={18}/></span><span className="telegram-handle">@paypaldonecogel</span><span className="telegram-profile-label">Testimoni & dokumentasi transaksi</span><span className="telegram-profile-bottom">Buka di Telegram <ArrowUpRight size={16}/></span></a></div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-width footer-grid"><div><Link to="/" className="brand"><span className="brand-mark"><ArrowDownUp size={23}/></span><span>done<span className="text-primary">cogel</span></span></Link><p>Solusi PayPal dan pembayaran digital<br/>untuk kebutuhan Anda.</p><div className="footer-social"><a aria-label="Telegram Done Cogel" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"><Send size={18}/></a><a aria-label="WhatsApp Done Cogel" href={whatsappUrl('Halo Admin Done Cogel')} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/></a></div></div><div><h4>Layanan</h4>{services.map(s => <Link key={s.title} to={s.to}>{s.title}</Link>)}</div><div><h4>Informasi</h4><Link to="/tentang">Tentang Kami</Link><Link to="/panduan">Master Guide</Link><Link to="/blog">Blog Edukasi</Link><Link to="/tutorial">Tutorial</Link><Link to="/faq">FAQ & Ketentuan</Link><Link to="/lokasi">Lokasi & Kontak</Link><Link to="/lapor">Keluhan Pelanggan</Link></div><div><h4>Jam Operasional</h4><p><Clock size={14}/> Senin – Sabtu<br/><strong>08.00 – 22.00 WIB</strong></p><p>Minggu / Hari Libur<br/><strong>10.00 – 20.00 WIB</strong></p><a href="mailto:support@donecogel.com"><Mail size={14}/> support@donecogel.com</a></div></div><div className="site-width footer-bottom"><span>© {new Date().getFullYear()} Done Cogel. Hak cipta dilindungi.</span><span>Layanan independen. Tidak berafiliasi dengan PayPal.</span></div></footer>;
}

export function ContactLink({ service, label = 'Konsultasi via WhatsApp' }: {service:string; label?:string}) { return <Button asChild size="lg"><a href={whatsappUrl(`Halo Admin Done Cogel, saya ingin konsultasi tentang ${service}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle/>{label}<ArrowRight/></a></Button>; }
export function PageHeading({ eyebrow, title, description }: {eyebrow:string;title:string;description:string}) {return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>;}