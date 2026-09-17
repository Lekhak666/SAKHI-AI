import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import ConversationHeader from "../../components/conversation/ConversationHeader";
import MessageList, {
  type Message,
} from "../../components/conversation/MessageList";
import MessageInput from "../../components/conversation/MessageInput";

import {
  getConversation,
  sendMessage,
  type SupportedLanguage,
  type InteractionMode,
} from "../../services/api";

const speechLanguages: Record<SupportedLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
};

function ConversationPage() {
  const { conversationId } = useParams();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const urlMode = searchParams.get("mode");

  const urlLanguage = searchParams.get("language");

  const mode: InteractionMode = urlMode === "voice" ? "voice" : "text";

  const language: SupportedLanguage =
    urlLanguage === "hi" || urlLanguage === "bn" ? urlLanguage : "en";

  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isSending, setIsSending] = useState(false);

  const speakText = (text: string) => {
    if (mode !== "voice" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/[#*_`]/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/\|/g, " ")
      .replace(/\n+/g, " ")
      .trim();

    if (!cleanText) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);

    const targetLanguage = speechLanguages[language];

    const voices = window.speechSynthesis.getVoices();

    const matchingVoice =
      voices.find(
        (voice) => voice.lang.toLowerCase() === targetLanguage.toLowerCase(),
      ) ||
      voices.find((voice) =>
        voice.lang.toLowerCase().startsWith(language.toLowerCase()),
      );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.lang = targetLanguage;
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

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

        navigate("/assessment");
      } finally {
        setIsLoading(false);
      }
    };

    loadConversation();

    return () => {
      window.speechSynthesis?.cancel();
    };
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

      const assistantText = result.assistantMessage.content;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: "sakhi",
          message: assistantText,
        },
      ]);

      speakText(assistantText);
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

            <MessageInput
              mode={mode}
              language={language}
              onSend={handleSend}
              disabled={isSending}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ConversationPage;
