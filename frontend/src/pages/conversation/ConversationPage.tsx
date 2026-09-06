import { useState } from "react";

import ConversationHeader from "../../components/conversation/ConversationHeader";
import MessageList, {
  type Message,
} from "../../components/conversation/MessageList";
import MessageInput from "../../components/conversation/MessageInput";

function ConversationPage() {
  const [mode] = useState<"text" | "voice">("text");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "sakhi",
      message:
        "Hi. I'm glad you're here. You don't have to explain everything at once.",
    },
    {
      id: 2,
      sender: "sakhi",
      message:
        "Take your time. What's been feeling difficult lately?",
    },
  ]);

  const handleSend = (message: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        sender: "user",
        message,
      },
    ]);

    // Phase 3.6:
    // Send this message to Khushi's backend.
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfafb]">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
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

      {/* Conversation */}
      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <ConversationHeader />

          <div className="flex min-h-[55vh] flex-1 flex-col justify-between">

            {/* Messages */}
            <div className="overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
              <MessageList messages={messages} />
            </div>

            {/* Input */}
            <MessageInput
              mode={mode}
              onSend={handleSend}
            />

          </div>
        </div>
      </main>
    </div>
  );
}

export default ConversationPage;