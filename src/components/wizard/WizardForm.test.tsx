import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WizardForm from './WizardForm';
import type { ServiceBill, HomeData } from '../../interfaces/AppInterfaces';

const makeServiceBill = (overrides: Partial<ServiceBill> = {}): ServiceBill => ({
  bill: '',
  billSince: '',
  billTo: '',
  billDate: '',
  total: '0',
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

const defaultProps = () => ({
  serviceBill: makeServiceBill(),
  setServiceBill: vi.fn(),
  homeData: makeHomeData(),
  setHomeData: vi.fn(),
  onCalculate: vi.fn(),
});

describe('WizardForm', () => {
  it('renders step 1 (service selection) initially', () => {
    render(<WizardForm {...defaultProps()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows StepIndicator', () => {
    render(<WizardForm {...defaultProps()} />);
    const steps = screen.getAllByRole('listitem');
    expect(steps.length).toBeGreaterThan(0);
  });

  it('shows "Siguiente" button on step 1', () => {
    render(<WizardForm {...defaultProps()} />);
    expect(screen.getByText(/siguiente/i)).toBeInTheDocument();
  });

  it('does NOT show "Atrás" button on first step', () => {
    render(<WizardForm {...defaultProps()} />);
    expect(screen.queryByText(/atrás/i)).not.toBeInTheDocument();
  });

  it('blocks advancing to step 2 when bill is empty (shows error)', async () => {
    const user = userEvent.setup();
    render(<WizardForm {...defaultProps()} />);
    await user.click(screen.getByText(/siguiente/i));
    // Should still be on step 1 — combobox still visible
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('advances to step 2 when bill is selected', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    props.serviceBill = makeServiceBill({ bill: 'energía' });
    render(<WizardForm {...props} />);
    await user.click(screen.getByText(/siguiente/i));
    // Step 2 should be visible — look for bill date fields
    expect(screen.getByLabelText(/período facturado desde/i)).toBeInTheDocument();
  });

  it('shows "Atrás" button after advancing past step 1', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    props.serviceBill = makeServiceBill({ bill: 'energía' });
    render(<WizardForm {...props} />);
    await user.click(screen.getByText(/siguiente/i));
    expect(screen.getByText(/atrás/i)).toBeInTheDocument();
  });

  it('goes back to step 1 when "Atrás" is clicked', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    props.serviceBill = makeServiceBill({ bill: 'energía' });
    render(<WizardForm {...props} />);
    await user.click(screen.getByText(/siguiente/i));
    await user.click(screen.getByText(/atrás/i));
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows "Calcular" on last step instead of "Siguiente"', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    // Step 1 valid
    props.serviceBill = makeServiceBill({
      bill: 'energía',
      billSince: '2024-01-01',
      billTo: '2024-01-31',
      billDate: '2024-02-15',
      total: '300000',
    });
    render(<WizardForm {...props} />);

    // Advance to step 2
    await user.click(screen.getByText(/siguiente/i));

    // Advance to step 3 (last)
    await user.click(screen.getByText(/siguiente/i));

    expect(screen.getByText(/calcular/i)).toBeInTheDocument();
    expect(screen.queryByText(/^siguiente$/i)).not.toBeInTheDocument();
  });

  it('calls onCalculate when "Calcular" is clicked on last step', async () => {
    const user = userEvent.setup();
    const onCalculate = vi.fn();
    const props = defaultProps();
    props.onCalculate = onCalculate;
    props.serviceBill = makeServiceBill({
      bill: 'energía',
      billSince: '2024-01-01',
      billTo: '2024-01-31',
      billDate: '2024-02-15',
      total: '300000',
    });
    render(<WizardForm {...props} />);

    await user.click(screen.getByText(/siguiente/i));
    await user.click(screen.getByText(/siguiente/i));
    await user.click(screen.getByText(/calcular/i));

    expect(onCalculate).toHaveBeenCalled();
  });
});
