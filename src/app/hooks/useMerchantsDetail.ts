"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MerchantsDetailData {
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

const fetchMerchantsDetail = async (): Promise<MerchantsDetailData[]> => {
  try {
    const response = await axios.get("/api/merchants-detail");
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const useMerchantsDetail = () => {
  return useQuery<MerchantsDetailData[], Error>({
    queryKey: ["merchants-detail"],
    queryFn: async () => {
      const data = await fetchMerchantsDetail();
      return data;
    },
  });
};
