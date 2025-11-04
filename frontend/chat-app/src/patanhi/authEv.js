import {create } from "zustand"
import { axiosInstance } from "../lib/axios"
export const authcheck= create((set)=>({
    authUser: null,
    isSigningUp:false,
      isLogging:false,
        iUpdatingProfile:false,
          isRefreshing:true,

          checkAuth:async()=>{
            try{
                const res= await axiosInstance.get("/auth/checkuser");
                set({authUser : res.data})
            }catch(err){
            set({authUser:null})
          }
          }
}))

