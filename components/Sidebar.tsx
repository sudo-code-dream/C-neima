import { X } from "lucide-react";
import React from "react";

interface SidebarProps {
  showSidebar: boolean;
  onClose: () => void;
}

const Sidebar = ({ showSidebar, onClose }: SidebarProps) => (
  <div className='fixed inset-0 z-[999] pointer-events-none'>
    {/* Overlay */}
    <div
      onClick={onClose}
      className={`
        absolute inset-0 bg-neutral-900/70
        transition-opacity duration-500
        ${showSidebar ? "opacity-100 pointer-events-auto" : "opacity-0"}
      `}
    />
    {/* Sidebar */}
    <div
      className={`
        absolute left-0 top-0 h-full w-72 bg-neutral-800/95 p-4 shadow-xl
        transform transition-transform duration-700 ease-in-out
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        pointer-events-auto
      `}>
      <header className='text-white mb-4'>
        <button
          onClick={onClose}
          className='bg-neutral-600 py-3 px-5 rounded-full cursor-pointer 
            transition-colors hover:bg-neutral-500 active:bg-neutral-300'>
          <X />
        </button>
      </header>
      {/* Add your sidebar content here */}
    </div>
  </div>
);

export default Sidebar;
