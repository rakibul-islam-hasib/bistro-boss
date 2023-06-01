import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: cart = [], refetch, isLoading } = useQuery({
        queryKey: ['cart'], queryFn: async () => {
            const res = await axiosSecure.get(`/cart?email=${user?.email}`);
            return res.data;
        }
    })
    return [cart, refetch, isLoading]
}
export { useCart };