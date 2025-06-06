"use client";
import Divider from "@/components/Divider";
import LoaderUI from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import useFetchDetails from "@/hooks/useFetchDetails";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPlayCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { TiStar } from "react-icons/ti";
import { useSelector } from "react-redux";
import slugify from "slugify";

type DetailsData = {
  backdrop_path?: string;
  // add other properties as needed
};
interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
  department: string;
}

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector(
    (state: any) =>
      state.movieoData.imageURL || "https://image.tmdb.org/t/p/original"
  );
  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return "https://via.placeholder.com/400x600";
    return `${imageURL}${path}`;
  };
  const [isLoading, setIsLoading] = useState(true);
  const { data }: any = useFetchDetails(`${params?.mediaType}/${params?.id}`);
  const { data: castData }: any = useFetchDetails(
    `${params?.mediaType}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `${params?.mediaType}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `${params?.mediaType}/${params?.id}/recommendations`
  );
  const duration = (data?.runtime / 60).toFixed(1).split(".");
  const writer = castData?.crew
    ?.filter((el: CrewMember) => el?.job === "Writer")
    ?.map((el: CrewMember) => el?.name)
    .join(", ");
  useEffect(() => {
    // Wait for imageURL to be available
    if (imageURL) {
      setIsLoading(false);
    }
  }, [imageURL]);

  const mediaType = params?.mediaType;
  const titleSlug = slugify(data?.title || data?.name || "", { lower: true });

  if (isLoading || !data || !castData) {
    return <LoaderUI />;
  }
  return (
    <div key={data?.id}>
      <div className='w-full h-[400px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            className='h-full object-cover w-full'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>
      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className=' relative lg:-mt-28 mx-auto lg:ml-0 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='h-80 object-cover w-60 rounded'
          />
        </div>

        <div>
          <div className='w-full flex justify-between items-center '>
            <h2 className='text-2xl lg:text-4xl font-bold text-white'>
              {data?.title || data?.name}
            </h2>
            <Link href={`/watch-${mediaType}/${titleSlug}/${data.id}`}>
              <button className='flex items-center justify-center text-white text-xl bg-red-600 rounded-xl p-2 m-3 hover:scale-105 transition-all'>
                <BiPlayCircle /> Play Now
              </button>
            </Link>
          </div>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p className='flex items-center gap-1'>
              <TiStar className='text-blue-500' />{" "}
              {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p className='flex items-center gap-1'>
              <FaEye className='text-white' /> {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m{" "}
            </p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>

          <div>
            <p>
              <span className='text-white'>Director</span> :{" "}
              {castData?.crew[0]?.name}{" "}
            </p>
            <Divider />

            <p>
              <span className='text-white'>Writer : {writer} </span>
            </p>
          </div>

          <Divider />

          <h2 className='font-bold text-lg'>Cast :</h2>

          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {castData?.cast
              ?.filter((el: any) => el?.profile_path)
              .map((starCast: any, index: number) => {
                return (
                  <div key={index}>
                    <div>
                      <img
                        src={imageURL + starCast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm'>
                      {starCast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
