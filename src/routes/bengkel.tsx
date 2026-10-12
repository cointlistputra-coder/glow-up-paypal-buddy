import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/components/content-page';
import { pageMetadata } from '@/lib/metadata';
import content from '@/data/source-content.json';
export const Route = createFileRoute('/bengkel')({head:()=>pageMetadata('WD Limit & Restore PayPal','Konsultasi pencairan saldo PayPal limit 180 hari, pembatasan akun, dan pengajuan banding.'),component:Page});
function Page(){return <ContentPage title={'WD Limit & Restore PayPal'} description={'Konsultasi pencairan saldo PayPal limit 180 hari, pembatasan akun, dan pengajuan banding.'} eyebrow={'BENGKEL SPECIALIST'} items={content.bengkelItems} inquiry={true}/>;}
