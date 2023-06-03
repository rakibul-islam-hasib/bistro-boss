import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && user?.email) {
        setIsLoading(true);
        try {
          const res = await axiosSecure(`/cart?email=${user.email}`);
          setCart(res.data);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // Call fetchData directly inside useEffect

  }, [user, loading, axiosSecure]);

  const refetch = () => {
    fetchData(); // Call fetchData when refetch is triggered
  };

  return [cart, refetch, isLoading];
};

export { useCart };
