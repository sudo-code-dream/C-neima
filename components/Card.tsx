import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { TiStar } from "react-icons/ti";
import Link from "next/link";
import { CirclePlay } from "lucide-react";
import slugify from "slugify";

interface CardProps {
  data: any;
  trending?: boolean;
  index: number;
  media_type?: string;
}

const Card = ({ data, trending, index, media_type }: CardProps) => {
  const imageURL = useSelector((state: any) => state.movieoData.imageURL);
  const mediaType = data.media_type ?? media_type;

  const titleSlug = slugify(data.title || data.name, { lower: true });

  return (
    <Link
      href={`/${mediaType}/${titleSlug}/${data.id}`}
      className='w-full min-w-[180px] max-w-[210px] block rounded h-80 overflow-hidden relative hover:scale-105 transition-all group'>
      {" "}
      {/* Added group class */}
      {data?.poster_path ? (
        <img
          src={imageURL + data?.poster_path}
          className='w-full h-full object-cover'
        />
      ) : (
        <div className='bg-neutral-800 h-full w-full justify-center items-center flex'>
          No image available
        </div>
      )}
      {/* Play Icon - Added new div */}
      <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <CirclePlay className='text-blue-500 w-8 h-8' />
      </div>
      <div className='absolute top-4 '>
        {trending && (
          <div className='py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden'>
            #{index} Trending
          </div>
        )}
      </div>
      <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2'>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>
          {data?.title || data?.name}
        </h2>
        <div className='text-sm text-neutral-400 flex justify-between items-center'>
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          <p className='flex items-center justify-center'>
            <TiStar className='text-blue-500' />{" "}
            {Number(data?.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
