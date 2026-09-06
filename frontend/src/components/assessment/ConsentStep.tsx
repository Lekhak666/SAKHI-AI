import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { useState } from "react";

interface ConsentStepProps {
  onBack: () => void;
  onContinue: () => void;
}

function ConsentStep({
  onBack,
  onContinue,
}: ConsentStepProps) {
  const [consented, setConsented] = useState(false);

  return (
    <div>
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <LockKeyhole size={25} />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Before we begin
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          We want you to understand how this experience works
          before you decide whether you'd like to continue.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        <ConsentItem
          title="You choose what to share"
          description="You can skip questions or stop the conversation whenever you want."
        />

        <ConsentItem
          title="SAKHI is an AI-assisted system"
          description="The information you provide may be analyzed to identify signs of stress or vulnerability."
        />

        <ConsentItem
          title="This is not a replacement for professional care"
          description="SAKHI is designed to support access to appropriate help, not to provide a medical or psychological diagnosis."
        />

        <ConsentItem
          title="Your information should be handled responsibly"
          description="We'll provide clear information about data use and privacy as part of the experience."
        />
      </div>

      <label className="mx-auto mt-8 flex max-w-2xl cursor-pointer gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300">
        <input
          type="checkbox"
          checked={consented}
          onChange={(event) =>
            setConsented(event.target.checked)
          }
          className="mt-1 h-4 w-4 accent-rose-500"
        />

        <span className="text-sm leading-6 text-slate-600">
          I understand the information above and voluntarily
          consent to continue with the SAKHI assessment.
        </span>
      </label>

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
          disabled={!consented}
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ConsentItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <CheckCircle2
        size={20}
        className="mt-0.5 shrink-0 text-emerald-500"
      />

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ConsentStep;