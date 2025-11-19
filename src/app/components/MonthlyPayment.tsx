import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAllPayMents } from "../hooks/useAllPayMents";
import { useMerchantsList } from "../hooks/useMerchantsList";
import { getTotalAmountByMerchantName } from "../utils/totalpay";
import dayjs from "dayjs";

interface PaymentByCur {
  [currency: string]: number;
}
interface MerchantData {
  merchant: string; // 상점 이름
  payments: PaymentByCur; // KRW, USD 등 금액
}
const MonthlyPayment = () => {
  const { data: payments } = useAllPayMents();
  const { data: merchants } = useMerchantsList();
  const totalByMerchant = getTotalAmountByMerchantName(payments, merchants);

  const rawData = Object.entries(totalByMerchant).flatMap(
    ([merchant, currencyObj]) =>
      Object.entries(currencyObj).flatMap(([currency, dateObj]) =>
        Object.entries(dateObj).map(([date, amount]) => ({
          merchant,
          currency,
          date,
          amount,
        }))
      )
  );

  const oneMonth = dayjs().startOf("month");

  const monthlyData = rawData.filter((item) =>
    dayjs(item.date).isAfter(oneMonth)
  );
  const grouped = monthlyData.reduce((acc, cur) => {
    const { merchant, currency, amount } = cur;

    if (!acc[merchant]) {
      acc[merchant] = { merchant, payments: { [currency]: 0 } };
    }

    if (!acc[merchant].payments[currency]) {
      acc[merchant].payments[currency] = 0;
    }

    acc[merchant].payments[currency] += amount;

    return acc;
  }, {} as Record<string, MerchantData>);

  const chartData = Object.values(grouped)
    .map((m) => ({
      merchant: m.merchant,
      KRW: m.payments.KRW || 0,
      USD: m.payments.USD || 0,
    }))
    .sort((a, b) => b.KRW - a.KRW)
    .slice(0, 10);
  return (
    <div
      className="flex justify-center flex-col items-center gap-[12px] ring-0 outline-none p-[12px] bg-white w-full mx-[24px] rounded-[16px] shadow-md
    "
    >
      <h2 className="flex gap-[12px] flex-col justify-center items-center">
        <p className="font-bold text-lg">월간 거래금액 TOP10(KRW)</p>
        <p className="text-[1.5rem] font-semibold">{oneMonth.format("MM")}월</p>
      </h2>

      <div className="flex gap-[8px]">
        <div className="flex gap-[4px]">
          <p className="min-w-[30px] h-[20px] bg-[#8884d8]"></p>
          <p>KRW</p>
        </div>
        <div className="flex gap-[8px]">
          <p className="min-w-[30px] h-[20px] bg-[#33CC33]"></p>
          <p>USD</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          barCategoryGap="40%"
          className="p-[12px] outline-none focus:outline-none ring-0 border-none"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="merchant" tick={{ fontSize: 12, fontWeight: 700 }} />
          <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
          <Tooltip />
          <Bar
            dataKey="KRW"
            fill="#8884d8"
            barSize={40}
            focusable={false}
            tabIndex={-1}
          />
          <Bar
            dataKey="USD"
            fill="#33CC33"
            barSize={40}
            focusable={false}
            tabIndex={-1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyPayment;
