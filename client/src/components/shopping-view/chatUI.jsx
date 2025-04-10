import { useState } from "react";
import axios from "axios";

const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold** → <strong>
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // *italics* → <em>
      .replace(/👉/g, "👉") // Ensure emojis render
      .replace(/\n/g, "<br />"); // Newlines → <br />
  };

function ChatUI({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot/chat", {
        userQuery: input,
        context: "general",
      });

      const botMessage = { 
        sender: "bot", 
        text: response.data,
        isFormatted: true
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { sender: "bot", text: "Something went wrong. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-5 bg-white w-80 h-96 shadow-lg rounded-lg flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
        <span>Chatbot</span>
        <button onClick={onClose} className="text-white font-bold">✖</button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {msg.isFormatted ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatMessage(msg.text) 
                }} 
              />
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 flex items-center border-t">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 mr-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatUI;