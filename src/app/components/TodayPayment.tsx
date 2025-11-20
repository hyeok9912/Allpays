import dayjs from "dayjs";
import { MdAttachMoney } from "react-icons/md";
import { useAllPayMents } from "../hooks/useAllPayMents";

const TodayPayment = () => {
  const { data: payments } = useAllPayMents();
  const today = dayjs().format("YYYY-MM-DD");
  const yesterDay = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const todayPayment = payments?.filter((payment) =>
    dayjs(payment.paymentAt).isSame(today, "day")
  );

  const yesterDayPayment = payments?.filter((payment) =>
    dayjs(payment.paymentAt).isSame(yesterDay, "day")
  );
  const totalYesterDay =
    yesterDayPayment?.reduce((acc, cur) => acc + Number(cur.amount), 0) ?? 0;

  const totalToday =
    todayPayment?.reduce((acc, cur) => acc + Number(cur.amount), 0) ?? 0;
  const minusYesterDayAmount = totalToday - totalYesterDay;
  return (
    <div className="w-[calc(25%-8px)] bg-white h-[150px] rounded-[12px] shadow-md">
      <div className="h-[10px] bg-lime-500 w-full rounded-t-[12px]" />
      <div className="flex px-[1rem] items-center justify-center h-full gap-5">
        <div className="bg-lime-500 p-[12px] rounded-full">
          <MdAttachMoney size={24} color="white" />
        </div>
        <div className="flex-col justify-start items-start w-full ">
          <p className="font-sans text-gray-500">금일 결제 금액</p>
          <p className="font-bold text-[2rem]">
            {totalToday.toLocaleString()}KRW
          </p>
          <p
            className={`${
              minusYesterDayAmount >= 0 ? "text-red-500" : "text-blue-600"
            }`}
          >
            {minusYesterDayAmount >= 0 ? "+" : ""}
            {minusYesterDayAmount.toLocaleString()}KRW
          </p>
        </div>
      </div>
    </div>
  );
};
export default TodayPayment;
