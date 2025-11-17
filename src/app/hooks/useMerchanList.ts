"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MerchantsListData {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

const fetchMerchantsList = async (): Promise<MerchantsListData[]> => {
  try {
    const response = await axios.get("/api/merchants");
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const useMerchantsList = () => {
  return useQuery<MerchantsListData[], Error>({
    queryKey: ["merchants-list"],
    queryFn: async () => {
      const data = await fetchMerchantsList();
      return data;
    },
  });
};
