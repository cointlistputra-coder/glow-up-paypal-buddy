import { usePreferences } from '@/components/preferences';
import { useState } from 'react';
import { ArrowDownUp, ArrowRight, MessageCircle, ShieldCheck, Info, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exchangeRate, exchangeTotal, rupiah, whatsappUrl, type ExchangeMode } from '@/lib/paypal';

export function Calculator() {
  const { tr } = usePreferences();
  const [mode, setMode] = useState<ExchangeMode>('jual');
  const [amount, setAmount] = useState('100');
  const [target, setTarget] = useState('');
  const [method, setMethod] = useState('DANA');
  const [invoice, setInvoice] = useState(false);
  const [orderId, setOrderId] = useState('');

  const usd = Number(amount) || 0;
  const rate = exchangeRate(usd, mode);
  const total = exchangeTotal(usd, mode);

  // FUNGSI SIMPAN OTOMATIS & KUNCI ID PERMANEN
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1 ID Unik Permanen yang tidak bisa diubah
    const newId = `TC-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newId);

    const newTransaction = {
      id: newId,
      customerName: target || 'Pelanggan',
      whatsapp: target,
      service: mode === 'jual' ? 'Convert PayPal' : 'Beli Saldo PayPal',
      amountUsd: usd,
      totalIdr: rupiah(total),
      targetAccount: `${method} ${target}`,
      status: 'Menunggu Saldo',
      createdAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };

    // Simpan ke database transaksi
    try {
      const existing = JSON.parse(localStorage.getItem('tc_all_transactions') || '[]');
      localStorage.setItem('tc_all_transactions', JSON.stringify([newTransaction, ...existing]));
    } catch {}

    setInvoice(true);
  };

  const orderMessage = `Halo Admin TransferCepat, saya ingin konfirmasi pesanan.\nID Transaksi: ${orderId}\nLayanan: ${mode === 'jual' ? 'Convert PayPal' : 'Beli Saldo PayPal'}\nNominal: $${usd} USD\nRate: ${rupiah(rate)}\nTotal: ${rupiah(total)}\nTujuan: ${method} ${target}\nMohon diproses, terima kasih.`;

  return (
    <section className="calculator-band" id="kalkulator">
      <div className="site-width calculator-layout">
        <div className="calculator-intro">
          <span className="eyebrow">{tr("KALKULATOR PAYPAL")}</span>
          <h2>{tr("Hitung dulu.")}<br/><span className="text-primary">{tr("Transaksi kemudian.")}</span></h2>
          <p>{tr("Ketahui estimasi Rupiah yang Anda terima.")}<br/>{tr("Transparan sejak awal, tanpa tebak-tebakan.")}</p>
          <div className="calc-feature"><ShieldCheck size={19}/><span>{tr("Rate berjenjang sesuai nominal")}</span></div>
          <div className="calc-feature"><ArrowDownUp size={19}/><span>{tr("Bank lokal & e-wallet Indonesia")}</span></div>
          <div className="rate-notice"><Info size={15}/><span>{tr("Rate dapat berubah. Konfirmasi rate terbaru kepada admin sebelum mengirim saldo.")}</span></div>
        </div>

        <form className="calculator" onSubmit={handleSubmit}>
          <div className="calc-title">
            <h3>{tr("Kalkulator Konversi")}</h3>
            <span>USD <ArrowRight size={12}/> IDR</span>
          </div>

          <div className="mode-control">
            {(['jual','beli'] as const).map(m => (
              <Button key={m} type="button" variant={mode === m ? 'default' : 'ghost'} onClick={() => setMode(m)} aria-pressed={mode === m}>
                {m === 'jual' ? tr("Jual Saldo PayPal") : tr("Beli Saldo PayPal")}
              </Button>
            ))}
          </div>

          <div className="rates">
            <span>{tr("Di bawah $100")} <strong>{rupiah(exchangeRate(99,mode))}</strong></span>
            <span>{tr("$100 atau lebih")} <strong>{rupiah(exchangeRate(100,mode))}</strong></span>
          </div>

          <label htmlFor="usd">{tr("Nominal saldo")}</label>
          <div className="amount-input">
            <span>$</span>
            <input id="usd" type="number" min="0.01" step="0.01" required value={amount} onChange={e=>setAmount(e.target.value)} aria-label={tr("Nominal saldo USD")}/>
            <span>USD</span>
          </div>

          <div className="calc-row">
            <div>
              <label htmlFor="method">{mode === 'jual' ? tr("Terima melalui") : tr("Bayar melalui")}</label>
              <select id="method" value={method} onChange={e => setMethod(e.target.value)}>
                {['DANA','OVO','GoPay','ShopeePay','BCA','Mandiri','BNI','BRI','Bank lainnya'].map(m=><option key={m} value={m}>{tr(m)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="target">{mode === 'jual' ? tr("No. rekening / e-wallet") : tr("Email PayPal tujuan")}</label>
              <input id="target" required value={target} onChange={e=>setTarget(e.target.value)} placeholder={mode === 'jual' ? tr("Nomor tujuan Anda") : 'nama@email.com'}/>
            </div>
          </div>

          <div className="calc-result">
            <span>{mode==='jual' ? tr("Estimasi yang Anda terima") : tr("Estimasi yang Anda bayar")}<small>1 USD = {rupiah(rate)}</small></span>
            <output aria-live="polite">{rupiah(total)}</output>
          </div>

          <Button className="order-button" type="submit">
            <MessageCircle/>{tr("Lanjutkan ke WhatsApp")} <ArrowRight/>
          </Button>
          <p className="calc-footnote"><ShieldCheck size={12}/>{tr("Pesanan dikonfirmasi langsung oleh admin")}</p>
        </form>
      </div>

      {invoice && (
        <div className="modal-backdrop" onClick={()=>setInvoice(false)}>
          <div className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title" onClick={e=>e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="modal-close" aria-label={tr("Tutup ringkasan")} onClick={()=>setInvoice(false)}><X/></Button>
            <span className="summary-icon"><Check/></span>
            <span className="eyebrow">{tr("RINGKASAN PESANAN")}</span>
            <h2 id="order-title">{tr("Siap dikonfirmasi.")}</h2>
            <p>{tr("Pesanan Anda telah otomatis tersimpan di sistem. Simpan ID transaksi ini untuk melacak status pesanan Anda:")}</p>
            <dl>
              <div style={{ backgroundColor: 'var(--accent)', padding: '10px', borderRadius: '6px' }}>
                <dt style={{ fontWeight: 800, color: 'var(--primary)' }}>{tr("ID Transaksi Permanen")}</dt>
                <dd style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: 800 }}>{orderId}</dd>
              </div>
              <div><dt>{tr("Layanan")}</dt><dd>{mode === 'jual' ? tr("Convert PayPal") : tr("Beli Saldo PayPal")}</dd></div>
              <div><dt>{tr("Nominal")}</dt><dd>${usd} USD</dd></div>
              <div><dt>{tr("Tujuan")}</dt><dd>{method} {target}</dd></div>
              <div><dt>{tr("Estimasi total")}</dt><dd>{rupiah(total)}</dd></div>
            </dl>
            <Button asChild className="order-button">
              <a href={whatsappUrl(orderMessage)} target="_blank" rel="noopener noreferrer">
                <MessageCircle/>{tr("Kirim pesanan ke WhatsApp")} <ArrowRight/>
              </a>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
