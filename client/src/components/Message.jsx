import { CheckCheck } from "lucide-react";

function Message({ message, userid }) {
  const isMine = message.sender == userid;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 rounded-2xl ${
          isMine
            ? "bg-gradient-to-br from-red-500/90 via-orange-500/90 to-orange-400/90 rounded-br-md"
            : "bg-white/[0.07] border border-white/10 rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>

        <div
          className={`flex items-center justify-end gap-1 mt-1 ${
            isMine ? "text-white/60" : "text-zinc-600"
          }`}
        >
          <span className="text-[10px]">{message.time}</span>
          {isMine && <CheckCheck size={13} />}
        </div>
      </div>
    </div>
  );
}

export default Message;
