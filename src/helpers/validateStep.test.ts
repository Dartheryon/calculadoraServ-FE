import { describe, it, expect } from 'vitest';
import { validateStep } from './validateStep';
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

describe('validateStep()', () => {
  describe('Step 0 — Service selection (bill)', () => {
    it('returns no errors when bill is selected', () => {
      const errors = validateStep(0, makeServiceBill({ bill: 'energía' }), makeHomeData());
      expect(errors).toHaveLength(0);
    });

    it('returns an error when bill is empty', () => {
      const errors = validateStep(0, makeServiceBill({ bill: '' }), makeHomeData());
      expect(errors.length).toBeGreaterThan(0);
    });

    it('does not validate other fields on step 0', () => {
      // Even with empty billSince, step 0 only cares about bill
      const errors = validateStep(0, makeServiceBill({ bill: 'energía', billSince: '' }), makeHomeData());
      expect(errors).toHaveLength(0);
    });
  });

  describe('Step 1 — Bill details (dates + total)', () => {
    it('returns no errors when all fields are filled', () => {
      const errors = validateStep(1, makeServiceBill(), makeHomeData());
      expect(errors).toHaveLength(0);
    });

    it('returns error when billSince is empty', () => {
      const errors = validateStep(1, makeServiceBill({ billSince: '' }), makeHomeData());
      expect(errors.length).toBeGreaterThan(0);
    });

    it('returns error when billTo is empty', () => {
      const errors = validateStep(1, makeServiceBill({ billTo: '' }), makeHomeData());
      expect(errors.length).toBeGreaterThan(0);
    });

    it('returns error when total is "0"', () => {
      const errors = validateStep(1, makeServiceBill({ total: '0' }), makeHomeData());
      expect(errors.length).toBeGreaterThan(0);
    });

    it('returns error when total is empty string', () => {
      const errors = validateStep(1, makeServiceBill({ total: '' }), makeHomeData());
      expect(errors.length).toBeGreaterThan(0);
    });

    it('returns error when billDate is empty', () => {
      const errors = validateStep(1, makeServiceBill({ billDate: '' }), makeHomeData());
      expect(errors.length).toBeGreaterThan(0);
    });

    it('can return multiple errors at once', () => {
      const errors = validateStep(
        1,
        makeServiceBill({ billSince: '', billTo: '', total: '0', billDate: '' }),
        makeHomeData()
      );
      expect(errors.length).toBeGreaterThan(1);
    });

    it('does not validate step 0 fields on step 1', () => {
      // bill is empty but step 1 doesn't care
      const errors = validateStep(1, makeServiceBill({ bill: '' }), makeHomeData());
      expect(errors).toHaveLength(0);
    });
  });

  describe('Step 2 — Occupants', () => {
    it('returns no errors for energy bill (local not required)', () => {
      const errors = validateStep(2, makeServiceBill({ bill: 'energía' }), makeHomeData());
      expect(errors).toHaveLength(0);
    });

    it('returns no errors for water bill when local has a value', () => {
      const errors = validateStep(
        2,
        makeServiceBill({ bill: 'acueducto' }),
        makeHomeData({ local: '115000' })
      );
      expect(errors).toHaveLength(0);
    });

    it('returns error for water bill when local is "0"', () => {
      const errors = validateStep(
        2,
        makeServiceBill({ bill: 'acueducto' }),
        makeHomeData({ local: '0' })
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it('returns error for water bill when local is empty', () => {
      const errors = validateStep(
        2,
        makeServiceBill({ bill: 'acueducto' }),
        makeHomeData({ local: '' })
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
