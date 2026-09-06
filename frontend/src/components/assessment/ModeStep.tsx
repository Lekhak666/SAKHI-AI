import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Mic,
} from "lucide-react";
import { useState } from "react";

interface ModeStepProps {
  onBack: () => void;
  onContinue: (mode: "text" | "voice") => void;
}

function ModeStep({
  onBack,
  onContinue,
}: ModeStepProps) {
  const [selectedMode, setSelectedMode] =
    useState<"text" | "voice">("text");

  return (
    <div>
      {/* Heading */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <MessageCircle size={25} />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          How would you like to talk?
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          Choose whichever feels more comfortable for you.
          You can take your time.
        </p>
      </div>

      {/* Options */}
      <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">

        {/* TEXT */}
        <button
          type="button"
          onClick={() => setSelectedMode("text")}
          className={`rounded-3xl border p-7 text-left transition-all ${
            selectedMode === "text"
              ? "border-rose-500 bg-rose-50 ring-2 ring-rose-100"
              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                selectedMode === "text"
                  ? "bg-rose-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <MessageCircle size={22} />
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 ${
                selectedMode === "text"
                  ? "border-rose-500 bg-rose-500"
                  : "border-slate-300"
              }`}
            />
          </div>

          <h2 className="mt-7 text-xl font-semibold text-slate-950">
            Text
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Share your thoughts through a private text
            conversation with SAKHI.
          </p>
        </button>

        {/* VOICE */}
        <button
          type="button"
          onClick={() => setSelectedMode("voice")}
          className={`rounded-3xl border p-7 text-left transition-all ${
            selectedMode === "voice"
              ? "border-rose-500 bg-rose-50 ring-2 ring-rose-100"
              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                selectedMode === "voice"
                  ? "bg-rose-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Mic size={22} />
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 ${
                selectedMode === "voice"
                  ? "border-rose-500 bg-rose-500"
                  : "border-slate-300"
              }`}
            />
          </div>

          <h2 className="mt-7 text-xl font-semibold text-slate-950">
            Voice
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Talk naturally with SAKHI using your voice.
          </p>

          <span className="mt-5 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            Voice support
          </span>
        </button>
      </div>

      {/* Navigation */}
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
          onClick={() => onContinue(selectedMode)}
          className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Continue

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        You can change your preference later.
      </p>
    </div>
  );
}

export default ModeStep;