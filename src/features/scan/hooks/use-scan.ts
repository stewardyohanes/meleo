import { useMutation, useQuery } from "@tanstack/react-query";
import { scanService } from "../services/scan.service";
import type { ConfirmFood } from "../types";

export function useCreateScan() {
  return useMutation({
    mutationFn: async (fileUri: string) => {
      const { path } = await scanService.uploadImage(fileUri);
      return scanService.create(path);
    },
  });
}

export function useScan(id: string | undefined) {
  return useQuery({
    queryKey: ["scan", id],
    queryFn: () => scanService.get(id as string),
    enabled: !!id,
  });
}

export function useRetryScan() {
  return useMutation({ mutationFn: (id: string) => scanService.retry(id) });
}

export function useConfirmScan() {
  return useMutation({
    mutationFn: ({ id, foods, eatenAt }: { id: string; foods: ConfirmFood[]; eatenAt?: string }) =>
      scanService.confirm(id, foods, eatenAt),
  });
}
