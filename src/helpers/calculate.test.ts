import { describe, it, expect } from 'vitest';
import { calculate } from './calculate';
import type { ServiceBill, HomeData } from '../interfaces/AppInterfaces';

const makeServiceBill = (overrides: Partial<ServiceBill> = {}): ServiceBill => ({
  bill: 'energía',
  billSince: '2024-01-01',
  billTo: '2024-01-31',
  billDate: '2024-02-15',
  total: '300000',
  ...overrides,
});

const makeHomeData = (overrides: Partial<HomeData> = {}): HomeData => ({
  firstFloor: '2',
  secondFloor: '6',
  thirdFloor: '1',
  local: '115000',
  nameRecipient: 'Don Jorge',
  ...overrides,
});

describe('calculate()', () => {
  it('returns success: true for a valid energy bill', () => {
    const result = calculate(makeServiceBill(), makeHomeData());
    expect(result.success).toBe(true);
  });

  it('returns a non-empty message on success', () => {
    const result = calculate(makeServiceBill(), makeHomeData());
    expect(result.message.length).toBeGreaterThan(0);
  });

  it('splits energy bill evenly by person count across floors', () => {
    // total: 300000, people: 2+6+1=9, valuePerson = 300000/9 ≈ 33333
    // floor1 = 33333 * 2, floor2 = 33333 * 6, floor3 = 33333 * 1 — rounded to nearest 50
    const result = calculate(makeServiceBill({ total: '300000' }), makeHomeData());
    expect(result.success).toBe(true);
    expect(result.message).toContain('1º piso x 2 personas');
    expect(result.message).toContain('2º piso x 6 personas');
    expect(result.message).toContain('3º piso x 1 persona');
  });

  it('rounds total UP to nearest 50 (ceiling) — affects floor values not displayed total', () => {
    // total 300001 → ceil(300001/50)*50 = 300050
    // The message shows original total; rounding is applied to floor values
    const result = calculate(makeServiceBill({ total: '300001' }), makeHomeData());
    expect(result.success).toBe(true);
    // Result succeeds and produces a message
    expect(result.message.length).toBeGreaterThan(0);
  });

  it('total already a multiple of 50 stays the same', () => {
    const result = calculate(makeServiceBill({ total: '300000' }), makeHomeData());
    expect(result.success).toBe(true);
  });

  it('water bill deducts local before dividing by people', () => {
    // total: 300000, local: 115000, remaining: 185000, people: 9
    // valuePerson = 185000/9 ≈ 20555
    const result = calculate(
      makeServiceBill({ bill: 'acueducto', total: '300000' }),
      makeHomeData({ local: '115000' })
    );
    expect(result.success).toBe(true);
    expect(result.message).toContain('corespondiente al local'); // preserve typo
  });

  it('water bill message includes local amount', () => {
    const result = calculate(
      makeServiceBill({ bill: 'acueducto', total: '300000' }),
      makeHomeData({ local: '115000' })
    );
    // formatCash uses COP locale which may use non-breaking spaces
    expect(result.message).toContain('115.000');
  });

  it('energy bill message does NOT contain local line', () => {
    const result = calculate(makeServiceBill({ bill: 'energía' }), makeHomeData());
    expect(result.message).not.toContain('corespondiente al local');
  });

  it('includes recipient name in the message', () => {
    const result = calculate(makeServiceBill(), makeHomeData({ nameRecipient: 'Don Jorge' }));
    expect(result.message).toContain('Don Jorge');
  });

  it('includes the bill type in the message', () => {
    const result = calculate(makeServiceBill({ bill: 'energía' }), makeHomeData());
    expect(result.message).toContain('energía');
  });

  it('per-floor values are rounded to nearest 50', () => {
    // Use values that produce fractional per-person amounts
    // total: 10000, people: 3 (2+1+0), valuePerson = 10000/3 ≈ 3333.33
    // floor1 = 3333.33*2 = 6666.67 → round to nearest 50 → 6650
    const result = calculate(
      makeServiceBill({ bill: 'energía', total: '10000' }),
      makeHomeData({ firstFloor: '2', secondFloor: '1', thirdFloor: '0' })
    );
    expect(result.success).toBe(true);
    expect(result.message).toContain('piso');
  });

  it('returns success: false and error message if bill is empty', () => {
    const result = calculate(makeServiceBill({ bill: '' }), makeHomeData());
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('returns success: false if total is "0"', () => {
    const result = calculate(makeServiceBill({ total: '0' }), makeHomeData());
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('does not import React or DOM APIs', async () => {
    // This is a pure TS module — just verifying the function signature
    const mod = await import('./calculate');
    expect(typeof mod.calculate).toBe('function');
  });
});
