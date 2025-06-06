"use client";
import { use, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axiosClient from "@/lib/axiosClient";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);
  const toggleSearch = () => setShowSearchbar((prev) => !prev);

  // Debounced search
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
    <>
      <Sidebar showSidebar={showSidebar} onClose={handleCloseSidebar} />
      <nav className=' text-white w-full py-4 z-50 relative'>
        <div className='flex sm:items-center  sm:justify-between gap-4 sm:flex-row flex-col'>
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <button className='cursor-pointer' onClick={handleShowSidebar}>
                <svg
                  viewBox='0 0 24 24'
                  width='26'
                  height='26'
                  xmlns='http://www.w3.org/2000/svg'
                  className=''>
                  <g fill='none'>
                    <g fill='#ffffff'>
                      <rect x='3' y='6' width='18' height='2' rx='1'></rect>
                      <rect x='3' y='11' width='18' height='2' rx='1'></rect>
                      <rect x='3' y='16' width='18' height='2' rx='1'></rect>
                    </g>
                  </g>
                </svg>
              </button>
              <a href='/home' className='w-24'>
                <img className='w-24' alt='logo' src='/logo.png' />
              </a>
            </div>
            <p className={`sm:hidden block`} onClick={toggleSearch}>
              <svg
                viewBox='0 -0.5 21 21'
                width='24'
                height='24'
                xmlns='http://www.w3.org/2000/svg'
                className='cursor-pointer'>
                <g fill='none'>
                  <g
                    transform='translate(-299.000000, -280.000000)'
                    fill='#FFD54F'>
                    <g transform='translate(56.000000, 160.000000)'>
                      <path d='M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z'></path>
                    </g>
                  </g>
                </g>
              </svg>
            </p>
          </div>
          <div
            className={`
            relative w-full sm:w-auto 
            ${showSearchbar ? "block" : "hidden"} 
            sm:block
          `}>
            <form onSubmit={handleSearchSubmit} className='flex gap-2 relative'>
              <input
                placeholder='Search Movies'
                className='bg-[#1f2937]/70 rounded-md ps-4 py-2 w-full sm:min-w-96'
                type='text'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer'
                type='submit'>
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
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
