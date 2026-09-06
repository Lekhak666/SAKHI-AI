import {
  ArrowUp,
  Mic,
} from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
  mode: "text" | "voice";
  onSend: (message: string) => void;
}

function MessageInput({
  mode,
  onSend,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
      {mode === "voice" ? (
        <button
          type="button"
          className="mx-auto flex w-full max-w-xl items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <Mic size={19} />
          Tap to speak
        </button>
      ) : (
        <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-rose-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-50">
          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Share what's on your mind..."
            rows={1}
            className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Send message"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      )}

      <p className="mt-3 text-center text-[11px] text-slate-400">
        You can share only what you're comfortable sharing.
      </p>
    </div>
  );
}

export default MessageInput;