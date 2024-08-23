import Link from "next/link";
import React from "react";

interface MostPoemCardProps {
  title: string;
  tag: string;
  content: string;
  count: number;
  href: string;
}

const MostPoemCard = ({
  title,
  content,
  count,
  href,
  tag,
}: MostPoemCardProps) => {
  const getTruncatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  return (
    <Link
      href={href}
      className="border-2 border-Dark/50 p-3 max-w-[300px] max-h-flex flex-col gap-1 transition-all duration-300 hover:border-Dark hover:shadow-2xl"
    >
      <header className="flex justify-between items-center gap-4">
        <span className="font-cormorant flex justify-self-end">{tag}</span>
        <span className="font-cagliostro text-Dark font-bold">{count}</span>
      </header>
      <div className="flex flex-col">
        <h4 className="font-cormorant text-xl ">
          {getTruncatedText(title, 25)}
        </h4>
        <p className="font-cagliostro text-sm">
          {getTruncatedText(content, 30)}
        </p>
      </div>
    </Link>
  );
};

export default MostPoemCard;
