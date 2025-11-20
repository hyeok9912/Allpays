import dayjs from "dayjs";
import { AllPayMentsData } from "../hooks/useAllPayMents";

export type SortOrder = "asc" | "desc";
export type SortKey =
  | "mchtName"
  | "amount"
  | "payType"
  | "status"
  | "paymentAt";

export interface PaymentWithName extends AllPayMentsData {
  mchtName: string;
}

export const sortPayments = (
  data: PaymentWithName[],
  sortKey: SortKey,
  sortOrder: SortOrder
) => {
  return [...data].sort((a, b) => {
    let A: string | number = a[sortKey];
    let B: string | number = b[sortKey];

    if (sortKey === "paymentAt") {
      A = dayjs(A).valueOf();
      B = dayjs(B).valueOf();
    }

    if (sortKey === "amount") {
      A = Number(A);
      B = Number(B);
    }

    if (A < B) return sortOrder === "asc" ? -1 : 1;
    if (A > B) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};
