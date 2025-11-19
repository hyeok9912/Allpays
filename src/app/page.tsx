"use client";

import MonthlyPayment from "./components/MonthlyPayment";
import PayMentMethod from "./components/PaymentMethod";
import TodayPayment from "./components/TodayPayment";
import TodayTransaction from "./components/TodayTransaction";
import TodayCancelPayment from "./components/TodayCancelPayment";
import TodayRefund from "./components/TodayRefund";
import YearPaymentMethodChart from "./components/YearPaymentMethod";
import RecentPayment from "./components/RecentPayment";

export default function Home() {
  return (
    <div className="w-full flex justify-center  flex-col gap-2 items-center p-[12px] relative">
      <section className="w-full flex gap-[10px] ">
        <TodayPayment />
        <TodayTransaction />
        <TodayCancelPayment />
        <TodayRefund />
      </section>
      <section className="w-full flex justify-between gap-[10px]">
        <YearPaymentMethodChart />
        <PayMentMethod />
      </section>
      <MonthlyPayment />
      <RecentPayment />
    </div>
  );
}
