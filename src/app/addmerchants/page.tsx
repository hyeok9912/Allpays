"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddInfo from "../components/AddInfo";
import DaumPostcode from "react-daum-postcode";
import { FiX } from "react-icons/fi";

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
  jibunAddress: string;
  roadAddress: string;
  userSelectedType: string;
}

export interface FormData {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
  bizType: string;
}

const AddMerchants = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      mchtCode: "",
      mchtName: "",
      status: "ACTIVE",
      bizNo: "",
      bizType: "",
      address: "",
      phone: "",
      email: "",
      registeredAt: dayjs().format("YYYY-MM-DD"),
      updatedAt: dayjs().format("YYYY-MM-DD"),
    },
  });

  const {
    formState: { errors },
    setValue,
  } = methods;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);

  const handleComplete = (data: DaumPostcodeData) => {
    setValue("address", data.address);
    setIsOpenAddress(false);
  };

  const onSubmit = async (data: FormData) => {
    // 서버요청 로직
    // 지금은 별도의 정보창으로 대체
    setFormData(data);
    setIsOpenModal(true);
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 px-[24px]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-[1.5rem]">가맹점 등록</h2>

          <input
            type="text"
            {...methods.register("mchtName", {
              required: "상호명을 입력해 주세요.",
            })}
            className="h-[48px] border rounded-md px-[8px]"
            placeholder="상호명(필수)"
          />
          {errors.mchtName && (
            <p className="text-red-500 text-sm">{errors.mchtName.message}</p>
          )}

          <select
            {...methods.register("status")}
            className="h-[48px] border rounded-md px-[8px]"
          >
            <option value="ACTIVE">활성</option>
            <option value="CLOSED">대기</option>
            <option value="INACTIVE">중지</option>
            <option value="READY">폐기</option>
          </select>

          <input
            type="text"
            {...methods.register("bizNo", {
              required: "사업자번호를 입력해주세요.",
              pattern: { value: /^[0-9]*$/, message: "숫자를 입력해 주세요." },
            })}
            className="h-[48px] border rounded-md px-[8px]"
            placeholder="사업자등록번호"
          />

          <input
            type="text"
            {...methods.register("bizType")}
            className="h-[48px] border rounded-md px-[8px]"
            placeholder="업종"
          />

          <div className="flex gap-2">
            <input
              type="text"
              {...methods.register("address")}
              className="h-[48px] border rounded-md px-[8px] flex-1"
              placeholder="주소"
              readOnly
            />
            <button
              type="button"
              className="bg-gray-200 px-4 rounded-md"
              onClick={() => setIsOpenAddress(true)}
            >
              주소검색
            </button>
          </div>

          {isOpenAddress && (
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-30 flex justify-center items-start pt-20">
              <div className="bg-white p-4 rounded shadow-lg w-[400px]">
                <button
                  className="mt-2 px-4 py-2 bg-gray-200 rounded cursor-pointer"
                  onClick={() => setIsOpenAddress(false)}
                >
                  <FiX />
                </button>
                <DaumPostcode onComplete={handleComplete} />
              </div>
            </div>
          )}

          <input
            type="text"
            {...methods.register("phone", {
              required: "전화번호를 입력해 주세요.",
              pattern: { value: /^[0-9]*$/, message: "숫자만 입력해 주세요." },
              maxLength: {
                value: 11,
                message: "전화번호 최대 길이는 11자리 입니다.",
              },
            })}
            className="h-[48px] border rounded-md px-[8px]"
            placeholder="전화번호"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <input
            type="text"
            {...methods.register("email")}
            className="h-[48px] border rounded-md px-[8px]"
            placeholder="이메일"
          />

          <button
            type="submit"
            className="w-full text-white bg-blue-400 py-[10px] rounded-md"
          >
            등록하기
          </button>
        </form>
      </FormProvider>

      {isOpenModal && formData && (
        <AddInfo
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          data={formData}
        />
      )}
    </div>
  );
};

export default AddMerchants;
