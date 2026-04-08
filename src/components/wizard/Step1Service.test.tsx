import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step1Service from './Step1Service';
import type { ServiceBill } from '../../interfaces/AppInterfaces';

const makeServiceBill = (overrides: Partial<ServiceBill> = {}): ServiceBill => ({
  bill: '',
  billSince: '',
  billTo: '',
  billDate: '',
  total: '0',
  ...overrides,
});

describe('Step1Service', () => {
  it('renders a bill selection dropdown', () => {
    render(
      <Step1Service
        serviceBill={makeServiceBill()}
        setServiceBill={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders Acueducto and Energía options', () => {
    render(
      <Step1Service
        serviceBill={makeServiceBill()}
        setServiceBill={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByText(/acueducto/i)).toBeInTheDocument();
    expect(screen.getByText(/energía/i)).toBeInTheDocument();
  });

  it('calls setServiceBill when user selects a bill', async () => {
    const user = userEvent.setup();
    const setServiceBill = vi.fn();
    render(
      <Step1Service
        serviceBill={makeServiceBill()}
        setServiceBill={setServiceBill}
        errors={[]}
      />
    );
    await user.selectOptions(screen.getByRole('combobox'), 'acueducto');
    expect(setServiceBill).toHaveBeenCalled();
  });

  it('shows selected bill value in the dropdown', () => {
    render(
      <Step1Service
        serviceBill={makeServiceBill({ bill: 'energía' })}
        setServiceBill={vi.fn()}
        errors={[]}
      />
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('energía');
  });

  it('displays validation errors when provided', () => {
    render(
      <Step1Service
        serviceBill={makeServiceBill()}
        setServiceBill={vi.fn()}
        errors={['Por favor elige un servicio público']}
      />
    );
    expect(screen.getByText('Por favor elige un servicio público')).toBeInTheDocument();
  });

  it('does not show errors when errors array is empty', () => {
    render(
      <Step1Service
        serviceBill={makeServiceBill()}
        setServiceBill={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.queryByText(/por favor/i)).not.toBeInTheDocument();
  });
});
