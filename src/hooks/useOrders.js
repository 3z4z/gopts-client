import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useOrders({ email }) {
  const axios = useAxios();
  return useQuery({
    queryKey: ["orders", email],
    queryFn: async () => {
      const res = await axios.get("/payment");
      return res.data;
    },
  });
}
