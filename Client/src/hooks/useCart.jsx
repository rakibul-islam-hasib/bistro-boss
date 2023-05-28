import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const { user } = useContext(AuthContext)
const useCart = () => {
    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ['cart'], queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    return [cart , isLoading, refetch]
}
export { useCart };