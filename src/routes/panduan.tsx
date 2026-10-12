import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/components/content-page';
import { pageMetadata } from '@/lib/metadata';
import content from '@/data/source-content.json';
export const Route = createFileRoute('/panduan')({head:()=>pageMetadata('Master Guide PayPal','Pusat informasi tentang convert, limit, pembayaran dan penarikan PayPal di Indonesia.'),component:Page});
function Page(){return <ContentPage title={'Master Guide PayPal'} description={'Pusat informasi tentang convert, limit, pembayaran dan penarikan PayPal di Indonesia.'} eyebrow={'PUSAT BANTUAN'} items={content.education} inquiry={false}/>;}
