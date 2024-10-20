"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const SavedIdeas = ({ ideas }: { ideas: string[] }) => {
  const [savedIdeas, setSavedIdeas] = useState<string[]>(ideas);

  const clearIdeas = () => {
    setSavedIdeas([]); // Clear the saved ideas
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 h-full">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Saved Ideas
      </h2>
      {savedIdeas.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No ideas saved yet.</p>
      ) : (
        <ul className="mt-4">
          {savedIdeas.map((idea, index) => (
            <li key={index} className="mb-2 text-gray-900 dark:text-white">
              {idea}
            </li>
          ))}
        </ul>
      )}
      <Button onClick={clearIdeas} className="mt-4">
        Clear Ideas
      </Button>
    </div>
  );
};

export default SavedIdeas;
