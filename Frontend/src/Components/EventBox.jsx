import React from 'react';
import { Link } from 'react-router-dom';

const EventBox = ({ campaign_id, picture, title, description }) => {
  const truncateToWords = (text, limit = 15) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  return (
    <div className="bg-[#C9EAEE] rounded-xl overflow-hidden shadow-md flex flex-col max-w-sm w-full p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] cursor-pointer">
      <img
        src={picture}
        alt={title}
        className="w-full h-auto aspect-[16/9] object-cover rounded-xl"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-[#13A3B5] font-bold text-base md:text-lg leading-tight">
          {title}
        </h3>
        <p className="text-black text-sm md:text-base leading-relaxed">
          {truncateToWords(description)}
        </p>
        {/* View More Link */}
        <Link
          to={`/event-detail/${campaign_id}`}
          className="text-[#13A3B5] font-semibold text-sm md:text-base mt-1 inline-block hover:underline"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default EventBox;