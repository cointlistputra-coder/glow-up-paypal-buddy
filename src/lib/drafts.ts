import drafts from '@/data/article-drafts.json';

export type DraftArticle = {
  topic: string; seoTitle: string; metaDescription: string; keyword: string; slug: string;
  intro: string; steps: { title: string; body: string }[]; tips: { problem: string; solution: string }[];
  faq: { q: string; a: string }[]; conclusion: string; sources: { label: string; url: string }[];
};

export const draftArticles = drafts as DraftArticle[];
export const findDraft = (slug: string) => draftArticles.find((a) => a.slug === slug);

export function wordCount(a: DraftArticle) {
  const text = [a.intro, ...a.steps.flatMap((s) => [s.title, s.body]), ...a.tips.flatMap((t) => [t.problem, t.solution]), ...a.faq.flatMap((f) => [f.q, f.a]), a.conclusion].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export const noindex = [{ name: 'robots', content: 'noindex, nofollow' }];
