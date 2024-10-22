"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { Button } from "./ui/button";
import axiosInstance from "@/service/axiosInstance";
import { useClearIdeas, useSaveIdea } from "@/service/idea";
import { cn } from "@/lib/utils";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const botIntroMessage: Message = {
  sender: "bot",
  text: "Hello! How can I help you brainstorm today?",
};

const Chat = ({ onSaveIdea }: { onSaveIdea: (idea: string) => void }) => {
  const clearIdeasMutation = useClearIdeas();
  const saveIdeaMutation = useSaveIdea();
  const [messages, setMessages] = useState<Message[]>([botIntroMessage]);
  const [input, setInput] = useState("");

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await axiosInstance.post("/chat", { message });
      return response.data.response;
    },
  });

  const resetConversationAndIdeas = () => {
    clearIdeasMutation.mutate();
    setMessages([botIntroMessage]);
  };

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

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
      <div className=" overflow-y-auto flex-1 max-h-[550px] bg-gray-100  dark:bg-gray-800 p-8">
        {messages.map((msg, index) => (
          <div key={index}>
            <div
              className={cn(
                `mb-2 flex items-center`,
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <span className="text-gray-900 dark:text-white">{msg.text}</span>
              {msg.sender === "bot" && index !== 0 && (
                <Button
                  onClick={() => {
                    onSaveIdea(msg.text);
                    saveIdeaMutation.mutate(msg.text);
                  }}
                  variant="secondary"
                  size="sm"
                  aria-label="Save button"
                  title="Save button"
                >
                  <Save />
                </Button>
              )}
            </div>
            <div ref={endOfMessagesRef} />
          </div>
        ))}
      </div>
      <Button
        onClick={resetConversationAndIdeas}
        variant="destructive"
        size="lg"
        className="mt-4"
      >
        Reset Conversation and Ideas
      </Button>
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
