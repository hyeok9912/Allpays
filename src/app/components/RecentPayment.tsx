import dayjs from "dayjs";
import { useAllPayMents } from "../hooks/useAllPayMents";
import { mchtCodeByName } from "../utils/paymentByName";
import { useMerchantsList } from "../hooks/useMerchantsList";

const RecentPayment = () => {
  const { data: payments } = useAllPayMents({
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  });
  const { data: merchants } = useMerchantsList({
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  });

  const merchantsNameByCode = mchtCodeByName(payments, merchants);

  const tableRowMap = ["가맹점", "금액", "결제수단", "결제 상태", "결제 시간"];
  const payTypeColor: Record<string, { color: string; label: string }> = {
    VACT: { color: "#00CFFF", label: "가상계좌" },
    MOBILE: { color: "#33CC33", label: "모바일" },
    DEVICE: { color: "#8884D8", label: "단말기" },
    BILLING: { color: "#FF8042", label: "정기결제" },
    ONLINE: { color: "#FFBB28", label: "온라인" },
  };
  const statusColor: Record<string, { color: string; label: string }> = {
    PANDING: { color: "#884D8", label: "결제 대기" },
    SUCCESS: { color: "#33CC33", label: "결제 성공" },
    CANCELLED: { color: "#FF8042", label: "결제 취소" },
    FAILED: { color: "#EF4444", label: "결제 실패" },
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
          <p className="w-[10px] h-[10px] bg-green-600 rounded-full"></p>
          <p className="text-gray-600 text-[0.8rem]">실시간</p>
        </div>
      </h2>

      <table className="w-full ">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {tableRowMap.map((rowData, idx) => (
              <th key={`${idx}_${rowData}`}>{rowData}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {merchantsNameByCode
            ?.sort(
              (a, b) =>
                dayjs(b.paymentAt).valueOf() - dayjs(a.paymentAt).valueOf()
            )
            .slice(0, 30)
            .map((payment) => (
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
