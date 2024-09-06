"use client";
import { useEffect, useState } from "react";
import PoemCard, { Poem } from "../components/PoemCard";
import { LinkButton } from "../components/ui/LinkButton";
import Loader from "components/Loader";

const Latest = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPoems = async () => {
      const res = await fetch("/api/poems");
      const data = await res.json();
      setPoems(data);
      setLoading(false);
    };
    fetchPoems();
  }, []);
  const latestPoems = [...poems].slice(0, 8);

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
        {loading ? (
          <Loader />
        ) : (
          latestPoems.map((poem) => (
            <PoemCard key={poem._id} poem={poem} href={`/blog/${poem._id}`} />
          ))
        )}
      </section>
      <div>
        <LinkButton
          href="/blog"
          title="go to blog page"
          variant={"default"}
          size={"lg"}
        >
          Read more Poems
        </LinkButton>
      </div>
    </section>
  );
};

export default Latest;
