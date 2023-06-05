import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from "react-query";
import { useQuery } from "@tanstack/react-query"
const useCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const fetchCartData = async () => {
    const res = await axiosSecure(`/cart?email=${user.email}`);
    return res.data;
  };

  const { data: cart = [], isLoading, refetch } = useQuery({queryKey : ['cart'] , queryFn : fetchCartData , enabled : !!user})

  return [cart, refetch, isLoading];
};

export { useCart };
