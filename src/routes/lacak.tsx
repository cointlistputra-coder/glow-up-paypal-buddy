import { usePreferences } from '@/components/preferences';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  AlertCircle,
  RefreshCw,
  Wallet,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import { whatsappUrl } from '@/lib/paypal';
import { fetchTransactionById, type DbTransaction } from '@/lib/supabase';

export const Route = createFileRoute('/lacak')({
  head: () =>
    pageMetadata(
      'Lacak Transaksi PayPal Online',
      'Cek status transaksi convert saldo dan pencairan PayPal Anda secara real-time dari database online.'
    ),
  component: LacakPage,
});

function LacakPage() {
  const { tr } = usePreferences();
  const [orderId, setOrderId] = useState('');
  const [searchedData, setSearchedData] = useState<DbTransaction | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // MENCARI DATA LANGSUNG KE CLOUD SUPABASE
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = orderId.trim().toUpperCase();
    if (!query) return;

    setIsLoading(true);
    setNotFound(false);
    setSearchedData(null);

    const result = await fetchTransactionById(query);
    if (result) {
      setSearchedData(result);
    } else {
      setNotFound(true);
    }
    setIsLoading(false);
  };

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <PageHeading
        eyebrow={tr('STATUS TRANSAKSI REAL-TIME')}
        title={tr('Lacak Pesanan Anda')}
        description={tr('Masukkan ID transaksi untuk memeriksa proses validasi dan transfer saldo PayPal Anda secara langsung dari server.')}
      />

      <div style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            gap: '10px',
            backgroundColor: 'var(--card)',
            padding: '8px',
            borderRadius: '12px',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--muted-foreground)' }} />
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Masukkan ID Anda (Contoh: TC-12345)"
              style={{ width: '100%', border: 'none', paddingLeft: '38px', fontSize: '14px', fontWeight: 600, outline: 'none', backgroundColor: 'transparent' }}
            />
          </div>
          <Button type="submit" size="lg" disabled={isLoading} style={{ borderRadius: '8px', fontWeight: 700 }}>
            <Search size={15} /> {isLoading ? 'Mencari...' : tr('Lacak')}
          </Button>
        </form>
      </div>

      {notFound && (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '30px', backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <AlertCircle size={32} style={{ color: '#ef4444', margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>ID Transaksi Tidak Ditemukan di Server</h3>
          <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
            Pastikan kode ID yang Anda masukkan tepat atau hubungi admin via WhatsApp jika pesanan baru saja diajukan.
          </p>
        </div>
      )}

      {searchedData && (
        <div style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', fontWeight: 600 }}>ID TRANSAKSI RESMI</span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', margin: '4px 0 0 0' }}>{searchedData.id}</h3>
            </div>
            <div
              style={{
                backgroundColor:
                  searchedData.status === 'Selesai'
                    ? 'rgba(5, 150, 105, 0.15)'
                    : searchedData.status === 'Dibatalkan'
                    ? 'rgba(239, 68, 68, 0.15)'
                    : 'rgba(2, 132, 199, 0.15)',
                color:
                  searchedData.status === 'Selesai'
                    ? '#059669'
                    : searchedData.status === 'Dibatalkan'
                    ? '#ef4444'
                    : '#0284c7',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {searchedData.status === 'Selesai' ? <CheckCircle2 size={14} /> : searchedData.status === 'Dibatalkan' ? <XCircle size={14} /> : <RefreshCw size={14} />}
              {searchedData.status.toUpperCase()}
            </div>
          </div>

          <div style={{ margin: '20px 0', padding: '16px', backgroundColor: 'var(--accent)', borderRadius: '8px', fontSize: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            <div>Layanan: <strong>{searchedData.service}</strong></div>
            <div>Nominal: <strong>${searchedData.amount_usd} USD</strong> (<strong>{searchedData.total_idr}</strong>)</div>
            <div>Tujuan Pencairan: <strong>{searchedData.target_account}</strong></div>
          </div>

          <div style={{ margin: '30px 0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>Alur Transaksi Anda:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#059669', color: '#fff', display: 'grid', placeItems: 'center' }}><CheckCircle2 size={16} /></div>
                  <div style={{ width: '2px', height: '35px', backgroundColor: '#059669', marginTop: '4px' }} />
                </div>
                <div><strong style={{ fontSize: '13px' }}>Pesanan Terdaftar di Server Cloud</strong><p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>ID resmi terkunci dan tersimpan di database online.</p></div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: searchedData.status !== 'Menunggu Saldo' ? '#059669' : 'var(--primary)', color: '#fff', display: 'grid', placeItems: 'center' }}><Clock size={16} /></div>
                  <div style={{ width: '2px', height: '35px', backgroundColor: searchedData.status === 'Validasi Mutasi' || searchedData.status === 'Selesai' ? '#059669' : 'var(--border)', marginTop: '4px' }} />
                </div>
                <div><strong style={{ fontSize: '13px' }}>Pengecekan Saldo Masuk</strong><p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>Admin memverifikasi dana PayPal yang dikirimkan.</p></div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: searchedData.status === 'Selesai' ? '#059669' : searchedData.status === 'Validasi Mutasi' ? 'var(--primary)' : 'var(--muted)', color: searchedData.status === 'Selesai' || searchedData.status === 'Validasi Mutasi' ? '#fff' : 'var(--muted-foreground)', display: 'grid', placeItems: 'center' }}><ShieldCheck size={16} /></div>
                  <div style={{ width: '2px', height: '35px', backgroundColor: searchedData.status === 'Selesai' ? '#059669' : 'var(--border)', marginTop: '4px' }} />
                </div>
                <div><strong style={{ fontSize: '13px' }}>Validasi Sumber Dana</strong><p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>Pemeriksaan keamanan anti-hold & anti-fraud.</p></div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: searchedData.status === 'Selesai' ? '#059669' : 'var(--muted)', color: searchedData.status === 'Selesai' ? '#fff' : 'var(--muted-foreground)', display: 'grid', placeItems: 'center' }}><Wallet size={16} /></div>
                </div>
                <div><strong style={{ fontSize: '13px' }}>Pencairan Rupiah Selesai</strong><p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>Dana rupiah berhasil ditransfer ke rekening / e-wallet tujuan.</p></div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--accent)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
            <Button asChild size="sm" style={{ fontWeight: 700 }}>
              <a href={whatsappUrl(`Halo Admin TransferCepat, saya ingin menanyakan status transaksi ID: ${searchedData.id}`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={14} /> Hubungi Admin via WhatsApp <ArrowRight size={14} />
              </a>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
