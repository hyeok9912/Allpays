"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useMerchantsList } from "../hooks/useMerchantsList";

const MerchantsList = () => {
  const { data: merchants } = useMerchantsList();
  const [keyword, setKeyword] = useState("");
  const tableRowMap = ["가맹점코드", "가맹점", "상태", "업종"];
  const statusMap: Record<
    string,
    {
      color: string;
      label: string;
    }
  > = {
    INACTIVE: {
      label: "중지",
      color: "#FF8042",
    },
    ACTIVE: {
      label: "활성",
      color: "#33CC33",
    },
    CLOSED: {
      label: "폐기",
      color: "#EF4444",
    },
    READY: {
      label: "대기",
      color: "#8884D8",
    },
  };
  const filteredMerchants = merchants?.filter((m) => {
    const lower = keyword.toLowerCase();

    const statusLabel = statusMap[m.status]?.label.toLowerCase() ?? "";

    return (
      m.mchtName.toLowerCase().includes(lower) ||
      m.mchtCode.toLowerCase().includes(lower) ||
      m.status.toLowerCase().includes(lower) ||
      statusLabel.includes(lower) ||
      m.bizType.toLowerCase().includes(lower)
    );
  });

  return (
    <section className="w-full px-[12px] flex flex-col gap-4">
      <section className="w-full">
        <SearchBar keyword={keyword} onChange={setKeyword} />
      </section>
      <section className="w-full flex flex-col bg-white rounded-[16px] shadow-md max-h-[80vh] overflow-y-auto">
        <h2 className="w-full text-lg font-bold p-4 border-b flex items-center gap-3">
          가맹점 리스트
          <div
            className="flex
           items-center
           translate-y-[10%]
           gap-1"
          ></div>
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
            {filteredMerchants?.length
              ? filteredMerchants
                  ?.sort((a, b) => a.mchtName.localeCompare(b.mchtName))
                  .map((merchant) => (
                    <tr key={merchant.mchtCode} className="">
                      <td className="text-center border-t-2 py-[4px]">
                        {merchant.mchtCode}
                      </td>
                      <td className="text-center border-t-2 py-[4px]">
                        <button
                          onClick={() => {
                            window.open(
                              `/merchantslist/${merchant.mchtCode}`,
                              "merchantDetail",
                              "width=500,height=700,top=100,left=100"
                            );
                          }}
                          className="text-blue-600 underline cursor-pointer"
                        >
                          {merchant.mchtName}
                        </button>
                      </td>
                      <td
                        className="text-center border-t-2 py-[4px]"
                        style={{
                          color: statusMap[merchant.status].color,
                        }}
                      >
                        {statusMap[merchant.status].label}
                      </td>
                      <td className="text-center border-t-2 py-[4px]">
                        {merchant.bizType}
                      </td>
                    </tr>
                  ))
              : merchants
                  ?.sort((a, b) => a.mchtName.localeCompare(b.mchtName))
                  .map((merchant) => (
                    <tr key={merchant.mchtCode} className="">
                      <td className="text-center border-t-2 py-[4px]">
                        {merchant.mchtCode}
                      </td>
                      <td className="text-center border-t-2 py-[4px]">
                        <button
                          onClick={() => {
                            window.open(
                              `/merchantslist/${merchant.mchtCode}`,
                              "merchantDetail",
                              "width=500,height=700,top=100,left=100"
                            );
                          }}
                          className="text-blue-600 underline cursor-pointer"
                        >
                          {merchant.mchtName}
                        </button>
                      </td>
                      <td
                        className="text-center border-t-2 py-[4px]"
                        style={{
                          color: statusMap[merchant.status].color,
                        }}
                      >
                        {statusMap[merchant.status].label}
                      </td>
                      <td className="text-center border-t-2 py-[4px]">
                        {merchant.bizType}
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default MerchantsList;
