import { useState } from "react";
import ProgressBar from "../../components/assessment/ProgressBar";
import WelcomeStep from "../../components/assessment/WelcomeStep";
import ConsentStep from "../../components/assessment/ConsentStep";
import LanguageStep from "../../components/assessment/LanguageStep";

type AssessmentStep = 1 | 2 | 3;

function AssessmentPage() {
  const [step, setStep] = useState<AssessmentStep>(1);
  const [language, setLanguage] = useState("en");

  const handleLanguageContinue = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);

    console.log("Selected language:", selectedLanguage);

    // Next phase:
    // move into text / voice assessment.
  };

  return (
    <div className="min-h-screen bg-[#fcfafb]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-950"
          >
            SAKHI
          </a>

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            A friend who listens
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <ProgressBar
            currentStep={step}
            totalSteps={3}
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          {step === 1 && (
            <WelcomeStep
              onContinue={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <ConsentStep
              onBack={() => setStep(1)}
              onContinue={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <LanguageStep
              onBack={() => setStep(2)}
              onContinue={handleLanguageContinue}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default AssessmentPage;