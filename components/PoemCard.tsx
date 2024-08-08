import Link from "next/link";
import React from "react";

const PoemCard = () => {
  return (
    <Link
      href="/blog"
      className="border-2 p-4 border-Dark/50 max-w-[320px] flex flex-col gap-1 transition-all duration-300 hover:border-Dark hover:shadow-2xl"
    >
      <h3 className="text-2xl font-cormorant text-Dark">
        El eco de tu ausencia
      </h3>
      <p className="text-Text text-sm font-cagliostro">
        En el silencio del alba, tu ausencia se desliza, como el susurro de un
        eco, en la penumbra imprecisa.e entrelazan las sombras..
      </p>
      <div className="flex justify-between text-Text text-sm font-cagliostro mt-2">
        <span>2 de marzo, 2024</span>
        <span>2 min</span>
        <span>45 views</span>
      </div>
    </Link>
  );
};

export default PoemCard;
