import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import type { ServiceBill, HomeData } from '../../interfaces/AppInterfaces';
import { validateStep } from '../../helpers/validateStep';
import { calculate } from '../../helpers/calculate';
import StepIndicator from './StepIndicator';
import Step1Service from './Step1Service';
import Step2Bill from './Step2Bill';
import Step3Occupants from './Step3Occupants';
import Step4Result from './Step4Result';

interface Props {
  serviceBill: ServiceBill;
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>;
  homeData: HomeData;
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>;
}

const FORM_STEPS = 3;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const transition = { duration: 0.3, ease: 'easeInOut' as const };

const WizardForm = ({ serviceBill, setServiceBill, homeData, setHomeData }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [result, setResult] = useState('');

  const isResultStep = currentStep === FORM_STEPS;

  const handleNext = () => {
    const errors = validateStep(currentStep as 0 | 1 | 2, serviceBill, homeData);
    if (errors.length > 0) { setStepErrors(errors); return; }
    setStepErrors([]);
    setDirection(1);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStepErrors([]);
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };

  const handleCalculate = () => {
    const errors = validateStep(2, serviceBill, homeData);
    if (errors.length > 0) { setStepErrors(errors); return; }
    setStepErrors([]);
    const calc = calculate(serviceBill, homeData);
    if (calc.success) {
      setResult(calc.message);
      setDirection(1);
      setCurrentStep(FORM_STEPS);
    }
  };

  const handleReset = () => {
    setResult('');
    setDirection(-1);
    setCurrentStep(0);
  };

  const isLastFormStep = currentStep === FORM_STEPS - 1;

  return (
    <div className="card-glass px-6 pt-6 pb-6 w-full">
      {!isResultStep && (
        <StepIndicator currentStep={currentStep} totalSteps={FORM_STEPS} />
      )}

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {currentStep === 0 && (
              <Step1Service serviceBill={serviceBill} setServiceBill={setServiceBill} errors={stepErrors} />
            )}
            {currentStep === 1 && (
              <Step2Bill serviceBill={serviceBill} setServiceBill={setServiceBill} errors={stepErrors} />
            )}
            {currentStep === 2 && (
              <Step3Occupants serviceBill={serviceBill} homeData={homeData} setHomeData={setHomeData} errors={stepErrors} />
            )}
            {currentStep === FORM_STEPS && (
              <Step4Result message={result} onReset={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!isResultStep && (
        <div className="flex justify-between gap-4 mt-4">
          {currentStep > 0 ? (
            <button
              type="button"
              className="border border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-semibold py-2.5 px-4 rounded-xl transition-colors flex-1"
              onClick={handleBack}
            >
              Atrás
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {isLastFormStep ? (
            <button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors flex-1 shadow-sm"
              onClick={handleCalculate}
            >
              Calcular
            </button>
          ) : (
            <button
              type="button"
              className={clsx('bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors flex-1 shadow-sm')}
              onClick={handleNext}
            >
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WizardForm;
