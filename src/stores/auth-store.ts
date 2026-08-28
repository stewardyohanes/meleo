import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

type AuthState = {
  session: Session | null;
  isReady: boolean;
  setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isReady: false,
  setSession: (session) => set({ session, isReady: true }),
}));
