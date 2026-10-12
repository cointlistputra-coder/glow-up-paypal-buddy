import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, ContactLink } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import content from '@/data/source-content.json';
export const Route=createFileRoute('/tentang')({head:()=>pageMetadata('Tentang Done Cogel','Kenali Done Cogel, layanan ekosistem PayPal dan pembayaran digital di Indonesia sejak 2018.'),component:Page});
function Page(){return <main className="site-width reading"><PageHeading eyebrow="TENTANG KAMI" title="Done Cogel" description="Layanan PayPal dan pembayaran digital, hadir untuk kebutuhan transaksi Anda."/>{content.about.map((p,i)=><p key={i}>{p}</p>)}<ContactLink service="layanan Done Cogel"/></main>;}