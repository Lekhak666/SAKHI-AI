import { ArrowLeft, ArrowRight, Globe2 } from "lucide-react";
import { useState } from "react";

import type { SakhiLanguage } from "../../services/api";

interface LanguageStepProps {
  onBack: () => void;
  onContinue: (language: SakhiLanguage) => void;
}

const languages: {
  id: SakhiLanguage;
  name: string;
  nativeName: string;
}[] = [
  {
    id: "en",
    name: "English",
    nativeName: "English",
  },
  {
    id: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
  },
  {
    id: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
  },
];

function LanguageStep({ onBack, onContinue }: LanguageStepProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<SakhiLanguage>("en");

  return (
    <div>
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          <Globe2 size={25} />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          How would you like to continue?
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          Choose the language you're most comfortable using.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
        {languages.map((language) => {
          const selected = selectedLanguage === language.id;

          return (
            <button
              key={language.id}
              type="button"
              onClick={() => setSelectedLanguage(language.id)}
              className={`rounded-2xl border p-6 text-left transition ${
                selected
                  ? "border-rose-500 bg-rose-50 ring-2 ring-rose-100"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`mb-6 h-3 w-3 rounded-full ${
                  selected ? "bg-rose-500" : "bg-slate-200"
                }`}
              />

              <p className="font-semibold text-slate-900">{language.name}</p>

              <p className="mt-1 text-sm text-slate-500">
                {language.nativeName}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          type="button"
          onClick={() => onContinue(selectedLanguage)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default LanguageStep;
