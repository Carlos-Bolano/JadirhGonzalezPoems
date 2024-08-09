"use client";
import HeaderBlog from "@/components/HeaderBlog";
import { Poems } from "@/constants";
import { notFound } from "next/navigation";

const PoemPage = ({ params }: { params: { id: string } }) => {
  // Busca el poema por ID
  const poem = Poems.find((p) => p.id === Number(params.id));

  if (!poem) {
    notFound();
  }
  return (
    <section className="container">
      <HeaderBlog />
      <article className="my-10 m-auto max-w-3xl font-cagliostro  ">
        <div className="border-2 border-Dark/50 p-10 ">
          <h2 className="text-center text-5xl font-bold mb-4 font-cormorant">
            {poem.title}
          </h2>
          <p className="whitespace-pre-line text-xl text-center mb-6">
            {poem.content}
          </p>
          <p className="text-center text-Text border-b-2 border-Dark/80 pb-8">
            by {poem.author}
          </p>
          <div className="flex flex-wrap gap-8 justify-center sm:justify-between mt-10">
            <p>{poem.likes} Likes</p>
            <p>{poem.views} Views</p>

            <p>{poem.readingTime} Min of reading</p>
            <p className="">{poem.date}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default PoemPage;
