import React from "react";

interface TotalCardProps {
  title: string;
  count: number;
}

const TotalCard = ({ title, count }: TotalCardProps) => {
  return (
    <div className="flex justify-between items-center gap-8 max-w-[300px] border-2 border-Dark/90 p-3">
      <div className="">
        <span className="font-cagliostro block text-sm">Total</span>
        <span className="font-bold font-cormorant text-3xl">{title}</span>
      </div>

      <span className="text-Dark text-4xl font-cagliostro block mt-3">
        {count}
      </span>
    </div>
  );
};

export default TotalCard;
