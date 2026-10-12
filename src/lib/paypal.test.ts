import { describe, it, expect } from 'vitest';
import { exchangeRate, exchangeTotal, TELEGRAM_URL, whatsappUrl } from './paypal';

describe('Original exchange rules', () => {
  it('retains the original sale rate below $100', () => expect(exchangeRate(99, 'jual')).toBe(14000));
  it('uses the higher sale rate starting at exactly $100', () => expect(exchangeRate(100, 'jual')).toBe(15700));
  it('retains the buy rate on either side of the threshold', () => { expect(exchangeRate(99, 'beli')).toBe(17800); expect(exchangeRate(100, 'beli')).toBe(17800); });
  it('multiplies USD by the rate', () => expect(exchangeTotal(100, 'jual')).toBe(1570000));
  it('does not produce a negative order value', () => expect(exchangeTotal(-1, 'jual')).toBe(0));
  it('uses the requested Telegram testimonial destination', () => expect(TELEGRAM_URL).toBe('https://t.me/paypaldonecogel'));
  it('preserves the original WhatsApp contact', () => expect(whatsappUrl('Halo')).toBe('https://wa.me/6288274325328?text=Halo'));
});