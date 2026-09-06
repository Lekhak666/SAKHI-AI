import MessageBubble from "./MessageBubble";

export interface Message {
  id: number;
  sender: "sakhi" | "user";
  message: string;
}

interface MessageListProps {
  messages: Message[];
}

function MessageList({
  messages,
}: MessageListProps) {
  return (
    <div className="flex flex-col gap-5">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          sender={message.sender}
          message={message.message}
        />
      ))}
    </div>
  );
}

export default MessageList;