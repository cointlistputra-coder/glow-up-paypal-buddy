import { usePreferences } from '@/components/preferences';
import { useState } from 'react';
import { X, BookOpen, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactLink, PageHeading } from '@/components/site';

type Item = {t:string;d?:string;full?:string};
export function ContentPage({ title, description, eyebrow, items, inquiry = false }: {title:string; description:string; eyebrow:string;items:Item[];inquiry?:boolean}) { const { tr } = usePreferences(); 
  const [query,setQuery]=useState('');
  const [article,setArticle]=useState<Item | null>(null);
  const filtered=items.filter(i=>`${tr(i.t)} ${tr(i.d ?? '')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <main className="site-width section"><PageHeading eyebrow={tr(eyebrow)} title={tr(title)} description={tr(description)}/>{!inquiry && <input className="search-input" type="search" aria-label={tr("Cari artikel")} placeholder={tr("Cari artikel atau panduan…")} value={query} onChange={e=>setQuery(e.target.value)}/>}<div className="content-grid">{filtered.map(i=><article className="content-item" key={tr(i.t)}><BookOpen size={24} className="text-primary"/><h3>{tr(i.t)}</h3><p>{i.d ? tr(i.d) : tr(i.full ?? "").slice(0,180)+'…'}</p>{inquiry ? <ContactLink service={tr(i.t)} label="Hubungi Admin"/> : <Button variant="link" onClick={()=>setArticle(i)}>{tr("Baca selengkapnya")} <ArrowUpRight/></Button>}</article>)}</div>{filtered.length===0 && <p className="subtle-note">{tr("Tidak ada artikel yang sesuai dengan pencarian Anda.")}</p>}{article && <div className="modal-backdrop" onClick={()=>setArticle(null)}><article role="dialog" aria-modal="true" aria-labelledby="article-title" className="order-modal article-modal" onClick={e=>e.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" aria-label={tr("Tutup artikel")} onClick={()=>setArticle(null)}><X/></Button><span className="eyebrow">{tr("PANDUAN DONE COGEL")}</span><h2 id="article-title">{tr(article.t)}</h2><p>{tr(article.full ?? article.d ?? "")}</p><ContactLink service={tr(article.t)}/></article></div>}</main>;
}