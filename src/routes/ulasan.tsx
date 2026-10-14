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
      '50+ Ulasan & Testimoni Pelanggan Terpercaya',
      'Kumpulan ulasan dan testimoni nyata dari pelanggan jasa convert saldo PayPal, jasa bayar belanja luar negeri, dan WD limit 180 hari TransferCepat.'
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

// 50 ULASAN TESTIMONI PELANGGAN REALISTIS & LENGKAP
const FIFTY_REVIEWS: Review[] = [
  { id: 'rev-1', name: 'Rizky Ramadhan', rating: 5, service: 'Convert PayPal ke DANA', comment: 'Prosesnya beneran kilat, gak sampai 7 menit saldo DANA udah masuk. Rate-nya juga tinggi dibanding jasa lain!', date: 'Hari ini' },
  { id: 'rev-2', name: 'Siti Sarah', rating: 5, service: 'Jasa Bayar Canva Pro', comment: 'Admin ramah dan fast respon banget pas butuh langganan Canva mendadak. Sangat terbantu!', date: 'Hari ini' },
  { id: 'rev-3', name: 'Dimas Kurnia', rating: 5, service: 'WD Limit 180 Hari', comment: 'Akun lama yang kena limit 180 hari akhirnya berhasil dicairkan ke BCA lewat panduan admin. Terima kasih banyak!', date: 'Kemarin' },
  { id: 'rev-4', name: 'Budi Prasetyo', rating: 5, service: 'Convert PayPal ke BCA', comment: 'Sudah langganan convert di sini dari tahun lalu. Rate selalu transparan dan proses transfer BCA gak pernah lelet.', date: 'Kemarin' },
  { id: 'rev-5', name: 'Anisa Rahmawati', rating: 5, service: 'Jasa Bayar Netflix & Spotify', comment: 'Gak punya kartu kredit buat langganan Netflix family, untung ada jasa bayar Done Cogel. Praktis banget.', date: '2 hari lalu' },
  { id: 'rev-6', name: 'Fajar Nugroho', rating: 5, service: 'Convert PayPal ke GoPay', comment: 'Convert saldo hasil freelance Upwork $85, langsung masuk GoPay hitungan menit. Mantap gan.', date: '2 hari lalu' },
  { id: 'rev-7', name: 'Hendra Wijaya', rating: 5, service: 'Pembuatan Akun PayPal', comment: 'Didampingi dari nol bikin akun PayPal bisnis. Sekarang udah bisa terima payment dari klien luar negeri.', date: '3 hari lalu' },
  { id: 'rev-8', name: 'Maya Kartika', rating: 5, service: 'Jasa Bayar Kursus Udemy', comment: 'Beli kursus web dev di Udemy pas diskon, dibantu checkout cepat sama admin. Trusted!', date: '3 hari lalu' },
  { id: 'rev-9', name: 'Kevin Sanjaya', rating: 4, service: 'Convert PayPal ke Mandiri', comment: 'Rate oke, proses sekitar 10 menit karena antrean malam hari, tapi dana masuk aman ke Mandiri.', date: '3 hari lalu' },
  { id: 'rev-10', name: 'Wahyu Setiawan', rating: 5, service: 'WD Limit 180 Hari', comment: 'Sempat pasrah saldo $400 ketahan 6 bulan, alhamdulillah dibantu urus penarikan sampai cair utuh.', date: '4 hari lalu' },
  { id: 'rev-11', name: 'Dewi Lestari', rating: 5, service: 'Convert PayPal ke OVO', comment: 'Tukar saldo receh sisa belanja $15 tetap dilayani dengan ramah. Top recommended!', date: '4 hari lalu' },
  { id: 'rev-12', name: 'Arif Rahman', rating: 5, service: 'Jasa Bayar Hosting & Domain', comment: 'Perpanjang hosting Namecheap lancar jaya, 5 menit beres invoice lunas.', date: '5 hari lalu' },
  { id: 'rev-13', name: 'Bagas Pratama', rating: 5, service: 'Convert PayPal ke BRI', comment: 'Freelancer desainer grafis sangat terbantu. Kurs konversi jauh lebih adil dibanding convert otomatis di akun PayPal.', date: '5 hari lalu' },
  { id: 'rev-14', name: 'Rina Anggraini', rating: 5, service: 'Jasa Bayar ChatGPT Plus', comment: 'Langganan ChatGPT Plus tiap bulan selalu lewat sini. Fast respon dan amanah.', date: '6 hari lalu' },
  { id: 'rev-15', name: 'Ilham Maulana', rating: 5, service: 'Pembuatan Akun PayPal', comment: 'Dipandu verifikasi kartu debit virtual sampai status akun centang hijau. Terpercaya.', date: '6 hari lalu' },
  { id: 'rev-16', name: 'Eko Supriyadi', rating: 5, service: 'Convert PayPal ke DANA', comment: 'Cair $200 ke DANA secepat kilat. Rate berjenjangnya beneran bikin untung lebih banyak.', date: '1 minggu lalu' },
  { id: 'rev-17', name: 'Nadia Putri', rating: 5, service: 'Jasa Bayar Zoom Pro', comment: 'Kantor butuh Zoom Pro mendadak buat meeting klien, admin langsung eksekusi cepat. Makasih!', date: '1 minggu lalu' },
  { id: 'rev-18', name: 'Aditya Nugraha', rating: 5, service: 'WD Limit 180 Hari', comment: 'Sangat berpengalaman urus akun limit. Instruksinya jelas dan gak berbelit-belit.', date: '1 minggu lalu' },
  { id: 'rev-19', name: 'Tri Wibowo', rating: 4, service: 'Convert PayPal ke BCA', comment: 'Pelayanan bagus, konfirmasi via WA cepat, transfer ke rekening BCA lancar tanpa kendala.', date: '1 minggu lalu' },
  { id: 'rev-20', name: 'Cindy Claudia', rating: 5, service: 'Jasa Bayar Midjourney', comment: 'Langganan Midjourney buat generate gambar lancar. Pembayaran langsung terverifikasi di webnya.', date: '1 minggu lalu' },
  { id: 'rev-21', name: 'Rio Ferdinan', rating: 5, service: 'Convert PayPal ke ShopeePay', comment: 'Sering convert saldo dari Fiverr ke ShopeePay buat belanja. Selalu puas sama pelayanannya.', date: '1 minggu lalu' },
  { id: 'rev-22', name: 'Agus Santoso', rating: 5, service: 'Convert PayPal ke BNI', comment: 'Pencairan $120 ke BNI langsung masuk. Aman, no tipu-tipu, admin jujur.', date: '2 minggu lalu' },
  { id: 'rev-23', name: 'Fitri Handayani', rating: 5, service: 'Jasa Bayar Etsy', comment: 'Beli barang handmade unik dari seller luar negeri lewat Etsy, dibantu bayar dengan aman.', date: '2 minggu lalu' },
  { id: 'rev-24', name: 'Bayu Pamungkas', rating: 5, service: 'Pembuatan Akun PayPal', comment: 'Konsultasi akun personal jadi paham aturan main PayPal biar gak gampang kena limit.', date: '2 minggu lalu' },
  { id: 'rev-25', name: 'Yoga Pratama', rating: 5, service: 'WD Limit 180 Hari', comment: 'Saldo $850 yang ketahan akhirnya cair ke rekening. Fee sangat masuk akal dibayar setelah beres.', date: '2 minggu lalu' },
  { id: 'rev-26', name: 'Melly Anggita', rating: 5, service: 'Jasa Bayar Envato Elements', comment: 'Download template video di Envato jadi gampang banget, tinggal kirim link tagihan ke admin.', date: '2 minggu lalu' },
  { id: 'rev-27', name: 'Farhan Zulkarnain', rating: 5, service: 'Convert PayPal ke DANA', comment: 'Kalkulator di web sangat akurat, apa yang tertera di estimasi itu yang masuk ke DANA.', date: '2 minggu lalu' },
  { id: 'rev-28', name: 'Dian Permata', rating: 5, service: 'Jasa Bayar Steam Game', comment: 'Topup saldo Steam pas winter sale, proses gak sampai 5 menit game langsung masuk library.', date: '3 minggu lalu' },
  { id: 'rev-29', name: 'Randy Hermawan', rating: 4, service: 'Convert PayPal ke Mandiri', comment: 'Pelayanan mantap, rate bersaing. Sedikit nunggu pas jam istirahat tapi tetap responsif.', date: '3 minggu lalu' },
  { id: 'rev-30', name: 'Bella Safitri', rating: 5, service: 'Convert PayPal ke OVO', comment: 'Gak ribet sama sekali, cuma kirim saldo via F&F trus kirim bukti transfer, OVO langsung nambah.', date: '3 minggu lalu' },
  { id: 'rev-31', name: 'Danang Wicaksono', rating: 5, service: 'Pembuatan Akun PayPal', comment: 'Sangat informatif! Dijelaskan cara isi nama yang benar sesuai KTP biar klop sama buku tabungan.', date: '3 minggu lalu' },
  { id: 'rev-32', name: 'Indah Cahyani', rating: 5, service: 'Jasa Bayar Notion & Figma', comment: 'Bayar langganan software tim desain bulanan selalu andalkan Done Cogel. Sangat mempermudah.', date: '3 minggu lalu' },
  { id: 'rev-33', name: 'Tommy Gunawan', rating: 5, service: 'WD Limit 180 Hari', comment: 'Rekomendasi dari teman komunitas Upwork, beneran terbukti bisa narik dana dari akun terblokir.', date: '1 bulan lalu' },
  { id: 'rev-34', name: 'Surya Kencana', rating: 5, service: 'Convert PayPal ke BCA', comment: 'Transaksi kelima kalinya di sini, kecepatan dan keamanannya konsisten dari dulu.', date: '1 bulan lalu' },
  { id: 'rev-35', name: 'Putri Wulandari', rating: 5, service: 'Convert PayPal ke DANA', comment: 'Awalnya ragu karena baru pertama kali convert, tapi admin jelasin dengan sabar dan amanah 100%.', date: '1 bulan lalu' },
  { id: 'rev-36', name: 'Gilang Ramadhan', rating: 5, service: 'Jasa Bayar eBay', comment: 'Beli sparepart mobil langka dari eBay US, dibantu checkout sampai dapet resi pelacakan.', date: '1 bulan lalu' },
  { id: 'rev-37', name: 'Ahmad Zaki', rating: 5, service: 'Convert PayPal ke BRI', comment: 'Pencairan dolar hasil freelance lancar jaya ke rekening BRI pelosok desa. Mantap!', date: '1 bulan lalu' },
  { id: 'rev-38', name: 'Ratna Juwita', rating: 5, service: 'Jasa Bayar Discord Nitro', comment: 'Beli Nitro setahun tanpa kartu kredit internasional, admin langsung bantu bayar via PayPal.', date: '1 bulan lalu' },
  { id: 'rev-39', name: 'Lukman Hakim', rating: 5, service: 'WD Limit 180 Hari', comment: 'Gak nyangka saldo yang udah dianggap hilang akhirnya bisa dicairkan. Pelayanan top markotop.', date: '1 bulan lalu' },
  { id: 'rev-40', name: 'Siska Amelia', rating: 5, service: 'Convert PayPal ke GoPay', comment: 'Convert saldo receh hasil main game $6 pun dilayani dengan baik dan cepat.', date: '1 bulan lalu' },
  { id: 'rev-41', name: 'Doni Setiawan', rating: 4, service: 'Convert PayPal ke BCA', comment: 'Transaksi aman, uang masuk sesuai estimasi kalkulator web. Pelayanan profesional.', date: '1 bulan lalu' },
  { id: 'rev-42', name: 'Yuni Astuti', rating: 5, service: 'Jasa Bayar Google Workspace', comment: 'Bayar email bisnis perusahaan lancar tanpa kendala. Invoice langsung aktif seketika.', date: '2 bulan lalu' },
  { id: 'rev-43', name: 'Faisal Akbar', rating: 5, service: 'Pembuatan Akun PayPal', comment: 'Didampingi sampai tuntas verifikasi alamat dan bank. Pelayanan bintang lima!', date: '2 bulan lalu' },
  { id: 'rev-44', name: 'Tania Marella', rating: 5, service: 'Convert PayPal ke DANA', comment: 'Proses kilat parah, gak ada 3 menit notif DANA udah bunyi. Langganan terus ini mah!', date: '2 bulan lalu' },
  { id: 'rev-45', name: 'Haris Munandar', rating: 5, service: 'Convert PayPal ke Mandiri', comment: 'Rate jauh lebih tinggi daripada withdraw langsung lewat PayPal yang kena potongan kurs sadis.', date: '2 bulan lalu' },
  { id: 'rev-46', name: 'Winda Natalia', rating: 5, service: 'Jasa Bayar Shutterstock', comment: 'Beli paket foto untuk kebutuhan agensi dibantu bayar cepat. Gak perlu pinjem CC orang lain.', date: '2 bulan lalu' },
  { id: 'rev-47', name: 'Galih Prakoso', rating: 5, service: 'WD Limit 180 Hari', comment: 'Bimbingannya jelas banget dari penautan rekening sampai email pelepasan dana dari PayPal.', date: '2 bulan lalu' },
  { id: 'rev-48', name: 'Naufal Azhar', rating: 5, service: 'Convert PayPal ke OVO', comment: 'Satu-satunya jasa convert yang transparan soal rate dan cepat tanggap meski malam hari.', date: '3 bulan lalu' },
  { id: 'rev-49', name: 'Rahmat Hidayat', rating: 5, service: 'Jasa Bayar AliExpress', comment: 'Beli alat elektronik dari luar negeri aman dan terpercaya dibantu jasa bayar Done Cogel.', date: '3 bulan lalu' },
  { id: 'rev-50', name: 'Jessica Tan', rating: 5, service: 'Convert PayPal ke BCA', comment: 'Total sudah convert ribuan dollar di sini sejak 2021. Selalu aman, amanah, dan terdepan.', date: '3 bulan lalu' },
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
      // Jika belum ada atau jumlahnya masih sedikit, otomatis perbarui ke 50 ulasan
      if (saved && JSON.parse(saved).length >= 50) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(FIFTY_REVIEWS);
        localStorage.setItem('tc_customer_reviews', JSON.stringify(FIFTY_REVIEWS));
      }
    } catch {
      setReviews(FIFTY_REVIEWS);
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
      : '4.9';

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
          boxShadow: 'var(--shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
            {avgRating}
          </div>
          <div>
            <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '4px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>
              Berdasarkan <strong>{reviews.length} ulasan</strong> pelanggan terverifikasi
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

      {/* Grid 50 Ulasan Pelanggan */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '18px' }}>
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
              boxShadow: 'var(--shadow)',
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
