import { AllPayMentsData } from "../hooks/useAllPayMents";
import { MerchantsListData } from "../hooks/useMerchantsList";

export function mchtCodeByName(
  payment: AllPayMentsData[] | undefined,
  merchants: MerchantsListData[] | undefined
): (AllPayMentsData & { mchtName: string })[] {
  const merchantMap: Record<string, string> = {};
  (merchants || []).forEach((m) => {
    merchantMap[m.mchtCode] = m.mchtName;
  });

  return (payment || []).map((p) => ({
    ...p,
    mchtName: merchantMap[p.mchtCode] || "정보없음",
  }));
}
