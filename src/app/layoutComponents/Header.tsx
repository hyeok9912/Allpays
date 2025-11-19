// Header.tsx
"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SideBar from "./Sidebar";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full max-w-[1440px] mx-auto flex items-center p-4 gap-4">
      <button
        className="text-gray-600"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen && <FiMenu size={24} />}
      </button>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <p
        className="text-gray-400 font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Allpay for Admin
      </p>
    </div>
  );
};

export default Header;
