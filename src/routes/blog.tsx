import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/components/content-page';
import { pageMetadata } from '@/lib/metadata';
import content from '@/data/source-content.json';
export const Route = createFileRoute('/blog')({head:()=>pageMetadata('Blog Edukasi PayPal','Artikel dan panduan penggunaan PayPal, keamanan, pencairan dan transaksi internasional.'),component:Page});
function Page(){return <ContentPage title={'Blog Edukasi PayPal'} description={'Artikel dan panduan penggunaan PayPal, keamanan, pencairan dan transaksi internasional.'} eyebrow={'BLOG EDUKASI'} items={content.blogsData} inquiry={false}/>;}
