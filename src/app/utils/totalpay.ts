import dayjs from "dayjs";
import { AllPayMentsData } from "../hooks/useAllPayMents";
import { MerchantsListData } from "../hooks/useMerchantsList";
interface TotalByCurrency {
  [currency: string]: {
    [paymentAt: string]: number;
  };
}

export const getTotalAmountByMerchantName = (
  payments?: AllPayMentsData[],
  merchants?: MerchantsListData[]
): Record<string, TotalByCurrency> => {
  const totals: Record<string, TotalByCurrency> = {};
  if (!payments || !merchants) return totals;

  const merchantMap: Record<string, string> = {};
  merchants.forEach((m) => {
    merchantMap[m.mchtCode] = m.mchtName;
  });

  payments.forEach((payment) => {
    if (payment.status === "SUCCESS") {
      const name = merchantMap[payment.mchtCode] || "정보없음";
      const currency = payment.currency;
      const amount = parseFloat(payment.amount);
      const date = dayjs(payment.paymentAt).format("YYYY-MM-DD");
      if (!totals[name]) totals[name] = {};
      if (!totals[name][currency]) totals[name][currency] = {};
      if (!totals[name][currency][date]) totals[name][currency][date] = 0;

      totals[name][currency][date] += amount;
    }
  });
  return totals;
};

// 결제 단위가 다를경우 따로 계산해야함
// 토탈스의 인터페이스 구성 필요
// 월간 거래금액 / 화폐 단위
