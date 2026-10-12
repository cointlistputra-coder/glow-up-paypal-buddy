import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/components/content-page';
import { pageMetadata } from '@/lib/metadata';
import content from '@/data/source-content.json';
export const Route = createFileRoute('/jasa-bayar')({head:()=>pageMetadata('Jasa Bayar PayPal','Bayar marketplace, langganan, kursus, game, dan invoice internasional bersama Done Cogel.'),component:Page});
function Page(){return <ContentPage title={'Jasa Bayar PayPal'} description={'Bayar marketplace, langganan, kursus, game, dan invoice internasional bersama Done Cogel.'} eyebrow={'GLOBAL PAYMENT'} items={content.jbayarItems} inquiry={true}/>;}
