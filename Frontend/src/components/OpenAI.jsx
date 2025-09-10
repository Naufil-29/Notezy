import { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Card } from "./ui/card.tsx";

const ChatBox = ({onNewNote}) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am Notezy Assistant", sender: "bot", }
  ]);
  const [input, setInput] = useState("");

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  setMessages((prev) => [...prev, userMessage]);

  const userInput = input;
  setInput("");

  try {

    const res = await fetch("http://localhost:5001/api/chat/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, //attach token
       },
      body: JSON.stringify({
        message: userInput,
      }),
    });

    if(!res.ok){ 
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    // Bot reply
    const botMessage = { text: data.reply, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);

    // If AI created a note, update frontend notes list (if you have state for it)
    if (data.note) {
      // You can call setNotes([...notes, data.note]) if notes are in parent component
      console.log("New note created:", data.note);
      onNewNote();
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="chatbox border-x-2 w-[400px] p-4">
      <div className="flex-1 overflow-x-auto h-[520px] scrollbar-hide">
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={`max-w-[70%] px-4 mt-2 py-2 rounded-2xl shadow
        ${msg.sender === "user"
          ? "bg-blue-500 text-white ml-auto"   // User → left side
          : "bg-gray-200 text-gray-900 mr-auto"} // Bot → right side
      `}
          >
            {msg.text}
          </Card>
        ))}
      </div>

      <div className=" absolute bottom-10 items-center w-[350px] bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
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