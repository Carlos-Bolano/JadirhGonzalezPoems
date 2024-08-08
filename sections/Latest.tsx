import PoemCard from "@/components/PoemCard";
import { LinkButton } from "@/components/ui/LinkButton";
import React from "react";

const Latest = () => {
  return (
    <section className="container mt-10 flex flex-col gap-14 justify-center items-center">
      <header className=" text-center aligte">
        <h2 className="latest-border text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center text-balance text-Dark ">
          Latest Poems
        </h2>
        <p className="md:text-[20px] font-cagliostro text-center text-pretty text-Text mt-10 ">
          Take your time to explore the blog and see for yourself what makes you
          curious and <br className="hidden sm:block" /> excited. Keep reading
          and enjoy!
        </p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PoemCard />
        <PoemCard />
        <PoemCard />
        <PoemCard />
        <PoemCard />
        <PoemCard />
      </section>
      <div>
        <LinkButton href="/blog" variant={"default"} size={"lg"}>
          Read more
        </LinkButton>
      </div>
    </section>
  );
};

export default Latest;
