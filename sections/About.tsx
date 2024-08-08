import { SquareArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section id="about">
      <Image
        src="/up.svg"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        width={0}
        height={0}
        alt="up"
      />
      <section className="-my-1 bg-Dark">
        <div className="text-white container flex flex-col items-center md:flex-row lg:justify-center lg:gap-10 xl:gap-28  gap-8">
          <div>
            <Image
              src="/assets/jadirh.png"
              alt="about"
              width={400}
              height={400}
            />
          </div>
          <article className="max-w-[500px] about">
            <h2 className=" z-10 text-3xl sm:text-4xl font-bold md:text-[45px] lg:leading-[45px] font-cormorant text-center md:text-start text-balance text-white ">
              Who is Jadirhgonzalez?
            </h2>
            <p className="md:text-[20px] font-cagliostro text-center md:text-start text-pretty text-white/50 mt-4 max-w-[530px]">
              On the loom of life we embroider the essence, weaving threads of
              empowerment with patience. Each step, a dance of acceptance, where
              the flower of resilience blooms.
            </p>
            <p className="md:text-[20px] font-cagliostro text-center md:text-start text-pretty text-white/50 mt-4 max-w-[530px]">
              Acceptance, lighthouse that lights the way, where differences are
              our divine destiny. In the tangle of life we weave strength, a
              song of unity, a symphony of nobility.
            </p>
            <p className="md:text-[20px] font-cagliostro text-center md:text-start text-pretty text-white/50 mt-4 max-w-[530px]">
              Resilience, the force that makes us strong, In the face of storms
              and challenges, we are inert rainbows. In the echo of time we
              leave our essence, living poetry of empowerment and intense
              acceptance.
            </p>
            <div className="flex justify-center md:justify-start lg:gap-6 mt-5">
              <Link
                className="font-cagliostro relative inline-flex items-center justify-center overflow-hidden group border hover:border-white bg-white text-Dark py-2.5 px-4"
                href="/#contact"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out rounded-full group-hover:w-56 group-hover:h-56 group-hover:bg-Dark"></span>
                <span className="relative group-hover:text-white flex gap-2">
                  Contact me
                  <SquareArrowRight />
                </span>
              </Link>
            </div>
          </article>
        </div>
      </section>
      <Image
        src="/down.svg"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        width={0}
        height={0}
        alt="up"
      />
    </section>
  );
};

export default About;
