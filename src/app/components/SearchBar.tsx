import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  keyword: string;
  onChange: (value: string) => void;
}
const SearchBar = ({ keyword, onChange }: SearchBarProps) => {
  return (
    <div className="w-full relative">
      <input
        type="text"
        className="w-full rounded-[8px] min-h-[56px] p-[8px] shadow-md"
        placeholder="가맹점 코드나 가맹점 또는 가맹점 상태를 입력해주세요."
        onChange={(e) => onChange(e.target.value)}
        value={keyword}
      />
      <FiSearch
        size={24}
        className="absolute right-[16px] top-[50%] -translate-y-1/2 cursor-pointer"
        color="#6B7280"
      />
    </div>
  );
};
export default SearchBar;
