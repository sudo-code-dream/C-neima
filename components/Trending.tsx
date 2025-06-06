import React from "react";
import HorizontalScrollCard from "./HorizontalScrollCard";
import { useSelector } from "react-redux";
import useFetch from "@/hooks/useFetch";

const Trending = () => {
  const trendingData = useSelector((state: any) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");

  return (
    <section className='flex gap-3 w-full mt-5 min-h-[26rem] sm:min-h-[32rem] max-h-full'>
      <div className='relative w-full overflow-hidden rounded-lg'>
        <div className='mt-10 gap-x-2 '>
          <HorizontalScrollCard
            data={trendingData}
            heading={"Trending"}
            trending={true}
            media_type='movie'
          />
         <div className="bg-white w-full h-[1px]" />
          <HorizontalScrollCard
            data={nowPlayingData}
            heading={"Now Playing"}
            trending={false}
            media_type='movie'
          />
        </div>
      </div>
    </section>
  );
};

export default Trending;
