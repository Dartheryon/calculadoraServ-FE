import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step3Occupants from './Step3Occupants';
import type { ServiceBill, HomeData } from '../../interfaces/AppInterfaces';

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

describe('Step3Occupants', () => {
  it('renders firstFloor input', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill()}
        homeData={makeHomeData()}
        setHomeData={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByLabelText(/personas en el piso 1/i)).toBeInTheDocument();
  });

  it('renders secondFloor input', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill()}
        homeData={makeHomeData()}
        setHomeData={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByLabelText(/personas en el piso 2/i)).toBeInTheDocument();
  });

  it('renders thirdFloor input', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill()}
        homeData={makeHomeData()}
        setHomeData={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByLabelText(/personas en el piso 3/i)).toBeInTheDocument();
  });

  it('renders nameRecipient input', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill()}
        homeData={makeHomeData()}
        setHomeData={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByLabelText(/encargado/i)).toBeInTheDocument();
  });

  it('does NOT render local input for energy bill', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill({ bill: 'energía' })}
        homeData={makeHomeData()}
        setHomeData={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.queryByLabelText(/local/i)).not.toBeInTheDocument();
  });

  it('renders local input for water bill (acueducto)', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill({ bill: 'acueducto' })}
        homeData={makeHomeData()}
        setHomeData={vi.fn()}
        errors={[]}
      />
    );
    expect(screen.getByLabelText(/local/i)).toBeInTheDocument();
  });

  it('calls setHomeData when firstFloor changes', async () => {
    const user = userEvent.setup();
    const setHomeData = vi.fn();
    render(
      <Step3Occupants
        serviceBill={makeServiceBill()}
        homeData={makeHomeData({ firstFloor: '2' })}
        setHomeData={setHomeData}
        errors={[]}
      />
    );
    const input = screen.getByLabelText(/personas en el piso 1/i);
    await user.clear(input);
    await user.type(input, '3');
    expect(setHomeData).toHaveBeenCalled();
  });

  it('displays validation errors when provided', () => {
    render(
      <Step3Occupants
        serviceBill={makeServiceBill({ bill: 'acueducto' })}
        homeData={makeHomeData({ local: '0' })}
        setHomeData={vi.fn()}
        errors={['Por favor digita el valor del agua del local']}
      />
    );
    expect(
      screen.getByText('Por favor digita el valor del agua del local')
    ).toBeInTheDocument();
  });
});
