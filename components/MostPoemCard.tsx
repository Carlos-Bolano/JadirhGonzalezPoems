"use client";
import Link from "next/link";
import React, { use } from "react";
import { Poem } from "./PoemCard";
import Loader from "./Loader";

const MostPoemCard: React.FC<{ poem: Poem; tag: string; loading: boolean }> = ({
  poem,
  tag,
  loading,
}) => {
  const getTruncatedText = (text: string | undefined, maxLength: number) => {
    if (text === undefined || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  if (!poem) return null;
  const { title, content, views, likes, comments = [], _id } = poem;

  let metric;
  switch (tag) {
    case "Most Commented":
      metric = comments.length;
      break;
    case "Most Liked":
      metric = likes;
      break;
    default:
      metric = views;
      break;
  }

  return (
    <Link
      href={"/blog/" + _id}
      className="border-2 border-Dark/50 p-3 max-w-[300px] max-h-flex flex-col gap-1 transition-all duration-300 hover:border-Dark hover:shadow-2xl"
    >
      <header className="flex justify-between items-center gap-4">
        <span className="font-cormorant flex justify-self-end">{tag}</span>
        <span className="font-cagliostro text-Dark font-bold">{metric}</span>
      </header>
      <div className="flex flex-col">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h4 className="font-cormorant text-xl ">
              {getTruncatedText(title, 25)}
            </h4>
            <p className="font-cagliostro text-sm">
              {getTruncatedText(content, 30)}
            </p>
          </>
        )}
      </div>
    </Link>
  );
};

export default MostPoemCard;
