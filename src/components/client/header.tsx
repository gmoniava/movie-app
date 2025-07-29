"use client";
import Toggle from "@/components/client/theme-toggle";

const Header = ({ toggleSideBar }: any) => {
  return (
    <div className="border-b border-b-gray-300 h-14 flex items-center">
      <div className="cursor-pointer ml-3" onClick={toggleSideBar}>
        <svg
          width="32"
          height="32"
          className="text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="6" width="18" height="2" fill="currentColor" />
          <rect x="3" y="11" width="18" height="2" fill="currentColor" />
          <rect x="3" y="16" width="18" height="2" fill="currentColor" />
        </svg>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <Toggle />
      </div>
    </div>
  );
};

export default Header;
