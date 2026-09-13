import { ArrowUp, Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MessageInputProps {
  mode: "text" | "voice";
  onSend: (message: string) => void;
  isSending?: boolean;
}

const MAX_MESSAGE_LENGTH = 2000;

function MessageInput({ mode, onSend, isSending = false }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const hasMessage = message.trim().length > 0;
  const remainingCharacters = MAX_MESSAGE_LENGTH - message.length;

  /*
   * Automatically resize the textarea based on its content.
   */
  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  /*
   * Keep the input focused after SAKHI finishes responding.
   */
  useEffect(() => {
    if (!isSending) {
      textareaRef.current?.focus();
    }
  }, [isSending]);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /*
     * Enter sends the message.
     * Shift + Enter creates a new line.
     */
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
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
        <div
          className={`mx-auto max-w-3xl rounded-2xl border bg-slate-50 p-2 transition ${
            isSending
              ? "border-slate-200 opacity-70"
              : "border-slate-200 focus-within:border-rose-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-50"
          }`}
        >
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(event) => {
                if (event.target.value.length <= MAX_MESSAGE_LENGTH) {
                  setMessage(event.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              placeholder={
                isSending
                  ? "SAKHI is responding..."
                  : "Share what's on your mind..."
              }
              rows={1}
              className="max-h-32 min-h-11 flex-1 resize-none overflow-y-auto bg-transparent px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!hasMessage || isSending}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition-all hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={isSending ? "SAKHI is responding" : "Send message"}
            >
              <ArrowUp size={18} />
            </button>
          </div>

          {/* Character counter only appears near the limit */}
          {remainingCharacters <= 200 && (
            <div className="px-3 pb-1 pt-1 text-right text-[10px] text-slate-400">
              {remainingCharacters} characters left
            </div>
          )}
        </div>
      )}

      <p className="mt-3 text-center text-[11px] text-slate-400">
        Shift + Enter for a new line
      </p>
    </div>
  );
}

export default MessageInput;
