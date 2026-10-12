import { usePreferences } from '@/components/preferences';
import { useState } from 'react';
import { X, BookOpen, ArrowUpRight, Clock, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactLink, PageHeading } from '@/components/site';

type Item = {
  t: string;
  d?: string;
  full?: string;
  image?: string;
  category?: string;
  readTime?: string;
};

// Koleksi gambar keuangan & PayPal berkualitas tinggi
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&q=80',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
];

export function ContentPage({
  title,
  description,
  eyebrow,
  items,
  inquiry = false,
}: {
  title: string;
  description:
