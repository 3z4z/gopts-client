import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useProduct({ id }) {
  const axios = useAxios();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}
