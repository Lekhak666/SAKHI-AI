import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ConversationHeader from "../../components/conversation/ConversationHeader";
import MessageList, {
  type Message,
} from "../../components/conversation/MessageList";
import MessageInput from "../../components/conversation/MessageInput";

import { getConversation, sendMessage } from "../../services/api";

function ConversationPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const [mode] = useState<"text" | "voice">("text");

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Keeps the latest message visible.
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversationId) {
      navigate("/assessment");
      return;
    }

    const loadConversation = async () => {
      try {
        const result = await getConversation(conversationId);

        const formattedMessages: Message[] = result.conversation.messages.map(
          (message, index) => ({
            id: index + 1,
            sender: message.role === "assistant" ? "sakhi" : "user",
            message: message.content,
          }),
        );

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Failed to load conversation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversation();
  }, [conversationId, navigate]);

  // Automatically scroll to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isSending]);

  const handleSend = async (message: string) => {
    if (!conversationId || !message.trim() || isSending) {
      return;
    }

    const userMessage = message.trim();

    // Show the user's message immediately.
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        sender: "user",
        message: userMessage,
      },
    ]);

    setIsSending(true);

    try {
      const result = await sendMessage(conversationId, userMessage);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: "sakhi",
          message: result.assistantMessage.content,
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: "sakhi",
          message:
            "I'm having trouble responding right now. Please try sending your message again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfafb]">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
          Loading your conversation...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfafb]">
      {/* Top navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-semibold tracking-tight text-slate-950 transition-opacity hover:opacity-70"
          >
            SAKHI
          </button>

          <span className="hidden text-xs font-medium uppercase tracking-[0.15em] text-slate-400 sm:block">
            A friend who listens
          </span>
        </div>
      </header>

      {/* Chat container */}
      <main className="flex flex-1 justify-center px-3 py-4 sm:px-6 sm:py-8">
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Conversation header */}
          <ConversationHeader />

          {/* Messages + input */}
          <div className="flex min-h-0 flex-1 flex-col">
            {/* Scrollable message area */}
            <div className="min-h-[55vh] flex-1 overflow-y-auto scroll-smooth px-4 py-6 sm:px-8 sm:py-8">
              <MessageList messages={messages} />

              {/* Typing indicator */}
              {isSending && (
                <div className="mt-5 flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll target */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-100 bg-white">
              <MessageInput mode={mode} onSend={handleSend} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ConversationPage;
