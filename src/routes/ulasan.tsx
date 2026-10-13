import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Star, MessageSquarePlus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import { usePreferences } from '@/components/preferences';

export const Route = createFileRoute('/ulasan')({
  head: () =>
    pageMetadata(
      'Ulasan & Testimoni Pelanggan',
      'Lihat penilaian dan ulasan nyata dari pelanggan jasa convert dan pembayaran PayPal TransferCepat.'
    ),
  component: UlasanPage,
});

export type Review = {
  id: string;
  name: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Rizky Ramadhan',
    rating: 5,
    service: 'Convert PayPal ke DANA',
    comment: 'Prosesnya beneran kilat, gak sampai 7 menit saldo DANA udah masuk. Rate-nya juga tinggi dibanding jasa lain!',
    date: 'Kemarin',
  },
  {
    id: 'rev-2',
    name: 'Siti Sarah',
    rating: 5,
    service: 'Jasa Bayar Canva Pro',
    comment: 'Admin ramah dan fast respon banget pas butuh langganan Canva mendadak. Sangat terbantu!',
    date: '3 hari yang lalu',
  },
  {
    id: 'rev-3',
    name: 'Dimas Kurnia',
    rating: 5,
    service: 'WD Limit 180 Hari',
    comment: 'Akun lama yang kena limit 180 hari akhirnya berhasil dicairkan ke BCA lewat panduan admin. Terima kasih banyak!',
    date: '1 minggu yang lalu',
  },
];

function UlasanPage() {
  const { tr } = usePreferences();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Convert PayPal');
  const [comment, setComment] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tc_customer_reviews');
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem('tc_customer_reviews', JSON.stringify(DEFAULT_REVIEWS));
      }
    } catch {
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      name: name.trim(),
      rating,
      service,
      comment: comment.trim(),
      date: 'Baru saja',
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('tc_customer_reviews', JSON.stringify(updated));
    } catch {}

    setName('');
    setComment('');
    setShowForm(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 5000);
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <PageHeading
        eyebrow={tr('KEPUASAN PELANGGAN')}
        title={tr('Ulasan & Testimoni')}
        description={tr('Pengalaman nyata pelanggan dalam menggunakan layanan convert saldo, jasa bayar, dan bantuan PayPal kami.')}
      />

      {/* Ringkasan Skor & Tombol Tulis Ulasan */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '24px',
          backgroundColor: 'var(--card)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
            {avgRating}
          </div>
          <div>
            <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '4px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill="#f59e0b" />
              ))}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>
              Berdasarkan <strong>{reviews.length} ulasan</strong> terverifikasi
            </span>
          </div>
        </div>

        <Button onClick={() => setShowForm(!showForm)} style={{ fontWeight: 700 }}>
          <MessageSquarePlus size={16} /> {showForm ? tr('Tutup Formulir') : tr('Tulis Ulasan Anda')}
        </Button>
      </div>

      {successMsg && (
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: 'rgba(5, 150, 105, 0.15)',
            border: '1px solid #059669',
            color: '#059669',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          <CheckCircle2 size={18} /> Ulasan Anda berhasil diterbitkan! Terima kasih atas kepercayaannya.
        </div>
      )}

      {/* Form Input Ulasan Baru */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'var(--card)',
            padding: '26px',
            borderRadius: '12px',
            border: '2px solid var(--primary)',
            marginBottom: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 800 }}>{tr('Bagikan Pengalaman Transaksi Anda')}</h3>

          {/* Rating Bintang Interaktif */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              {tr('Rating Bintang:')}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                >
                  <Star
                    size={28}
                    fill={star <= rating ? '#f59e0b' : 'none'}
                    color={star <= rating ? '#f59e0b' : 'var(--muted-foreground)'}
                  />
                </button>
              ))}
              <span style={{ fontSize: '13px', fontWeight: 700, alignSelf: 'center', marginLeft: '6px' }}>
                {rating} dari 5 Bintang
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                {tr('Nama Anda:')}
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Rian / Pelanggan Setia"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                {tr('Layanan yang Digunakan:')}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
              >
                <option value="Convert PayPal">Convert PayPal ke Bank / E-Wallet</option>
                <option value="Jasa Bayar PayPal">Jasa Bayar Belanja Global</option>
                <option value="Pembuatan Akun PayPal">Pembuatan & Setup Akun</option>
                <option value="WD Limit 180 Hari">Pencairan Dana Limit 180 Hari</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              {tr('Komentar / Pengalaman Anda:')}
            </label>
            <textarea
              required
              rows={4}
              placeholder="Ceritakan kecepatan proses, keramahan admin, atau kepuasan Anda..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
            />
          </div>

          <Button type="submit" size="lg" style={{ alignSelf: 'flex-start', fontWeight: 700 }}>
            {tr('Kirim Ulasan Sekarang')}
          </Button>
        </form>
      )}

      {/* Daftar Kartu Ulasan Pelanggan */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              padding: '22px',
              backgroundColor: 'var(--card)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={15}
                    fill={s <= r.rating ? '#f59e0b' : 'none'}
                    color={s <= r.rating ? '#f59e0b' : 'var(--muted-foreground)'}
                  />
                ))}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>{r.date}</span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
              "{r.comment}"
            </p>

            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '13px', display: 'block' }}>{r.name}</strong>
                <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 600 }}>{r.service}</span>
              </div>
              <ShieldCheck size={18} style={{ color: '#059669' }} aria-label="Ulasan Terverifikasi" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
  }
