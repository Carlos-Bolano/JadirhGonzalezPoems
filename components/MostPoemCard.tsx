import Link from "next/link";
import React from "react";

interface MostPoemCardProps {
  title: string;
  content: string;
  count: number;
  href: string;
}

const MostPoemCard = ({ title, content, count, href }: MostPoemCardProps) => {
  return (
    <Link
      href={href}
      className="border-2 border-Dark/50 p-3 max-w-[300px] max-h-flex flex-col gap-1 "
    >
      <header className="flex justify-between items-center gap-4">
        <span className="font-cagliostro">Most Popular</span>
        <span className="font-cagliostro text-Dark">{count}</span>
      </header>
      <div className="flex flex-col">
        <h4 className="font-cormorant text-xl">{title}</h4>
        <p className="font-cagliostro text-sm">{content}</p>
      </div>
    </Link>
  );
};

export default MostPoemCard;
