import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, TelegramSection } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
export const Route=createFileRoute('/ulasan')({head:()=>pageMetadata('Testimoni Telegram','Lihat testimoni dan dokumentasi transaksi Done Cogel di Telegram @paypaldonecogel.'),component:Page});
function Page(){return <main><div className="site-width"><PageHeading eyebrow="TESTIMONI PELANGGAN" title="Testimoni Done Cogel" description="Dokumentasi transaksi dan pengalaman pelanggan tersedia melalui Telegram resmi kami."/></div><TelegramSection/></main>;}