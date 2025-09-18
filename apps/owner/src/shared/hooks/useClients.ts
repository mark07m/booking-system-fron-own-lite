"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsClient } from "@/src/shared/api/clients.client";
import { 
  Client, 
  CreateClientRequest, 
  UpdateClientRequest, 
  PaginationParams 
} from "@/src/shared/types/api.types";

// Query keys
export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (filters: PaginationParams) => [...clientKeys.lists(), filters] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
};

// Get clients list
export function useClients(filters: PaginationParams = {}) {
  return useQuery({
    queryKey: clientKeys.list(filters),
    queryFn: () => clientsClient.getClients(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single client
export function useClient(id: string) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientsClient.getClient(id),
    enabled: !!id,
  });
}

// Create client mutation
export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientRequest) => clientsClient.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

// Update client mutation
export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientRequest }) =>
      clientsClient.updateClient(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

// Delete client mutation
export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsClient.deleteClient(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: clientKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}
