"use client";
import React, { useEffect, useState } from "react";
import SideContent from "./SideContent";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import LoaderUI from "./Loader";

const HomeMainContent = () => {
  const bannerData = useSelector((state: any) => state.movieoData.bannerData);
  const imageURL = useSelector((state: any) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % bannerData.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  useEffect(() => {
    // Only start the interval if we have banner data
    if (bannerData.length === 0) return;

    const interval = setInterval(handleNext, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [bannerData.length]);

  if (!bannerData || !imageURL) {
    return <LoaderUI />;
  }

  return (
    <section className='flex gap-4 w-full min-h-[26rem] sm:min-h-[32rem] max-h-[36rem]'>
      <div className='relative w-full overflow-hidden rounded-lg'>
        {bannerData.map((data: any, index: number) => (
          <div
            key={data.id + "bannerHome" + index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out bg-center bg-zinc-900 bg-no-repeat sm:bg-center bg-cover flex items-end p-6 sm:p-12 bg-gradient-dark-bottom-left ${
              index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${imageURL + data.backdrop_path})`,
            }}>
            <button
              onClick={handleNext}
              className='absolute top-1/2 left-0 hidden md:block transform -translate-y-1/2 z-30 px-4 py-20 text-white bg-black/50 hover:bg-black/70 cursor-pointer'>
              {"<"}
            </button>
            <button
              onClick={handlePrev}
              className='absolute top-1/2 right-0 hidden md:block transform -translate-y-1/2 z-30 px-4 py-20 text-white bg-black/50 hover:bg-black/70 cursor-pointer'>
              {">"}
            </button>
            <div className='z-10 space-y-4'>
              <p className='text-amber-200'>
                Rating : {Number(data.vote_average).toFixed(1)}
              </p>
              <h1 className='font-black text-white text-2xl sm:text-4xl w-[90%] sm:w-[70%] line-clamp-5 sm:line-clamp-none'>
                {data.title || data.name}
              </h1>
              <p className='line-clamp-3 text-ellipsis w-full sm:w-[70%] text-white'>
                {data.overview}
              </p>
              <div className='space-x-4'>
                <Button
                  variant='ghost'
                  className='text-sm bg-slate-900/90   hover:text-white transition-all duration-300 hover:bg-blue-700/80  hover:opacity-90 ml-2'>
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SideContent />
    </section>
  );
};

export default HomeMainContent;
