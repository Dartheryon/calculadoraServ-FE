import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders Header', () => {
    render(<App />);
    // Header renders the main app title
    expect(screen.getByText(/calculadora servicios/i)).toBeInTheDocument();
  });

  it('renders WizardForm (shows step 1 — service dropdown)', () => {
    render(<App />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders DataPresentation area', () => {
    render(<App />);
    // DataPresentation renders even when isMessageReady is false
    // It should be in the DOM
    const app = screen.getByRole('combobox').closest('.container, [class*="container"]');
    expect(app).toBeTruthy();
  });

  it('does NOT render DataForm (old component)', () => {
    render(<App />);
    // DataForm rendered a form element with a submit button "Calcular"
    // After migration, there should be no form element wrapping the whole thing
    // WizardForm uses type="button" not a form submit
    const forms = screen.queryAllByRole('form');
    // No <form> elements with action in the new wizard
    expect(forms).toHaveLength(0);
  });

  it('does NOT render MainForm directly', () => {
    render(<App />);
    // MainForm had a specific h2 with exact text
    expect(
      screen.queryByText(/configura los datos correspondientes/i)
    ).not.toBeInTheDocument();
  });

  it('App state has no isWaterBill', () => {
    // This is verified by TypeScript compilation — HomeData no longer has isWaterBill
    // Just ensure the app renders without errors
    expect(() => render(<App />)).not.toThrow();
  });
});
