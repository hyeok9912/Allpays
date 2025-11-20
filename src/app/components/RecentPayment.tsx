"use client";
import dayjs from "dayjs";
import { useAllPayMents } from "../hooks/useAllPayMents";
import { mchtCodeByName } from "../utils/paymentByName";
import { useMerchantsList } from "../hooks/useMerchantsList";
import { useRouter } from "next/navigation";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useHealthCheck } from "../hooks/useHealthCheck";
import { useMemo, useState } from "react";
import { SortKey, sortPayments } from "../utils/sortPayment";
export const tableHeaders: { key: SortKey; label: string }[] = [
  { key: "mchtName", label: "가맹점" },
  { key: "amount", label: "금액" },
  { key: "payType", label: "결제수단" },
  { key: "status", label: "결제 상태" },
  { key: "paymentAt", label: "결제 시간" },
];
export const payTypeColor: Record<string, { color: string; label: string }> = {
  VACT: { color: "#00CFFF", label: "가상계좌" },
  MOBILE: { color: "#33CC33", label: "모바일" },
  DEVICE: { color: "#8884D8", label: "단말기" },
  BILLING: { color: "#FF8042", label: "정기결제" },
  ONLINE: { color: "#FFBB28", label: "온라인" },
};
export const statusColor: Record<string, { color: string; label: string }> = {
  PANDING: { color: "#884D8", label: "결제 대기" },
  SUCCESS: { color: "#33CC33", label: "결제 성공" },
  CANCELLED: { color: "#FF8042", label: "결제 취소" },
  FAILED: { color: "#EF4444", label: "결제 실패" },
};

const RecentPayment = () => {
  const { data: payments } = useAllPayMents({
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  });
  const { data: merchants } = useMerchantsList({
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  });

  const [sortKey, setSortKey] = useState<SortKey>("paymentAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const merchantsNameByCode = mchtCodeByName(payments, merchants);
  const { data: health } = useHealthCheck();
  const router = useRouter();

  const sortedPayments = useMemo(() => {
    if (!merchantsNameByCode) return [];
    return sortPayments(merchantsNameByCode, sortKey, sortOrder);
  }, [merchantsNameByCode, sortKey, sortOrder]);
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  return (
    <div className="w-full flex flex-col bg-white rounded-[16px] shadow-md max-h-[448px] overflow-y-auto">
      <h2 className="w-full text-lg font-bold p-4 border-b flex items-center gap-3">
        최신 거래 리스트(30건)
        <div
          className="flex
         items-center
         translate-y-[10%]
         gap-1"
        >
          <p
            className={`w-[10px] h-[10px] ${
              health === "OK" ? "bg-green-600" : "bg-[#EF4444]"
            } rounded-full`}
          ></p>
          <p className="text-gray-600 text-[0.8rem]">
            {health === "OK" ? "실시간" : "지연"}
          </p>
        </div>
        <div className="ml-auto flex gap-1">
          <p
            className=" text-blue-400 font-normal cursor-pointer text-[1rem]"
            onClick={() => router.push("/paymentlist")}
          >
            Show more
          </p>
          <p className="flex justify-center items-center">
            <AiOutlineInfoCircle className="w-5 h-5  cursor-pointer text-blue-400" />
          </p>
        </div>
      </h2>

      <table className="w-full ">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                onClick={() => handleSort(header.key)}
                className="cursor-pointer select-none"
              >
                {header.label}
                {sortKey === header.key
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : "▴▾"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPayments.slice(0, 30).map((payment) => (
            <tr key={payment.paymentCode} className="">
              <td className="text-center border-t-2 py-[4px]">
                {payment.mchtName}
              </td>
              <td className="text-center border-t-2 py-[4px]">
                {payment.amount}({payment.currency})
              </td>
              <td
                className="text-center border-t-2 py-[4px]"
                style={{
                  color: payTypeColor[payment.payType].color || "black",
                }}
              >
                {payTypeColor[payment.payType]?.label || payment.payType}
              </td>
              <td
                className="text-center border-t-2 py-[4px]"
                style={{
                  color: statusColor[payment.status].color || "black",
                }}
              >
                {statusColor[payment.status]?.label || payment.status}
              </td>
              <td className="text-center border-t-2 py-[4px]">
                {dayjs(payment.paymentAt).format("YYYY-MM-DD / HH:mm:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RecentPayment;
