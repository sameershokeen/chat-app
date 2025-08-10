import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
export const useAuthStore = create((set)=>({
    authUser: null,
    issigningIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,

isCheakingAuth: true,

cheakAuth:async() => {
    try {
        const res = await axiosInstance.get("/auth/check");
        set({authUser:res.data})

    } catch (error) {
        console.error("Error checking authentication:", error);
        set({authUser: null})
    }
    finally{
        set({isCheakingAuth: false})
    }
}

})
);