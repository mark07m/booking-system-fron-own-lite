import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "@/shared/api/auth.client";
import { authClient } from "@/shared/api/auth.client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
          }),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          }),

        // Check authentication status with server
        checkAuth: async () => {
          set({ isLoading: true });
          try {
            const user = await authClient.getCurrentUser();
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error) {
            // If server returns 401, user is not authenticated
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        },

        // Initialize auth state on app start
        initializeAuth: () => {
          const storedUser = authClient.getStoredUserData();
          if (storedUser) {
            set({ user: storedUser, isAuthenticated: true });
            // Verify with server in background
            get().checkAuth();
          } else {
            // Check with server if no stored user
            get().checkAuth();
          }
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);
