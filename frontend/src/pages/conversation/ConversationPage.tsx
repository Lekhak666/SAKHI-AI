import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ConversationHeader from "../../components/conversation/ConversationHeader";
import MessageList, {
  type Message,
} from "../../components/conversation/MessageList";
import MessageInput from "../../components/conversation/MessageInput";

import { getConversation, sendMessage } from "../../services/api";

function ConversationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const conversationId = location.state?.conversationId;

  const [mode] = useState<"text" | "voice">("text");

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

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

  const handleSend = async (message: string) => {
    if (!conversationId || !message.trim() || isSending) {
      return;
    }

    const userMessage = message.trim();

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
        <p className="text-sm text-slate-400">Loading your conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfafb]">
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

      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <ConversationHeader />

          <div className="flex min-h-[55vh] flex-1 flex-col justify-between">
            <div className="overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
              <MessageList messages={messages} />

              {isSending && (
                <div className="mt-4 text-sm text-slate-400">
                  SAKHI is thinking...
                </div>
              )}
            </div>

            <MessageInput mode={mode} onSend={handleSend} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ConversationPage;
