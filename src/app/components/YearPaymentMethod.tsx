"use client";
import React from "react";
import dayjs from "dayjs";
import { useAllPayMents } from "../hooks/useAllPayMents";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#33CC33",
  "#FFBB28",
  "#FF8042",
  "#00CFFF",
  "#FF6699",
];
const nameMap: Record<string, string> = {
  MOBILE: "모바일",
  DEVICE: "단말기",
  VACT: "가상계좌",
  BILLING: "정기결제",
  ONLINE: "온라인",
};

interface MonthlyData {
  month: string;
  [payType: string]: number | string;
}

const YearPaymentMethodChart = () => {
  const { data: payments } = useAllPayMents();
  const currentYear = dayjs().year();

  // 결제 방식 추출
  const methods = Array.from(new Set(payments?.map((p) => p.payType) ?? []));

  // 1~12월 초기 데이터
  const monthlyData: MonthlyData[] = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");
    const obj: MonthlyData = { month };

    methods.forEach((payType) => {
      obj[payType] = 0;
    });
    return obj;
  });

  payments?.forEach((p) => {
    const date = dayjs(p.paymentAt);
    if (date.year() === currentYear) {
      const month = String(date.month() + 1).padStart(2, "0");
      const entry = monthlyData.find((d) => d.month === month);
      if (entry) {
        entry[p.payType] = (entry[p.payType] as number) + 1;
      }
    }
  });

  return (
    <div className="bg-white rounded-[16px] shadow-md p-4 w-full">
      <h2 className="text-lg font-bold mb-4">
        {currentYear}년 결제 방식 월별 동향
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              `${value.toLocaleString()} 건`,
              nameMap[name as string] ?? name,
            ]}
          />
          <Legend formatter={(value) => nameMap[value] ?? value} />
          {methods.map((payType, idx) => (
            <Line
              key={payType}
              type="monotone"
              dataKey={payType}
              stroke={COLORS[idx % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearPaymentMethodChart;
