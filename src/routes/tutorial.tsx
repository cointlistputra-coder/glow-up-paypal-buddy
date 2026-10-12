import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/components/content-page';
import { pageMetadata } from '@/lib/metadata';
import content from '@/data/source-content.json';
export const Route = createFileRoute('/tutorial')({head:()=>pageMetadata('Tutorial PayPal','Panduan verifikasi identitas, checkout, dana tertahan, bank dan pembayaran invoice.'),component:Page});
function Page(){return <ContentPage title={'Tutorial PayPal'} description={'Panduan verifikasi identitas, checkout, dana tertahan, bank dan pembayaran invoice.'} eyebrow={'TUTORIAL'} items={content.tutorials} inquiry={false}/>;}
