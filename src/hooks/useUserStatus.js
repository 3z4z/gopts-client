import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useAuthStore } from "../stores/useAuthStore";

export default function useUserStatus() {
  const { user } = useAuthStore();
  const axios = useAxios();
  const { isLoading, data: status } = useQuery({
    queryKey: ["user-status", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}/status`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  return { isLoading, status };
}
