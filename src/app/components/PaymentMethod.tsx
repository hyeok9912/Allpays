import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAllPayMents } from "../hooks/useAllPayMents";

const PayMentMethod = () => {
  const { data: payments } = useAllPayMents();
  const paymentCount = payments?.reduce(
    (acc: Record<string, number>, payment) => {
      const type = payment.payType;
      if (!acc[type]) acc[type] = 0;
      acc[type] += 1;

      return acc;
    },
    {}
  );
  const nameMap: Record<string, string> = {
    MOBILE: "모바일",
    DEVICE: "단말기",
    VACT: "가상계좌",
    BILLING: "정기결제",
    ONLINE: "온라인",
  };

  const COLORS = [
    "#8884d8",
    "#33CC33",
    "#FFBB28",
    "#FF8042",
    "#00CFFF",
    "#FF6699",
  ];
  const total = paymentCount
    ? Object.values(paymentCount).reduce((a, b) => a + b, 0)
    : 0;
  const chartData = paymentCount
    ? Object.entries(paymentCount).map(([name, value]) => ({
        name: nameMap[name] || name,
        value: Number(((value / total) * 100).toFixed(2)),
      }))
    : [];

  return (
    <div className="bg-white rounded-[16px] shadow-md p-[12px] max-w-[550px] flex justify-center w-full flex-col">
      <h2 className="flex justify-center font-bold text-[1.5rem]">
        결제 수단 통계
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart className="outline-none focus:outline-none">
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={({ name, value }) => `${name} ${value}%`}
            focusable={false}
            tabIndex={-1}
          >
            {chartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                focusable={false}
                tabIndex={-1}
                className="outline-none focus:outline-none"
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: string) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayMentMethod;
