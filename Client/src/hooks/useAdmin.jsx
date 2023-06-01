import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user , loader} = useContext(AuthContext); 
    const {data : isAdmin , isLoading} = useQuery({
        queryKey : ['admins' , user?.email] , 
        enabled:!!user?.email && !!localStorage.getItem("token"),
        queryFn : async () => { 
       
        if (user?.email) {
            const res = await axiosSecure.get(`/user/id-admin/${user?.email}`);
            return res.data.isAdmin;
        }
        
       
    }} )
    if (isLoading || !user?.email || loader) {
        return [false , true]
    }
    return [isAdmin , isLoading]
}

