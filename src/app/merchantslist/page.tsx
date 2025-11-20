"use client";

import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import { useMerchantsList } from "../hooks/useMerchantsList";

type SortKey = "mchtCode" | "mchtName" | "status" | "bizType";
type SortOrder = "asc" | "desc";
export const statusMap: Record<string, { color: string; label: string }> = {
  INACTIVE: { label: "중지", color: "#FF8042" },
  ACTIVE: { label: "활성", color: "#33CC33" },
  CLOSED: { label: "폐기", color: "#EF4444" },
  READY: { label: "대기", color: "#8884D8" },
};
export const tableHeaders: { key: SortKey; label: string }[] = [
  { key: "mchtCode", label: "가맹점코드" },
  { key: "mchtName", label: "가맹점" },
  { key: "status", label: "상태" },
  { key: "bizType", label: "업종" },
];

const MerchantsList = () => {
  const { data: merchants } = useMerchantsList();
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("mchtName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredAndSorted = useMemo(() => {
    if (!merchants) return [];

    const lowerKeyword = keyword.toLowerCase();

    const filtered = merchants.filter((m) => {
      const statusLabel = statusMap[m.status]?.label.toLowerCase() ?? "";
      return (
        m.mchtName.toLowerCase().includes(lowerKeyword) ||
        m.mchtCode.toLowerCase().includes(lowerKeyword) ||
        m.bizType.toLowerCase().includes(lowerKeyword) ||
        statusLabel.includes(lowerKeyword)
      );
    });

    return [...filtered].sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];

      if (typeof A === "string" && typeof B === "string") {
        return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      }

      return 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchants, keyword, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <section className="w-full px-[12px] flex flex-col gap-4">
      <SearchBar
        keyword={keyword}
        onChange={setKeyword}
        placeholder="가맹점 코드, 가맹점명, 업종, 상태를 입력해주세요."
      />

      <div className="w-full flex flex-col bg-white rounded-[16px] shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="w-full text-lg font-bold p-4 border-b flex items-center gap-3">
          가맹점 리스트
        </h2>

        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  className="cursor-pointer select-none"
                >
                  {header.label}{" "}
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
            {filteredAndSorted.map((merchant) => (
              <tr key={merchant.mchtCode}>
                <td className="text-center border-t-2 py-[4px]">
                  {merchant.mchtCode}
                </td>
                <td className="text-center border-t-2 py-[4px]">
                  <button
                    onClick={() =>
                      window.open(
                        `/merchantslist/${merchant.mchtCode}`,
                        "merchantDetail",
                        "width=500,height=500,top=100,left=100"
                      )
                    }
                    className="text-blue-600 underline cursor-pointer"
                  >
                    {merchant.mchtName}
                  </button>
                </td>
                <td
                  className="text-center border-t-2 py-[4px]"
                  style={{ color: statusMap[merchant.status]?.color }}
                >
                  {statusMap[merchant.status]?.label}
                </td>
                <td className="text-center border-t-2 py-[4px]">
                  {merchant.bizType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MerchantsList;
