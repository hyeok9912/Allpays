"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AllPayMentsData {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

const fetchAllPayMents = async (): Promise<AllPayMentsData[]> => {
  try {
    const response = await axios.get("/api/all-payments");
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const useAllPayMents = ({
  staleTime = 5 * 60 * 1000,
  refetchInterval,
}: {
  staleTime?: number;
  refetchInterval?: number | false;
} = {}) => {
  return useQuery<AllPayMentsData[], Error>({
    queryKey: ["all-payments", staleTime, refetchInterval],
    queryFn: async () => {
      const data = await fetchAllPayMents();
      return data;
    },
    staleTime,
    refetchInterval,
  });
};
