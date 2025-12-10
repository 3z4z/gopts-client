import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useAuthStore } from "../stores/useAuthStore";

export default function useRole() {
  const { user, isAuthLoading, isCookieReady } = useAuthStore();
  const axios = useAxios();
  const { isLoading, data: role = "Buyer" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}/role`);
      return res.data;
    },
    enabled: !isAuthLoading && !!user && isCookieReady,
  });
  return { isLoading, role };
}
