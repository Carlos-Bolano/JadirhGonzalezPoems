import Link from "next/link";
import React from "react";
import { UpdatePoem } from "./UpdatePoem";
import { DeletePoem } from "./DeletePoem";

interface Comment {
  _id: number;
  text: string;
  author: string;
}

interface Poem {
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

interface AdminPoemCardProps {
  poem: Poem;
  href: string;
}

const AdminPoemCard: React.FC<AdminPoemCardProps> = ({ poem, href }) => {
  const { title, content, views } = poem;

  const getTruncatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="border-2 p-4 border-Dark/50 max-w-[320px] flex flex-col gap-1 transition-all duration-300 hover:border-Dark hover:shadow-2xl">
      <Link href={href} className="">
        <h3 className="text-2xl font-cormorant text-Dark text-center">
          {getTruncatedText(title, 25)}
        </h3>
        <p className="text-Text text-sm  text-center font-cagliostro">
          {getTruncatedText(content, 210)}
        </p>
      </Link>
      <div className="flex justify-between text-Text text-sm font-cagliostro mt-2">
        <UpdatePoem poemId={poem._id.toString()} />
        <span className="text-green-400">{views} Views</span>
        <DeletePoem poemId={poem._id.toString()} />
      </div>
    </div>
  );
};

export default AdminPoemCard;
