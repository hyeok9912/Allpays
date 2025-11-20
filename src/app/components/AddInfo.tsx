import { FiX } from "react-icons/fi";
import { FormData } from "../addmerchants/page";

interface AddInfoProps {
  isOpen: boolean;
  onClose: () => void;
  data: FormData | null;
}

const statusMap: Record<string, { label: string; color: string }> = {
  INACTIVE: { label: "중지", color: "#FF8042" },
  ACTIVE: { label: "활성", color: "#33CC33" },
  CLOSED: { label: "폐기", color: "#EF4444" },
  READY: { label: "대기", color: "#8884D8" },
};

const AddInfo = ({ isOpen, onClose, data }: AddInfoProps) => {
  if (!isOpen || !data) return null;

  const infoRows = [
    // { label: "가맹점코드", value: data.mchtCode },
    { label: "가맹점명", value: data.mchtName },
    { label: "상태", value: data.status },
    { label: "사업자번호", value: data.bizNo },
    { label: "주소", value: data.address },
    { label: "업종", value: data.bizType },
    { label: "전화번호", value: data.phone },
    { label: "이메일", value: data.email },
    { label: "등록일", value: data.registeredAt },
    { label: "수정일", value: data.updatedAt },
  ];

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 w-96 bg-white shadow-lg rounded-lg z-50 transform -translate-x-1/2 -translate-y-1/2 p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">등록 정보</h2>
          <button onClick={onClose} className="text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        <table className="w-full border-collapse">
          <tbody>
            {infoRows.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="font-semibold py-2 px-2 w-32 bg-gray-50">
                  {row.label}
                </td>
                <td
                  className="py-2 px-2"
                  style={
                    row.label === "상태"
                      ? { color: statusMap[row.value]?.color }
                      : {}
                  }
                >
                  {row.label === "상태"
                    ? statusMap[row.value]?.label || row.value
                    : row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddInfo;
