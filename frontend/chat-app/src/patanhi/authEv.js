
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

export const authcheck = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningUp: false,
      isLogging: false,
      isUpdatingProfile: false,
      isRefreshing: true,
      socket: null,
      onlineUsers: [],

   checkAuth: async () => {
  try {
    const res = await axiosInstance.get("/auth/checkuser", {
      withCredentials: true,
    });
    if (res.data?.user) {
      set({ authUser: res.data.user });
      if (!get().socket) get().connectSocket();
    }
  } catch (err) {
    console.log("Auth check failed:", err.response?.data || err.message);
   
  } finally {
    set({ isRefreshing: false });
  }
},


      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/register", data);
          set({ authUser: res.data.user });
          get().connectSocket();
        } catch (err) {
          console.log("Can't signup:", err.response?.data || err.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

      loginemail: async (data) => {
        set({ isLogging: true });
        try {
          const res = await axiosInstance.post("/auth/login/email", data);
          set({ authUser: res.data.user });
          get().connectSocket();
        } catch (err) {
          console.log("Can't login:", err.response?.data || err.message);
        } finally {
          set({ isLogging: false });
        }
      },

      loginnumber: async (data) => {
        set({ isLogging: true });
        try {
          const res = await axiosInstance.post("/auth/login/number", data);
          set({ authUser: res.data.user });
          get().connectSocket();
        } catch (err) {
          console.log("Can't login:", err.response?.data || err.message);
        } finally {
          set({ isLogging: false });
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update", data);
          set({ authUser: res.data.user });
          alert("Profile updated successfully");
        } catch (err) {
          console.log("Can't update profile:", err.response?.data || err.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          get().disconnectSocket();
          localStorage.removeItem("auth-storage");
          set({ authUser: null });
        } catch (err) {
          console.log("Can't logout:", err.response?.data || err.message);
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io("http://localhost:3000", {
          query: { userId: authUser._id },
          transports: ["websocket"], 
        });

        socket.on("connect", () => console.log(" Socket connected"));
        socket.on("disconnect", () => console.log(" Socket disconnected"));
        socket.on("online-users", (users) => set({ onlineUsers: users }));

        set({ socket });
      },

      disconnectSocket: () => {
        const s = get().socket;
        if (s?.connected) s.disconnect();
        set({ socket: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        authUser: state.authUser,
      }),
     onRehydrateStorage: () => (state) => {
 
  setTimeout(async () => {
    const user = get().authUser;
    if (user) {
      console.log(" Rehydrated user:", user);
      get().connectSocket();

   
      setTimeout(() => {
        get().checkAuth();
      }, 300);
    } else {
      console.log(" No user found in storage");
      set({ isRefreshing: false });
    }
  }, 300);
},

    }
  )
);
