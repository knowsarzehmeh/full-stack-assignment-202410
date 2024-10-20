"use client";

import Chat from "@/components/Chat";
import SavedIdeas from "@/components/SavedIdeas";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

export default function Home() {
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);

  const handleSaveIdea = (idea: string) => {
    setSavedIdeas([...savedIdeas, idea]); // Add the idea to the saved list
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Chatbot Interface
        </h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex">
        <aside className="w-1/3">
          <SavedIdeas ideas={savedIdeas} />
        </aside>
        <section className="flex-1">
          <Chat onSaveIdea={handleSaveIdea} />
        </section>
      </main>
    </div>
  );
}
