import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Lock, ShieldCheck, CheckCircle2, Clock, XCircle, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/metadata';

export const Route = createFileRoute('/admin')({
  head: () => pageMetadata('Admin Dashboard', 'Panel kelola transaksi TransferCepat.'),
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

const ADMIN_PASSWORD = 'admin123'; // Ganti password admin Anda di sini

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    // Memuat database transaksi
    try {
      const saved = localStorage.getItem('tc_all_transactions');
      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        // Contoh data awal
        const sample: Transaction[] = [
          {
            id: 'TC-94821',
            customerName: 'Budi Santoso',
            whatsapp: '08123456789',
            service: 'Convert PayPal',
            amountUsd: 150,
            totalIdr: 'Rp 2.355.000',
            targetAccount: 'BCA 1234567890',
            status: 'Validasi Mutasi',
            createdAt: 'Hari ini, 05:20 WIB',
          },
        ];
        setTransactions(sample);
        localStorage.setItem('tc_all_transactions', JSON.stringify(sample));
      }
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

  if (!isAuthenticated) {
    return (
      <main className="site-width section" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
        <div style={{ maxWidth: '380px', width: '100%', padding: '30px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
            <Lock className="text-primary" size={24} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>Login Admin</h2>
          <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginBottom: '20px' }}>Masukkan kata sandi untuk mengelola transaksi.</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              placeholder="Password Admin (Default: admin123)"
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

  const filtered = transactions.filter((t) =>
    `${t.id} ${t.customerName} ${t.whatsapp}`.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <span className="eyebrow" style={{ margin: 0 }}>PANEL PENGELOLA</span>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Kelola Status Transaksi</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
          <LogOut size={14} /> Keluar Admin
        </Button>
      </div>

      <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
        <input
          type="search"
          placeholder="Cari ID transaksi, nama, no HP..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          style={{ width: '100%', padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <strong style={{ fontSize: '16px', color: 'var(--primary)' }}>{item.id}</strong>
                <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginLeft: '10px' }}>{item.createdAt}</span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor:
                    item.status === 'Selesai'
                      ? 'rgba(5, 150, 105, 0.15)'
                      : item.status === 'Dibatalkan'
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(2, 132, 199, 0.15)',
                  color:
                    item.status === 'Selesai'
                      ? '#059669'
                      : item.status === 'Dibatalkan'
                      ? '#ef4444'
                      : '#0284c7',
                }}
              >
                {item.status}
              </span>
            </div>

            <div style={{ fontSize: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>Pelanggan: <strong>{item.customerName}</strong> ({item.whatsapp})</div>
              <div>Nominal: <strong>${item.amountUsd} USD</strong> ➔ <strong>{item.totalIdr}</strong></div>
              <div>Tujuan: <strong>{item.targetAccount}</strong></div>
            </div>

            {/* Tombol Pengubah Status oleh Admin */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, alignSelf: 'center', marginRight: '6px' }}>Ubah Status:</span>
              <Button size="sm" variant={item.status === 'Menunggu Saldo' ? 'default' : 'outline'} onClick={() => updateStatus(item.id, 'Menunggu Saldo')}>
                <Clock size={12} /> Menunggu Saldo
              </Button>
              <Button size="sm" variant={item.status === 'Validasi Mutasi' ? 'default' : 'outline'} onClick={() => updateStatus(item.id, 'Validasi Mutasi')}>
                <ShieldCheck size={12} /> Validasi Mutasi
              </Button>
              <Button size="sm" variant={item.status === 'Selesai' ? 'default' : 'outline'} style={{ backgroundColor: item.status === 'Selesai' ? '#059669' : undefined }} onClick={() => updateStatus(item.id, 'Selesai')}>
                <CheckCircle2 size={12} /> Selesai / Ditransfer
              </Button>
              <Button size="sm" variant={item.status === 'Dibatalkan' ? 'destructive' : 'outline'} onClick={() => updateStatus(item.id, 'Dibatalkan')}>
                <XCircle size={12} /> Batal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
            }
