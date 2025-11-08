import {create } from "zustand"
import { axiosInstance } from "../lib/axios"
import { io } from "socket.io-client";
export const authcheck = create((set,get ) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isRefreshing: true,
  socket: null,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (err) {
      set({ authUser: null });
    }finally{
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
      console.log("Can't signup", err.response?.data || err.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout : async()=>{
try{
  await axiosInstance.post("/auth/logout");
  set({authUser:null});
  get().disconnectSocket();
} catch(err){
  console.log("Can't logout", err.response?.data || err.message);
  }
},

loginemail: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login/email", data);
      set({ authUser: res.data.user });
      get().connectSocket();
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
      set({ authUser: res.data.user });
       get().connectSocket();
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
    set({ authUser: res.data.user });
    alert("Profile updated successfully");
  } catch (err) {
    console.log("Can't update profile", err.response?.data || err.message);
  } finally {
    set({ isUpdatingProfile: false });
  }
},
connectSocket:()=>{
  const {authUser}= get();
  if(!authUser || get().socket?.connected) return;
  const socket = io("http://localhost:3000" ,{
    query: { userId: authUser._id },

  });
  socket.connect();
  set({ socket:socket });
  socket.on("online-users", (users)=>{
    set({onlineUsers:users});
  });
},
disconnectSocket:()=>{
   if(get().socket?.connected) get().socket.disconnect();
   set({socket:null})


}
}));
