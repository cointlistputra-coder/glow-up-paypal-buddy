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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/site';
import { pageMetadata } from '@/lib/metadata';
import { whatsappUrl } from '@/lib/paypal';

export const Route = createFileRoute('/lacak')({
  head: () =>
    pageMetadata(
      'Lacak Transaksi PayPal',
      'Cek status transaksi convert saldo, jasa bayar, dan pencairan dana PayPal Anda secara real-time.'
    ),
  component: LacakPage,
});

function LacakPage() {
  const { tr } = usePreferences();
  const [orderId, setOrderId] = useState('');
  const [searchedId, setSearchedId] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setSearchedId(orderId.trim().toUpperCase());
  };

  return (
    <main className="site-width section" style={{ minHeight: '80vh' }}>
      <PageHeading
        eyebrow={tr('STATUS TRANSAKSI')}
        title={tr('Lacak Pesanan Anda')}
        description={tr('Masukkan ID transaksi yang Anda dapatkan saat mengajukan pesanan via kalkulator atau admin.')}
      />

      {/* Form Input Pencarian */}
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
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--muted-foreground)',
              }}
            />
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Contoh: DC-ML9X8A..."
              style={{
                width: '100%',
                border: 'none',
                paddingLeft: '38px',
                fontSize: '14px',
                fontWeight: 600,
                outline: 'none',
                backgroundColor: 'transparent',
              }}
            />
          </div>
          <Button type="submit" size="lg" style={{ borderRadius: '8px', fontWeight: 700 }}>
            <Search size={15} /> {tr('Lacak')}
          </Button>
        </form>
      </div>

      {/* Hasil Pelacakan Interaktif */}
      {searchedId && (
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* Header Status */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', fontWeight: 600 }}>
                {tr('ID TRANSAKSI')}
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', margin: '4px 0 0 0' }}>
                {searchedId}
              </h3>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(5, 150, 105, 0.12)',
                color: '#059669',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RefreshCw size={13} /> {tr('DALAM PROSES / VALIDASI')}
            </div>
          </div>

          {/* Timeline Visual 4 Tahap */}
          <div style={{ margin: '30px 0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>
              {tr('Alur Transaksi Anda:')}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Tahap 1: Pesanan Dibuat */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#059669',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div style={{ width: '2px', height: '35px', backgroundColor: '#059669', marginTop: '4px' }} />
                </div>
                <div>
                  <strong style={{ fontSize: '13px' }}>{tr('Pesanan Diterima Sistem')}</strong>
                  <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>
                    {tr('ID transaksi tercatat, menunggu validasi nominal.')}
                  </p>
                </div>
              </div>

              {/* Tahap 2: Pengiriman Saldo PayPal */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Clock size={16} />
                  </div>
                  <div style={{ width: '2px', height: '35px', backgroundColor: 'var(--border)', marginTop: '4px' }} />
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--primary)' }}>
                    {tr('Pengecekan Saldo PayPal')}
                  </strong>
                  <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>
                    {tr('Admin sedang memeriksa dana masuk pada akun resmi Done Cogel.')}
                  </p>
                </div>
              </div>

              {/* Tahap 3: Validasi Akun */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--muted)',
                      color: 'var(--muted-foreground)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <ShieldCheck size={16} />
                  </div>
                  <div style={{ width: '2px', height: '35px', backgroundColor: 'var(--border)', marginTop: '4px' }} />
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                    {tr('Verifikasi Sumber Dana (Clean Funds)')}
                  </strong>
                  <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>
                    {tr('Pemeriksaan keamanan anti-hold dan anti-dispute.')}
                  </p>
                </div>
              </div>

              {/* Tahap 4: Transfer ke Rekening/E-Wallet */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--muted)',
                      color: 'var(--muted-foreground)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Wallet size={16} />
                  </div>
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                    {tr('Pencairan Rupiah ke Rekening / E-Wallet')}
                  </strong>
                  <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>
                    {tr('Dana otomatis dikirim (BCA, Mandiri, DANA, OVO, GoPay).')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Bantuan Cepat WhatsApp */}
          <div
            style={{
              backgroundColor: 'var(--accent)',
              borderRadius: '12px',
              padding: '20px',
              marginTop: '25px',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertCircle size={18} className="text-primary" />
              <strong style={{ fontSize: '12px' }}>{tr('Butuh konfirmasi instan dari Admin?')}</strong>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '0 0 14px 0' }}>
              {tr('Hubungi admin prioritas untuk mempercepat proses verifikasi dan pencairan pesanan Anda.')}
            </p>
            <Button asChild size="sm" style={{ fontWeight: 700 }}>
              <a
                href={whatsappUrl(`Halo Admin TransferCepat, saya ingin cek status transaksi ID: ${searchedId}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={14} /> {tr('Tanya Admin via WhatsApp')} <ArrowRight size={14} />
              </a>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
      }
