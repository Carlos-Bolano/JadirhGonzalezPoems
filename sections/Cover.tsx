import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cover = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row justify-between items-center gap-3 md:gap-0 py-8 md:pl-10">
      <div className="flex flex-col gap-5 lg:max-w-lg">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center lg:text-start text-balance ">
          Explore Jadirh González Poems. A poetic journey full of emotions and
          reflections.
        </h1>
        <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty">
          A dynamic blog exploring diverse topics close to my heart,
          particularly those related to the{" "}
          <span className="text-red-600">L</span>
          <span className="text-green-600">G</span>
          <span className="text-blue-600">B</span>
          <span className="text-yellow-400">T</span>
          <span className="text-orange-600">Q</span>
          <span className="text-green-300">I</span>
          <span className="text-purple-600">A</span>
          <span className="text-gradient bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 text-transparent bg-clip-text">
            +
          </span>{" "}
          community. Dive in to discover what sparks your curiosity and ignites
          your passion. Keep reading and enjoy!
        </p>
        <div className="flex justify-center lg:justify-start gap-4 lg:gap-6">
          <LinkButton href="/blog" variant={"default"} size={"lg"}>
            Poems
          </LinkButton>

          <LinkButton href="/#about" variant={"secondary"} size={"lg"}>
            About me
          </LinkButton>
        </div>
      </div>
      <div className="max-w-[600px]">
        <Image
          className=""
          src="/assets/face.png"
          width={600}
          height={600}
          alt="cover"
        />
      </div>
    </section>
  );
};

export default Cover;
