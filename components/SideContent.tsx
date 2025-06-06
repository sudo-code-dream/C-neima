import useFetch from "@/hooks/useFetch";
import React from "react";
import Card from "./SideCard";

const SideContent = () => {
  const { data:   nowPlayingData } = useFetch("/movie/now_playing");

  return (
    <aside className='w-full max-w-[30rem] max-h-5 h-full space-y-2 lg:block hidden'>
      <div className='bg-[#0e1525] p-4 rounded-lg block '>
        <div className='flex justify-between items-center mb-4'>
          <h5 className='text-white font-bold'>Top Movies</h5>
          <div className='flex gap-4'>{/* Add Data Filter if Possible */}</div>
        </div>
        <div className='space-y-2 pr-2 w-full'>
          <Card
            data={nowPlayingData}
            heading={"Now Playing"}
            media_type={"movie"}
          />
        </div>
      </div>
    </aside>
  );
};

export default SideContent;
