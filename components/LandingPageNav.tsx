import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              C-Neima
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='hidden md:block ml-10'>
              <div className='flex items-center space-x-5 font-semibold uppercase'>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Home
                </Link>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Movies
                </Link>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Tv Shows
                </Link>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Top IMDB
                </Link>
              </div>
            </div>
            <Button
              className='text-sm  hover:opacity-90 ml-2'
              onClick={handleRedirect}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
