"use client";
import { Button } from "@/components/ui/button";
import { HERO_DESCRIPTION } from "@/constants/hero";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = () => {
    window.location.href = "/home";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await axiosClient.get(`/search/multi`, {
        params: {
          query: searchQuery,
        },
      });
      setSearchResults(response.data.results.slice(0, 5) || []); // Limit to 5 results
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div className='relative max-w-[1366px] mx-auto pb-20 sm:pt-20 sm:pb-24  px-4 min-h-screen'>
      <div className='w-full min-h-screen pt-4 pb-20 flex justify-center'>
        <div>
          <div className='flex flex-col items-center mt-28 gap-5 px-4'>
            <a href='/home' className='w-48'>
              <img src='/logo.png' alt='logo' className='w-48' />
            </a>
            <form onSubmit={handleSearchSubmit} className='gap-2 relative'>
              <div>
                <input
                  type='text'
                  placeholder='Search Movies'
                  className='bg-[#1f2937]/70 rounded-md ps-4 py-2 w-full sm:min-w-96'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type='submit'
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer'>
                  <svg
                    viewBox='0 -0.5 21 21'
                    width='18'
                    height='18'
                    xmlns='http://www.w3.org/2000/svg'
                    className=''>
                    <g fill='none'>
                      <g
                        transform='translate(-299.000000, -280.000000)'
                        fill='#ffffff'>
                        <g transform='translate(56.000000, 160.000000)'>
                          <path d='M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z'></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
                {searchResults.length > 0 && searchQuery && (
                  <Link href={"/home"}>
                    <div className='absolute top-full left-0 bg-neutral-800/60 backdrop-blur-md rounded-md mt-2 w-full max-h-60 overflow-y-auto z-[100] scrollbar-hide'>
                      <ul className='p-2'>
                        {searchResults.map((result: any) => {
                          // Check if we have a valid image path
                          const imagePath =
                            result.poster_path || result.profile_path;
                          const imageUrl = imagePath
                            ? `https://image.tmdb.org/t/p/w92${imagePath}`
                            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

                          return (
                            <li
                              key={result.id}
                              className='py-2 px-4 hover:bg-white/20 cursor-pointer flex items-center gap-3'>
                              <img
                                src={imageUrl}
                                alt={result.title || result.name}
                                className='w-12 h-16 object-cover rounded bg-neutral-700'
                                loading='lazy'
                              />
                              <div>
                                <p className='text-white font-medium'>
                                  {result.title || result.name}
                                </p>
                                <p className='text-gray-400 text-sm'>
                                  {result.release_date?.split("-")[0] ||
                                    result.first_air_date?.split("-")[0]}
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Link>
                )}
              </div>
            </form>
            <small className="className='max-w-2xl mx-auto text-lg text-gray-200 mb-4">
              Cinema – Streaming movies made simple, and free.
            </small>
            <Button
              className='relative px-9 py-6 text-lg bg-gradient-to-r from-[#6d28d9] to-[#1f2937]   hover:opacity-80'
              variant={"outline"}
              onClick={handleRedirect}>
              <span className='relative z-10'>View Full Site</span>
              <div className='absolute inset-0 bg-white/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100' />
            </Button>
            <div className='mt-8 max-w-4xl text-left text-sm text-gray-300 space-y-6'>
              {HERO_DESCRIPTION.map((item, index) => (
                <div key={item.name}>
                  <h2 className='text-xl font-bold text-white mb-1'>
                    {item.name}
                  </h2>
                  <p className='text-sm text-slate-400 text-start'>
                    <strong> {item.description}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    // <div className='relative max-w-[1366px] mx-auto mt-20 pt-32 pb-20 sm:pt-40 sm:pb-24'>
    //   <div className=' mx-auto px-4 sm:px-6 lg:px-8 text-center'>
    //     <div className='flex justify-center items-center mb-2'>
    //       <Image src={"/logo.png"} width={200} height={200} alt='logo' />
    //     </div>
    //     <form className='gap-2 relative'>
    //       <div>
    //         <input
    //           type='text'
    //           placeholder='Search Movies'
    //           className='bg-white/30 rounded-md ps-4 py-2 w-full sm:min-w-96'
    //         />
    //         <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer'>
    //           <svg
    //             viewBox='0 -0.5 21 21'
    //             width='18'
    //             height='18'
    //             xmlns='http://www.w3.org/2000/svg'
    //             className=''>
    //             <g fill='none' fill-rule='evenodd'>
    //               <g
    //                 transform='translate(-299.000000, -280.000000)'
    //                 fill='#ffffff'>
    //                 <g transform='translate(56.000000, 160.000000)'>
    //                   <path d='M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z'></path>
    //                 </g>
    //               </g>
    //             </g>
    //           </svg>
    //         </button>
    //       </div>
    //     </form>
    //     {/* <Search className=' invisible' />
    //     <div className='mb-2 flex justify-center p-1 items-center relative'>
    //       <div className=''>
    //         <input
    //           type='text'
    //           placeholder='Search Movies'
    //           className=' w-[26rem] py-2 text-left indent-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 text-base'
    //         />
    //         <Search className='absolute right-1/3  w-9 h-9 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer' />
    //       </div>
    //     </div> */}
    //     <p className='max-w-2xl mx-auto text-lg text-gray-200 mb-10'>
    //       Cinema – Streaming movies made simple, and free.
    //     </p>
    //     <Button
    //       className='relative px-9 py-6 text-lg  hover:opacity-80'
    //       variant={"outline"}>
    //       <span className='relative z-10'>View Full Site</span>
    //       <div className='absolute inset-0 bg-white/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100' />
    //     </Button>
    //   </div>
    // </div>
  );
}
