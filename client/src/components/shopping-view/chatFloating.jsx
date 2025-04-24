import { useState } from "react";
import ChatUI from "@/components/shopping-view/chatUI";
import { MessageSquare } from "lucide-react";

export default function ChatFloating() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg cursor-pointer hover:scale-105 transition"
      >
        <MessageSquare className="w-6 h-6" />
      </div>
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[300px] h-[400px] bg-white shadow-lg rounded-lg overflow-hidden">
          {isChatOpen && <ChatUI onClose={() => setIsChatOpen(false)} />}
        </div>
      )}
    </>
  );
}
