import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useSavedIdeas = () => {
  return useQuery({
    queryKey: ["saved-ideas"],
    queryFn: async () => {
      const response = await axiosInstance.get("/saved-ideas");
      return response.data;
    },
  });
};

export const useSaveIdea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idea: string) => axiosInstance.post("/save-idea", { idea }),
    onSuccess: () => {
      // Invalidate saved ideas cache to refetch them
      queryClient.invalidateQueries({
        queryKey: ["saved-ideas"],
      });
    },
  });
};

export const useClearIdeas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => axiosInstance.post("/clear-ideas"),
    onSuccess: () => {
      // Invalidate saved ideas cache to refetch them
      queryClient.invalidateQueries({
        queryKey: ["saved-ideas"],
      });
    },
  });
};
