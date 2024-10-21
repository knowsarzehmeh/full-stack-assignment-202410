"use client";

import { useClearIdeas, useSavedIdeas } from "@/service/idea";
import { Button } from "./ui/button";

const SavedIdeas = () => {
  const { data: ideas, isLoading } = useSavedIdeas();
  const clearIdeasMutation = useClearIdeas();

  if (isLoading) return <p>Loading ideas...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Saved Ideas</h2>
      <ul className="list-disc pl-5">
        {ideas?.length > 0 ? (
          ideas.map((idea: string, index: number) => (
            <li key={index} className="text-gray-900 dark:text-white">
              {idea}
            </li>
          ))
        ) : (
          <p>No saved ideas yet.</p>
        )}
      </ul>

      {ideas?.length > 0 && (
        <Button
          onClick={() => clearIdeasMutation.mutate()}
          variant="destructive"
          size="sm"
          className="mt-4"
        >
          Clear All Ideas
        </Button>
      )}
    </div>
  );
};

export default SavedIdeas;
