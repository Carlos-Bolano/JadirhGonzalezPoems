import Link from "next/link";
import React from "react";
import { formatDistanceStrict } from "date-fns";

export interface Comment {
  _id: number;
  text: string;
  author: string;
}

export interface Poem {
  _id: number;
  title: string;
  content: string;
  readingTime: number;
  views: number;
  likes: number;
  author: string;
  date: string;
  comments: Comment[];
}

interface PoemCardProps {
  poem: Poem;
  href: string;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, href }) => {
  const { title, content, date, readingTime, views, likes } = poem;

  const getTruncatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const formattedDate = formatDistanceStrict(new Date(date), new Date(), {
    addSuffix: true,
  });

  return (
    <Link
      href={href}
      className="border-2 p-4 border-Dark/50 max-w-[320px] flex flex-col gap-1 transition-all duration-300 hover:border-Dark hover:shadow-2xl"
    >
      <h3 className="text-2xl font-cormorant text-Dark text-center">
        {getTruncatedText(title, 25)}
      </h3>
      <p className="text-Text text-sm  text-center font-cagliostro">
        {getTruncatedText(content, 210)}
      </p>
      <div className="flex justify-between text-Text text-sm font-cagliostro mt-2">
        <span>{likes} Likes</span>
        <span>{views} Views</span>
        <span>{readingTime} min</span>
        <span>{formattedDate}</span>
      </div>
    </Link>
  );
};

export default PoemCard;
