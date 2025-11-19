// Header.tsx
"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SideBar from "./Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-[1440px] mx-auto flex items-center p-4">
      <button
        className="text-gray-600"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen && <FiMenu size={24} />}
      </button>

      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Header;
