import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useHealthCheck = () => {
  return useQuery<string, Error>({
    queryKey: ["health"],
    queryFn: async () => {
      const { data } = await axios.get("/api/health");
      return data;
    },
  });
};
