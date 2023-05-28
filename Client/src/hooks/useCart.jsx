import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const { user } = useContext(AuthContext)
    const { data: cart = [], refetch , isLoading } = useQuery({
        queryKey: ['cart'], queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    return [cart, refetch , isLoading]
}
export { useCart };