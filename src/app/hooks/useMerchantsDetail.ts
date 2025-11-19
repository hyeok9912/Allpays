import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface MerchantsDetailData {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export const useMerchantsDetail = (mchtCode: string | string[]) => {
  return useQuery<MerchantsDetailData, Error>({
    queryKey: ["merchants-detail", mchtCode],
    queryFn: async () => {
      const { data } = await axios.get(`/api/merchants-detail`, {
        params: { mchtCode },
      });
      return data.data;
    },
    enabled: !!mchtCode,
  });
};
