import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StepIndicator from './StepIndicator';

describe('StepIndicator', () => {
  it('renders 3 step circles', () => {
    render(<StepIndicator currentStep={0} totalSteps={3} />);
    const steps = screen.getAllByRole('listitem');
    expect(steps).toHaveLength(3);
  });

  it('marks current step as active', () => {
    render(<StepIndicator currentStep={1} totalSteps={3} />);
    const activeStep = screen.getByLabelText(/paso actual/i);
    expect(activeStep).toBeInTheDocument();
  });

  it('marks completed steps', () => {
    render(<StepIndicator currentStep={2} totalSteps={3} />);
    const completedSteps = screen.getAllByLabelText(/paso completado/i);
    expect(completedSteps).toHaveLength(2);
  });

  it('marks pending steps', () => {
    render(<StepIndicator currentStep={0} totalSteps={3} />);
    const pendingSteps = screen.getAllByLabelText(/paso pendiente/i);
    expect(pendingSteps).toHaveLength(2);
  });

  it('step 0 of 3: 0 completed, 1 active, 2 pending', () => {
    render(<StepIndicator currentStep={0} totalSteps={3} />);
    expect(screen.queryAllByLabelText(/paso completado/i)).toHaveLength(0);
    expect(screen.getAllByLabelText(/paso actual/i)).toHaveLength(1);
    expect(screen.getAllByLabelText(/paso pendiente/i)).toHaveLength(2);
  });

  it('step 2 of 3: 2 completed, 1 active, 0 pending', () => {
    render(<StepIndicator currentStep={2} totalSteps={3} />);
    expect(screen.getAllByLabelText(/paso completado/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/paso actual/i)).toHaveLength(1);
    expect(screen.queryAllByLabelText(/paso pendiente/i)).toHaveLength(0);
  });

  it('renders step numbers inside each circle', () => {
    render(<StepIndicator currentStep={0} totalSteps={3} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
