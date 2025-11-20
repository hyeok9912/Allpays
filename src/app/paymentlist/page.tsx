"use client";

import dayjs from "dayjs";
import { useAllPayMents } from "../hooks/useAllPayMents";
import { mchtCodeByName } from "../utils/paymentByName";
import { useMerchantsList } from "../hooks/useMerchantsList";
import SearchBar from "../components/SearchBar";
import { useMemo, useState } from "react";
import { SortKey, sortPayments } from "../utils/sortPayment";
import {
  payTypeColor,
  statusColor,
  tableHeaders,
} from "../components/RecentPayment";

const PaymentList = () => {
  const { data: payments } = useAllPayMents();
  const { data: merchants } = useMerchantsList();
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("paymentAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const merchantsNameByCode = mchtCodeByName(payments, merchants);

  const sortedPayments = useMemo(() => {
    if (!merchantsNameByCode) return [];

    const lowerKeyword = keyword.toLowerCase();

    const filtered = merchantsNameByCode.filter((m) => {
      const payTypeLabel = payTypeColor[m.payType]?.label.toLowerCase() ?? "";
      const statusLabel = statusColor[m.status]?.label.toLowerCase() ?? "";

      return (
        m.mchtName.toLowerCase().includes(lowerKeyword) ||
        m.mchtCode.toLowerCase().includes(lowerKeyword) ||
        m.currency.toLowerCase().includes(lowerKeyword) ||
        payTypeLabel.includes(lowerKeyword) ||
        statusLabel.includes(lowerKeyword)
      );
    });

    return sortPayments(filtered, sortKey, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantsNameByCode, sortKey, sortOrder, keyword]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="flex flex-col gap-4 px-[12px]">
      <section className="w-full">
        <SearchBar
          keyword={keyword}
          onChange={setKeyword}
          placeholder="가맹점 또는 결제수단, 결제상태, 결제시간을 입력해주세요."
        />
      </section>
      <div className="w-full flex flex-col bg-white rounded-[16px] shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="w-full text-lg font-bold p-4 border-b flex items-center gap-3">
          최신 거래 리스트
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
            {sortedPayments.map((payment) => (
              <tr key={payment.paymentCode}>
                <td className="text-center border-t-2 py-[4px]">
                  {payment.mchtName}
                </td>
                <td className="text-center border-t-2 py-[4px]">
                  {payment.amount}({payment.currency})
                </td>
                <td
                  className="text-center border-t-2 py-[4px]"
                  style={{
                    color: payTypeColor[payment.payType]?.color || "black",
                  }}
                >
                  {payTypeColor[payment.payType]?.label || payment.payType}
                </td>
                <td
                  className="text-center border-t-2 py-[4px]"
                  style={{
                    color: statusColor[payment.status]?.color || "black",
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
    </div>
  );
};

export default PaymentList;
