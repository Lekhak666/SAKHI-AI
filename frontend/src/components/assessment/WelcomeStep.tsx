import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

interface WelcomeStepProps {
  onContinue: () => void;
}

function WelcomeStep({ onContinue }: WelcomeStepProps) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
        <HeartHandshake size={30} strokeWidth={1.8} />
      </div>

      <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
        Welcome to SAKHI
      </p>

      <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
        Take your time.
        <span className="block text-rose-600">
          We're listening.
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
        This is a safe space to share what you're going through.
        There is no need to rush, and you only need to share what
        you're comfortable sharing.
      </p>

      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
        <div className="flex gap-3">
          <ShieldCheck
            className="mt-0.5 shrink-0 text-emerald-600"
            size={20}
          />

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Your privacy matters
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Before we begin, we'll explain how your information
              may be used and ask for your consent.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="group mt-9 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Continue
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      <p className="mt-5 text-xs text-slate-400">
        You can stop at any point.
      </p>
    </div>
  );
}

export default WelcomeStep;