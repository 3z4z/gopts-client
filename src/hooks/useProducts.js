import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useProducts({ search, category, fields, sort, time }) {
  const axios = useAxios();
  return useQuery({
    queryKey: ["products", search, category, fields, sort, time],
    queryFn: async () => {
      const res = await axios.get(
        `/products?category=${category}&search=${search}&fields=${fields}&sort=${sort}&time=${time}`
      );
      return res.data;
    },
  });
}
