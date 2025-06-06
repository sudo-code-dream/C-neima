import HomeMainContent from "@/components/HomeMainContent";
import Navbar from "@/components/Navbar";
import SideContent from "@/components/SideContent";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-[1366px] px-4 mx-auto relative'>
      <Navbar />
      
      {children}
    </div>
  );
};

export default Layout;
