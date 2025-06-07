"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { BsPlayFill } from "react-icons/bs";

interface MovieData {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  profile_path?: string;
  first_air_date?: string;
  release_date?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  genres?: string[];
}

interface DataProps {
  data: MovieData[]; //need i desctructure kay array
  heading: string;
  media_type: string; //movie or tv
}

const Card = ({ data, heading, media_type }: DataProps) => {
  const imageURL = useSelector((state: any) => state.movieoData.imageURL);
  const limitData = data.slice(0, 3); //limits to 4 items only

  return limitData.map((item: any, index: number) => (
    <a
      href={`${media_type}/${item?.name || item?.title}/${item.id}`}
      key={item.id + index}
      className='flex gap-2 hover:bg-white/10 p-2 rounded-md transition-colors'>
      <img
        src={`${imageURL}${item.poster_path || item.profile_path}`}
        className='w-24 h-[7.9rem] object-cover rounded bg-neutral-800'
        alt={item.title || item.name}
      />

      <div className='flex items-center justify-between w-full gap-4'>
        <div className='space-y-3'>
          <h5 className='text-white font-medium  line-clamp-2'>
            {item.title || item.name}
          </h5>
          <p className='line-clamp-2 text-sm'>{item.overview}</p>
          <Button
            variant={"outline"}
            className='relative hover:text-blue-500 hover:opacity-80 '>
            <BsPlayFill />
            Watch Now
          </Button>
        </div>
        <h5 className='text-white border px-4 py-2 rounded-md'>{index + 1}</h5>
      </div>
    </a>
  ));
};

export default Card;
