"use client";
import Link from "next/link";
import React, { useState } from "react";
import { formatDistanceStrict } from "date-fns";
import LikeButton from "./LikeButton";
import View from "../icons/View";
import { incrementViews } from "../lib/actions/poem.actions";

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
  const { title, content, date, readingTime, views, likes, _id } = poem;

  const [viewsCount, setViewsCount] = useState(views);

  const getTruncatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const formattedDate = formatDistanceStrict(new Date(date), new Date(), {
    addSuffix: true,
  });

  const handleViewClick = async () => {
    setViewsCount(views + 1);

    const updatedViews = await incrementViews(_id.toString());

    if (updatedViews === null) {
      setViewsCount(views);
      alert("Failed to update views.");
    }
  };
  return (
    <article className="border-2 p-4 border-Dark/50 max-w-[320px] flex flex-col gap-1 transition-all duration-300 hover:border-Dark hover:shadow-2xl">
      <Link onClick={handleViewClick} href={href}>
        <h3 className="text-2xl font-cormorant text-Dark text-center">
          {getTruncatedText(title, 25)}
        </h3>
        <p className="text-Text text-sm  text-center font-cagliostro">
          {getTruncatedText(content, 210)}
        </p>
      </Link>
      <div className="flex justify-between text-Text text-sm font-cagliostro mt-2">
        <span>{readingTime} min read</span>
        <LikeButton poemId={poem._id.toString()} initialLikes={likes} />
        <span className="flex gap-1 items-center justify-center">
          <View />
          {views}
        </span>

        <span>{formattedDate}</span>
      </div>
    </article>
  );
};

export default PoemCard;
