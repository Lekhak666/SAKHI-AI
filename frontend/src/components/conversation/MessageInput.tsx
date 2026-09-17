import { ArrowUp, Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";

import type { SupportedLanguage, InteractionMode } from "../../services/api";

import type {
  SpeechRecognitionInstance,
  SpeechRecognitionWindow,
} from "../../types/speech";

interface MessageInputProps {
  mode: InteractionMode;
  language: SupportedLanguage;
  onSend: (message: string) => void;
  disabled?: boolean;
}

const recognitionLanguages: Record<SupportedLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
};

function MessageInput({
  mode,
  language,
  onSend,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const [isListening, setIsListening] = useState(false);

  const [voiceError, setVoiceError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend(trimmedMessage);

    setMessage("");
  };

  const startListening = () => {
    if (disabled || isListening) {
      return;
    }

    setVoiceError("");

    const speechWindow = window as SpeechRecognitionWindow;

    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setVoiceError(
        "Voice input is not supported in this browser. Please use Chrome or switch to text.",
      );

      return;
    }

    const recognition = new Recognition();

    recognition.lang = recognitionLanguages[language];

    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (transcript) {
        onSend(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        setVoiceError(
          "Microphone permission was denied. Please allow microphone access and try again.",
        );
      } else if (event.error === "no-speech") {
        setVoiceError("I couldn't hear anything. Please try speaking again.");
      } else {
        setVoiceError("I couldn't understand that. Please try again.");
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error("Failed to start speech recognition:", error);

      setIsListening(false);
      setVoiceError("Could not start the microphone. Please try again.");
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) {
      return;
    }

    recognitionRef.current.stop();

    setIsListening(false);
  };

  if (mode === "voice") {
    return (
      <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={disabled}
            className={`mx-auto flex w-full items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-sm font-medium transition ${
              isListening
                ? "border-rose-300 bg-rose-50 text-rose-600"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {isListening ? <MicOff size={19} /> : <Mic size={19} />}

            {isListening
              ? "Listening... Tap to stop"
              : disabled
                ? "SAKHI is thinking..."
                : "Tap to speak"}
          </button>

          {isListening && (
            <p className="mt-3 text-center text-xs text-rose-500">
              Speak naturally. SAKHI is listening.
            </p>
          )}

          {voiceError && (
            <p className="mt-3 text-center text-xs text-rose-500">
              {voiceError}
            </p>
          )}
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-400">
          You can share only what you're comfortable sharing.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-rose-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-50">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          disabled={disabled}
          placeholder="Share what's on your mind..."
          rows={1}
          className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Send message"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-400">
        You can share only what you're comfortable sharing.
      </p>
    </div>
  );
}

export default MessageInput;
