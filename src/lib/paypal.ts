export const TELEGRAM_URL = 'https://t.me/paypaldonecogel';
export const WHATSAPP_NUMBER = '6288274325328';
export type ExchangeMode = 'jual' | 'beli';
export function exchangeRate(amount: number, mode: ExchangeMode) {
  return mode === 'beli' ? 17800 : amount < 100 ? 14000 : 15700;
}
export function exchangeTotal(amount: number, mode: ExchangeMode) {
  return Math.max(0, amount) * exchangeRate(amount, mode);
}
export const rupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}