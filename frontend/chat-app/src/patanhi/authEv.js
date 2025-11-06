import {create } from "zustand"
import { axiosInstance } from "../lib/axios"
export const authcheck = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isRefreshing: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
    } catch (err) {
      console.log("Can't signup", err.response?.data || err.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout : async()=>{
try{
  await axiosInstance.post("/auth/logout");
  set({authUser:null});
} catch(err){
  console.log("Can't logout", err.response?.data || err.message);
  }
},

loginemail: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login/email", data);
      set({ authUser: res.data });
    } catch (err) {
      console.log("Can't login", err.response?.data || err.message);
    } finally {
      set({ isLogging: false });
    }
  },

  loginnumber: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login/number", data);
      set({ authUser: res.data });
    } catch (err) {
      console.log("Can't login", err.response?.data || err.message);
    } finally {
      set({ isLogging: false });
    }
  },

updateProfile: async (data) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update", data);
    set({ authUser: res.data });
    alert("Profile updated successfully");
  } catch (err) {
    console.log("Can't update profile", err.response?.data || err.message);
  } finally {
    set({ isUpdatingProfile: false });
  }
},

}));
