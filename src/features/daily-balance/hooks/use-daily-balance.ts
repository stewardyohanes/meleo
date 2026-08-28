import { useQuery } from "@tanstack/react-query";
import { dailyBalanceService } from "../services/daily-balance.service";

export function useDailyBalance(date: string) {
  return useQuery({
    queryKey: ["daily-balance", date],
    queryFn: () => dailyBalanceService.get(date),
  });
}

export function useWeeklyProgress() {
  return useQuery({ queryKey: ["progress-weekly"], queryFn: dailyBalanceService.weekly });
}
