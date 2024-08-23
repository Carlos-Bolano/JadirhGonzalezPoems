"use client";
import { SquareArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const HeaderBlog = () => {
  const { id } = useParams();
  const router = useRouter();

  const isPoemPage = id ? true : false;

  return (
    <header className="flex flex-col justify-center items-center p-6 border-b-2 border-Dark/60">
      <h2 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center text-balance text-Dark">
        Take your time to explore every single poem
      </h2>
      <p className="md:text-[20px] font-cagliostro text-center text-pretty text-Text">
        Each poem carries its own feeling and each one can give it a meaning
      </p>
      <div className="flex justify-center md:justify-start lg:gap-6 mt-5">
        {isPoemPage && (
          <button
            className="font-cagliostro relative inline-flex items-center justify-center overflow-hidden group border hover:border-white bg-white text-Dark py-2.5 px-4"
            onClick={() => router.back()}
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out rounded-full group-hover:w-56 group-hover:h-56 group-hover:bg-Dark"></span>
            <span className="relative group-hover:text-white flex gap-2 ">
              <SquareArrowLeft strokeWidth={1.5} />
              Back to poems
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderBlog;
