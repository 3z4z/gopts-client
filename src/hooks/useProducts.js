import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export default function useProducts({
  search,
  featured,
  category,
  fields,
  sort,
  time,
  skip,
  limit,
  payMethod,
}) {
  return useQuery({
    queryKey: [
      "products",
      featured,
      search,
      category,
      fields,
      sort,
      time,
      skip,
      limit,
      payMethod,
    ],
    queryFn: async () => {
      const query = {
        search,
        featured,
        category,
        fields,
        sort,
        time,
        skip,
        limit,
        payMethod,
      };
      const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      );
      const params = new URLSearchParams(filteredQuery);

      const res = await axiosInstance.get(`/products?${params.toString()}`);
      return res.data;
    },
  });
}
