import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAdmin = () => {
    const { user } = useContext(AuthContext); 
    const {data : isAdmin , isLoading} = useQuery(['admins'] , async () => { 
        const res = await useAxiosSecure.get(`/user/id-admin/${user?.email}`)
        return res.data
    } )
    return [isAdmin , isLoading]
}

