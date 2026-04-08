import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step2Bill from './Step2Bill';
import type { ServiceBill } from '../../interfaces/AppInterfaces';

const makeServiceBill = (overrides: Partial<ServiceBill> = {}): ServiceBill => ({
  bill: 'energía',
  billSince: '',
  billTo: '',
  billDate: '',
  total: '0',
  ...overrides,
});

describe('Step2Bill', () => {
  it('renders billSince date input', () => {
    render(
      <Step2Bill serviceBill={makeServiceBill()} setServiceBill={vi.fn()} errors={[]} />
    );
    expect(screen.getByLabelText(/período facturado desde/i)).toBeInTheDocument();
  });

  it('renders billTo date input', () => {
    render(
      <Step2Bill serviceBill={makeServiceBill()} setServiceBill={vi.fn()} errors={[]} />
    );
    expect(screen.getByLabelText(/período facturado hasta/i)).toBeInTheDocument();
  });

  it('renders billDate date input', () => {
    render(
      <Step2Bill serviceBill={makeServiceBill()} setServiceBill={vi.fn()} errors={[]} />
    );
    expect(screen.getByLabelText(/fecha de vencimiento/i)).toBeInTheDocument();
  });

  it('renders total amount input', () => {
    render(
      <Step2Bill serviceBill={makeServiceBill()} setServiceBill={vi.fn()} errors={[]} />
    );
    expect(screen.getByLabelText(/total a pagar/i)).toBeInTheDocument();
  });

  it('calls setServiceBill when total changes', async () => {
    const user = userEvent.setup();
    const setServiceBill = vi.fn();
    render(
      <Step2Bill
        serviceBill={makeServiceBill({ total: '0' })}
        setServiceBill={setServiceBill}
        errors={[]}
      />
    );
    const input = screen.getByLabelText(/total a pagar/i);
    await user.clear(input);
    await user.type(input, '300000');
    expect(setServiceBill).toHaveBeenCalled();
  });

  it('displays all error messages', () => {
    render(
      <Step2Bill
        serviceBill={makeServiceBill()}
        setServiceBill={vi.fn()}
        errors={['Error 1', 'Error 2']}
      />
    );
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });

  it('does not show errors when errors array is empty', () => {
    render(
      <Step2Bill serviceBill={makeServiceBill()} setServiceBill={vi.fn()} errors={[]} />
    );
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });
});
