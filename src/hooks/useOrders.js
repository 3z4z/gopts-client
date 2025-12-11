import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useOrders() {
  const axios = useAxios();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`/orders`);
      return res.data;
    },
  });
}
