"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axiosInstance from "@/service/axiosInstance";
import { useSaveIdea } from "@/service/idea";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const Chat = ({ onSaveIdea }: { onSaveIdea: (idea: string) => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await axiosInstance.post("/chat", { message });
      return response.data.response;
    },
  });

  const saveIdeaMutation = useSaveIdea();

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(""); // Clear the input field after sending

      // Use the mutation to send the message
      sendMessageMutation.mutate(input, {
        onSuccess: (botResponse: string) => {
          const botMessage: Message = { text: botResponse, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        },
        onError: (error) => {
          console.error("Error sending message:", error);
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex justify-between items-center ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span className="text-gray-900 dark:text-white">{msg.text}</span>
            {msg.sender === "bot" && (
              <Button
                onClick={() => {
                  onSaveIdea(msg.text);
                  saveIdeaMutation.mutate(msg.text);
                }}
                variant="secondary"
                size="sm"
              >
                Save Idea
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700"
          placeholder="Type your message"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
