import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function userUsers() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const axios = useAxios();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data;
    },
  });
}
