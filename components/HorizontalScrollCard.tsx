import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Data {
  id: number;
}

interface HorizontalScrollCardProps {
  data: Data[];
  heading: string;
  trending: boolean;
  media_type: string;
}

const HorizontalScrollCard = ({
  data,
  heading,
  trending,
  media_type,
}: HorizontalScrollCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrevious = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className='container lg:max-w-[100rem] h-full mx-auto  mt-10 mb-14'>
      <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>
        {heading}
      </h2>

      <div className='relative'>
        <div
          ref={containerRef}
          className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 scrollbar-none gap-x-10 gap-y-8 scrollbar-hide relative overflow-hidden  scroll-smooth transition-all '>
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
