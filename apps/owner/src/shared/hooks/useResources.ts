"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { resourcesClient } from "@shared/api/resources.client";
import { 
  Resource, 
  CreateResourceRequest, 
  UpdateResourceRequest, 
  PaginationParams 
} from "@shared/types/api.types";

// Query keys
export const resourceKeys = {
  all: ["resources"] as const,
  lists: () => [...resourceKeys.all, "list"] as const,
  list: (filters: PaginationParams) => [...resourceKeys.lists(), filters] as const,
  details: () => [...resourceKeys.all, "detail"] as const,
  detail: (id: string) => [...resourceKeys.details(), id] as const,
};

// Get resources list
export function useResources(filters: PaginationParams = {}) {
  return useQuery({
    queryKey: resourceKeys.list(filters),
    queryFn: () => resourcesClient.getResources(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single resource
export function useResource(id: string) {
  return useQuery({
    queryKey: resourceKeys.detail(id),
    queryFn: () => resourcesClient.getResource(id),
    enabled: !!id,
  });
}

// Create resource mutation
export function useCreateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResourceRequest) => resourcesClient.createResource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });
}

// Update resource mutation
export function useUpdateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateResourceRequest }) =>
      resourcesClient.updateResource(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });
}

// Delete resource mutation
export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resourcesClient.deleteResource(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: resourceKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });
}
