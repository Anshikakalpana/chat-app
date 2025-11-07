
import { create } from "zustand";
import { axiosInstance } from "../lib/axios"


export const chatUser = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/getcontacts");
      set({ users: res.data });
    } catch (err) {
      console.log(" Can't fetch users:", err.response?.data || err.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      console.log("Can't fetch messages:", err.response?.data || err.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },


  setSelectedUser: (selectedUser) => set({ selectedUser }),

  sendMessages: async (message) => {
    const { selectedUser, messages } = get(); // ✅ now works
    if (!selectedUser || !selectedUser._id) return;

    try {
      const res = await axiosInstance.post(`/messages/${selectedUser._id}`, message);
      set({ messages: [...messages, res.data] });
      console.log("Message sent successfully");
    } catch (err) {
      console.log("Can't send messages:", err.response?.data || err.message);
    }
  },
}));
