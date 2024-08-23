import PoemCard, { Poem } from "@/components/PoemCard";
import { LinkButton } from "@/components/ui/LinkButton";
import { getRecentPoems } from "@/lib/actions/poem.actions";
import React from "react";

const Latest = async () => {
  let poems: Poem[] = [];

  try {
    poems = await getRecentPoems();
  } catch (error) {
    console.error("Failed to fetch poems:", error);
  }

  return (
    <section className="container mt-10 flex flex-col gap-14 justify-center items-center">
      <header className="text-center">
        <h2 className="latest-border text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center text-balance text-Dark">
          Latest Poems
        </h2>
        <p className="md:text-[20px] font-cagliostro text-center text-pretty text-Text mt-10">
          Take your time to explore the blog and see for yourself what makes you
          curious and <br className="hidden sm:block" /> excited. Keep reading
          and enjoy!
        </p>
      </header>
      <section className="cards">
        {poems.map((poem: Poem) => (
          <PoemCard key={poem._id} poem={poem} href={`/blog/${poem._id}`} />
        ))}
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
