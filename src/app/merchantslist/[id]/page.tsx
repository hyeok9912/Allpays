"use client";

import { useMerchantsDetail } from "@/app/hooks/useMerchantsDetail";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const MerchantsDetail = () => {
  const params = useParams();
  const mchtCode = params.id;

  const { data: detailData } = useMerchantsDetail(mchtCode);

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

  const thMap = [
    { label: "가맹점코드", value: detailData?.mchtCode || "" },
    { label: "가맹점", value: detailData?.mchtName || "" },
    {
      label: "상태",
      value: detailData ? statusMap[detailData.status].label : "",
    },
    { label: "업종", value: detailData?.bizType || "" },
    { label: "사업자번호", value: detailData?.bizNo || "" },
    { label: "주소", value: detailData?.address || "" },
    { label: "전화번호", value: detailData?.phone || "" },
    { label: "이메일", value: detailData?.email || "" },
    {
      label: "등록일",
      value: detailData
        ? dayjs(detailData.registeredAt).format("YYYY-MM-DD")
        : "",
    },
    {
      label: "업데이트일",
      value: detailData ? dayjs(detailData.updatedAt).format("YYYY-MM-DD") : "",
    },
  ];

  return (
    <div className="w-full mx-auto px-[12px] py-[8px]">
      <h2 className="font-bold text-[1.5rem] mb-2 ">가맹점 상세 정보</h2>
      <table className="w-full border border-gray-200">
        <tbody>
          {thMap.map((item, idx) => (
            <tr key={idx} className="border-b border-b-gray-300">
              <th className="text-left p-2 bg-gray-100">{item.label}</th>
              <td
                className="text-left p-2"
                // style={{
                //   color:
                //     item.label === "상태" && detailData
                //       ? statusMap[detailData.status].color
                //       : "black",
                // }}
              >
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantsDetail;
