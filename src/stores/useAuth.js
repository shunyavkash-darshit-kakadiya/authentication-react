import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      id: undefined,
      name: undefined,
      email: undefined,
      await2FA: null,

      login: (info) => {
        set({
          isLoggedIn: true,
          ...info,
        });
      },

      setUserInfo: (info) => {
        set(info);
      },

      logout: () => {
        set({
          isLoggedIn: false,
          id: undefined,
          name: undefined,
          email: undefined,
          await2FA: null,
        });

        // Clear persisted storage
        localStorage.removeItem("auth");
      },
    }),
    { name: "auth" }
  )
);
