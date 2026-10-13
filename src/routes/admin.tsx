import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  LogOut,
  Star,
  Trash2,
  PlusCircle,
  DollarSign,
  Activity,
  Users,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/metadata';

export const Route = createFileRoute('/admin')({
  head: () => pageMetadata('Admin Dashboard', 'Panel kelola transaksi, ulasan, dan live stock TransferCepat.'),
  component: AdminPage,
});

type Transaction = {
  id: string;
  customerName: string;
  whatsapp: string;
  service: string;
  amountUsd: number;
  totalIdr: string;
  targetAccount: string;
  status: 'Menunggu Saldo' | 'Validasi Mutasi' | 'Selesai' | 'Dibatalkan';
  createdAt: string;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
};

const ADMIN_PASSWORD = 'admin123';

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'transaksi' | 'ulasan' | 'stats'>('transaksi');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Form Pengaturan Stock & Live Stats (Bisa diatur Admin)
  const [liveStats, setLiveStats] = useState({
    stockAvailable: '5.240',
    saldoSold: '168.450',
    successTx: '14.800+',
    activeMembers: '6.200+',
    avgProcess: '5–15 Menit',
    cleanFunds: '100% Legal & Clean',
  });
  const [statsSavedMsg, setStatsSavedMsg] = useState(false);

  // Form Tambah Ulasan Manual
  const [showAddReview, setShowAddReview] = useState(false);
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revService, setRevService] = useState('Convert PayPal');
  const [revComment, setRevComment] = useState('');

  useEffect(() => {
    try {
      const savedTx = localStorage.getItem('tc_all_transactions');
      if (savedTx) setTransactions(JSON.parse(savedTx));

      const savedRev = localStorage.getItem('tc_customer_reviews');
      if (savedRev) setReviews(JSON.parse(savedRev));

      const savedStats = localStorage.getItem('tc_site_stats');
      if (savedStats) setLiveStats(JSON.parse(savedStats));
    } catch {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Password Admin salah!');
    }
  };

  const updateStatus = (id: string, newStatus: Transaction['status']) => {
    const updated = transactions.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    setTransactions(updated);
    localStorage.setItem('tc_all_transactions', JSON.stringify(updated));
  };

  const deleteReview = (id: string) => {
    if (confirm('Yakin ingin menghapus ulasan ini?')) {
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      localStorage.setItem('tc_customer_reviews', JSON.stringify(updated));
    }
  };

  const addManualReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newR: Review = {
      id: 'rev-' + Date.now(),
      name: revName,
      rating: revRating,
      service: revService,
      comment: revComment,
      date: 'Hari ini',
    };
    const updated = [newR, ...reviews];
    setReviews(updated);
    localStorage.setItem('tc_customer_reviews', JSON.stringify(updated));
    setRevName('');
    setRevComment('');
    setShowAddReview(false);
  };

  // Simpan Pengaturan Stock & Live Stats
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('tc_site_stats', JSON.stringify(liveStats));
    setStatsSavedMsg(true);
    setTimeout(() => setStatsSavedMsg(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <main className="site-width section" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
        <div style={{ maxWidth: '380px', width: '100%', padding: '30px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
            <Lock className="text-primary" size={24} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>Login Admin</h2>
          <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginBottom: '20px' }}>Masukkan kata sandi pengelola.</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              placeholder="Password Admin (admin123)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)' }}
            />
            <Button type="submit" style={{ width: '100%', fontWeight: 700 }}>Masuk ke Panel</Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <span className="eyebrow" style={{ margin: 0 }}>PANEL PENGELOLA RESMI</span>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Dashboard TransferCepat</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
          <LogOut size={14} /> Keluar
        </Button>
      </div>

      {/* Tab Navigasi Admin: Transaksi, Ulasan, dan Pengaturan Stock */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <Button variant={activeTab === 'transaksi' ? 'default' : 'outline'} onClick={() => setActiveTab('transaksi')}>
          Kelola Transaksi ({transactions.length})
        </Button>
        <Button variant={activeTab === 'ulasan' ? 'default' : 'outline'} onClick={() => setActiveTab('ulasan')}>
          Kelola Ulasan ({reviews.length})
        </Button>
        <Button variant={activeTab === 'stats' ? 'default' : 'outline'} onClick={() => setActiveTab('stats')} style={{ borderColor: '#059669', color: activeTab === 'stats' ? '#fff' : '#059669' }}>
          💵 Atur Stock & Live Stats
        </Button>
      </div>

      {/* TAB 1: KELOLA TRANSAKSI */}
      {activeTab === 'transaksi' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {transactions.map((item) => (
            <div key={item.id} style={{ padding: '20px', backgroundColor: 'var(--card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: 'var(--primary)' }}>{item.id}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginLeft: '10px' }}>{item.createdAt}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', backgroundColor: item.status === 'Selesai' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(2, 132, 199, 0.15)', color: item.status === 'Selesai' ? '#059669' : '#0284c7' }}>
                  {item.status}
                </span>
              </div>
              <div style={{ fontSize: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                <div>Pelanggan: <strong>{item.customerName}</strong> ({item.whatsapp})</div>
                <div>Nominal: <strong>${item.amountUsd} USD</strong> ➔ <strong>{item.totalIdr}</strong></div>
                <div>Tujuan: <strong>{item.targetAccount}</strong></div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, alignSelf: 'center' }}>Ubah Status:</span>
                <Button size="sm" variant={item.status === 'Menunggu Saldo' ? 'default' : 'outline'} onClick={() => updateStatus(item.id, 'Menunggu Saldo')}><Clock size={12} /> Menunggu Saldo</Button>
                <Button size="sm" variant={item.status === 'Validasi Mutasi' ? 'default' : 'outline'} onClick={() => updateStatus(item.id, 'Validasi Mutasi')}><ShieldCheck size={12} /> Validasi Mutasi</Button>
                <Button size="sm" variant={item.status === 'Selesai' ? 'default' : 'outline'} style={{ backgroundColor: item.status === 'Selesai' ? '#059669' : undefined }} onClick={() => updateStatus(item.id, 'Selesai')}><CheckCircle2 size={12} /> Selesai</Button>
                <Button size="sm" variant={item.status === 'Dibatalkan' ? 'destructive' : 'outline'} onClick={() => updateStatus(item.id, 'Dibatalkan')}><XCircle size={12} /> Batal</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: KELOLA ULASAN */}
      {activeTab === 'ulasan' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <Button onClick={() => setShowAddReview(!showAddReview)} size="sm">
              <PlusCircle size={14} /> {showAddReview ? 'Tutup Form' : 'Tambah Ulasan Baru'}
            </Button>
          </div>

          {showAddReview && (
            <form onSubmit={addManualReview} style={{ padding: '20px', backgroundColor: 'var(--card)', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ margin: 0, fontWeight: 700 }}>Tambah Ulasan (Admin)</h4>
              <input required placeholder="Nama Pelanggan" value={revName} onChange={(e) => setRevName(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              <select value={revRating} onChange={(e) => setRevRating(Number(e.target.value))} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                <option value={5}>5 Bintang (Sangat Puas)</option>
                <option value={4}>4 Bintang (Puas)</option>
              </select>
              <input required placeholder="Layanan (Contoh: Convert PayPal ke BCA)" value={revService} onChange={(e) => setRevService(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              <textarea required rows={3} placeholder="Isi Testimoni..." value={revComment} onChange={(e) => setRevComment(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              <Button type="submit" size="sm" style={{ alignSelf: 'flex-start' }}>Simpan Ulasan</Button>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reviews.map((r) => (
              <div key={r.id} style={{ padding: '16px', backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '4px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill={s <= r.rating ? '#f59e0b' : 'none'} />
                    ))}
                  </div>
                  <strong>{r.name}</strong> <small style={{ color: 'var(--muted-foreground)' }}>({r.service})</small>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>"{r.comment}"</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteReview(r.id)}>
                  <Trash2 size={14} /> Hapus
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ATUR STOCK DOLLAR & LIVE STATISTIK BERANDA */}
      {activeTab === 'stats' && (
        <form onSubmit={handleSaveStats} style={{ maxWidth: '640px', padding: '26px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0' }}>Atur Angka Live Stock & Statistik Beranda</h3>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>Ubah angka di bawah ini, lalu klik Simpan. Angka di halaman utama web akan otomatis langsung terupdate!</p>
          </div>

          {statsSavedMsg && (
            <div style={{ padding: '10px 16px', backgroundColor: 'rgba(5, 150, 105, 0.15)', color: '#059669', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
              ✓ Data Live Stock berhasil disimpan dan sudah aktif di beranda!
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Stock Dollar Tersedia ($ USD):</label>
              <input
                required
                value={liveStats.stockAvailable}
                onChange={(e) => setLiveStats({ ...liveStats, stockAvailable: e.target.value })}
                placeholder="Contoh: 5.240"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Total Saldo Terjual ($ USD):</label>
              <input
                required
                value={liveStats.saldoSold}
                onChange={(e) => setLiveStats({ ...liveStats, saldoSold: e.target.value })}
                placeholder="Contoh: 168.450"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Jumlah Transaksi Sukses:</label>
              <input
                required
                value={liveStats.successTx}
                onChange={(e) => setLiveStats({ ...liveStats, successTx: e.target.value })}
                placeholder="Contoh: 14.800+"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Jumlah Member Aktif:</label>
              <input
                required
                value={liveStats.activeMembers}
                onChange={(e) => setLiveStats({ ...liveStats, activeMembers: e.target.value })}
                placeholder="Contoh: 6.200+"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Rata-rata Proses:</label>
              <input
                required
                value={liveStats.avgProcess}
                onChange={(e) => setLiveStats({ ...liveStats, avgProcess: e.target.value })}
                placeholder="Contoh: 5–15 Menit"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Status Saldo Legalitas:</label>
              <input
                required
                value={liveStats.cleanFunds}
                onChange={(e) => setLiveStats({ ...liveStats, cleanFunds: e.target.value })}
                placeholder="Contoh: 100% Legal & Clean"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', fontWeight: 700 }}
              />
            </div>
          </div>

          <Button type="submit" size="lg" style={{ alignSelf: 'flex-start', fontWeight: 700, backgroundColor: '#059669', color: '#fff', marginTop: '10px' }}>
            <Save size={16} /> Simpan Data Live Sekarang
          </Button>
        </form>
      )}
    </main>
  );
                }
