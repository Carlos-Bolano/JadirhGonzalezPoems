"use client";
import HeaderBlog from "@/components/HeaderBlog";
import { Poems } from "@/constants";
import { CircleUserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { DialogDemo } from "@/components/ComentaryDialoge";

const PoemPage = ({ params }: { params: { id: string } }) => {
  // Busca el poema por ID
  const poem = Poems.find((p) => p.id === Number(params.id));

  if (!poem) {
    notFound();
  }
  return (
    <section className="container">
      <HeaderBlog />
      <article className="my-10 m-auto max-w-3xl font-cagliostro">
        <div className="border-2 border-Dark/50 p-10 ">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center text-balance text-Dark">
            {poem.title}
          </h2>
          <p className="whitespace-pre-line  text-center mb-6 md:text-[20px] font-cagliostro text-pretty text-Text">
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
      <article className="my-10 m-auto max-w-3xl font-cagliostro border-2 border-Dark/50 p-10">
        <div className=" flex justify-between items-center gap-4">
          <h3 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center text-balance text-Dark">
            Comments
          </h3>
          <DialogDemo />
        </div>
        <div>
          {poem.comments.map((comment) => (
            <div key={comment.id} className="flex items-center gap-2  my-6">
              <CircleUserRound className="w-10 h-10" />
              <div>
                <p className="font-bold">{comment.author}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default PoemPage;
