import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useCategories() {
  const axios = useAxios();
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/categories");
      return res.data;
    },
  });
}
