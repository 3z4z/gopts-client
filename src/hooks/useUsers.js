import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useUsers({ role, search }) {
  const axios = useAxios();
  return useQuery({
    queryKey: ["users", role, search],
    queryFn: async () => {
      const res = await axios.get(
        `/users?role=${role || ""}&search=${search || ""}`
      );
      return res.data;
    },
  });
}
