import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { meService } from "../services/me.service";
import type { Preferences } from "../types";

export const meKeys = { me: ["me"] as const };

export function useMe() {
  return useQuery({ queryKey: meKeys.me, queryFn: meService.get });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prefs: Preferences) => meService.updatePreferences(prefs),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: meKeys.me }),
  });
}

export function useDeleteAccount() {
  return useMutation({ mutationFn: meService.deleteAccount });
}
