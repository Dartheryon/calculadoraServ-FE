import clsx from 'clsx';

interface Props {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: Props) => {
  return (
    <ol className="flex items-center justify-center mb-6 gap-2">
      {Array.from({ length: totalSteps }, (_, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isPending = index > currentStep;

        const label = isCompleted
          ? `Paso completado ${index + 1}`
          : isActive
          ? `Paso actual ${index + 1}`
          : `Paso pendiente ${index + 1}`;

        return (
          <li key={index} className="flex items-center" aria-label={label}>
            <span
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold border-2',
                {
                  'bg-emerald-600 border-emerald-600 text-white': isCompleted,
                  'bg-white border-emerald-500 text-emerald-700 ring-2 ring-emerald-100': isActive,
                  'bg-emerald-50 border-emerald-100 text-emerald-300': isPending,
                }
              )}
            >
              {index + 1}
            </span>
            {index < totalSteps - 1 && (
              <span
                className={clsx('h-0.5 w-8 mx-1', {
                  'bg-emerald-500': isCompleted,
                  'bg-emerald-100': !isCompleted,
                })}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default StepIndicator;
