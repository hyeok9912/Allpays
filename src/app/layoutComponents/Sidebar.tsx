"use client";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-30 z-40 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 left-0 h-screen w-80 bg-white shadow z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
     
        `}
      >
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>
        <Menu className="mt-12">
          <MenuItem>
            <Link href={"#"}>DashBoard</Link>
          </MenuItem>
          <SubMenu label="More">
            <MenuItem>Settings</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </>
  );
};

export default SideBar;
