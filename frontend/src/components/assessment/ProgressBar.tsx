interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Getting started</span>
        <span>
          {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-rose-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;