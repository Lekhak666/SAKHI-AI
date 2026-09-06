interface MessageBubbleProps {
  sender: "sakhi" | "user";
  message: string;
}

function MessageBubble({
  sender,
  message,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 text-sm leading-7 sm:max-w-[70%] ${
          isUser
            ? "rounded-br-md bg-slate-950 text-white"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;