import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Card } from "./ui/card.tsx";
import api from "../lib/api.js";

const ChatBox = ({ onNewNote }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am Notezy Assistant", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // ✅ ref for last message

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");

    try {
      const res = await api.post("/api/chat", {
        message: userInput,
      });

      const data = res.data;

      // Bot reply
      const botMessage = { text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

      // If AI created a note
      if (data.note) {
        console.log("New note created:", data.note);
        onNewNote();
      }
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  // ✅ Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbox border-x-2 w-[400px] p-4">
      <div className="flex-1 overflow-y-auto h-[520px] scrollbar-hide">
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={`max-w-[70%] px-4 mt-2 py-2 rounded-2xl shadow
              ${msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-900 mr-auto"}
            `}
          >
            {msg.text}
          </Card>
        ))}
        <div ref={messagesEndRef} /> {/* 👈 scroll target */}
      </div>

      <div className="absolute bottom-10 items-center w-[350px] bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
        <Textarea
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask what can I help..."
          className="w-full h-[100px] bg-gray-200 text-black"
        />
        <Button onClick={handleSend} className="absolute right-0">Send</Button>
      </div>
    </div>
  );
};

export default ChatBox;

