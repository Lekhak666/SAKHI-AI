import { ArrowUp, Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";

import type {
  SpeechRecognitionInstance,
  SpeechRecognitionWindow,
} from "../../types/speech";

interface MessageInputProps {
  mode: "text" | "voice";
  onSend: (message: string) => void;
  disabled?: boolean;
}

function MessageInput({ mode, onSend, disabled = false }: MessageInputProps) {
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
    setVoiceError("");

    if (disabled) {
      return;
    }

    const speechWindow = window as SpeechRecognitionWindow;

    const SpeechRecognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Voice input isn't supported in this browser. Please use Chrome or Edge.",
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
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
        setVoiceError("Microphone permission was denied.");
      } else if (event.error === "no-speech") {
        setVoiceError("I couldn't hear anything. Please try again.");
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
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  if (mode === "voice") {
    return (
      <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={disabled}
            className={`mx-auto flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-medium transition ${
              isListening
                ? "border border-rose-300 bg-rose-50 text-rose-600"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {isListening ? (
              <>
                <MicOff size={19} />
                Listening...
              </>
            ) : (
              <>
                <Mic size={19} />
                Tap to speak
              </>
            )}
          </button>

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
          placeholder="Share what's on your mind..."
          rows={1}
          disabled={disabled}
          className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
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
