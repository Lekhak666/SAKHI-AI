import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  sender: "sakhi" | "user";
  message: string;
}

function MessageBubble({ sender, message }: MessageBubbleProps) {
  const isUser = sender === "user";

  // Convert HTML line breaks into Markdown line breaks
  const formattedMessage = message
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p>/gi, "");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 text-sm leading-7 sm:max-w-[70%] ${
          isUser
            ? "rounded-br-md bg-slate-950 text-white"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-slate">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {formattedMessage}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
