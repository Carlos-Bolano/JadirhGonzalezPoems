import Image from "next/image";
import { LinkButton } from "../components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="container flex flex-col items-center justify-center py-10">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <Image
          src="/assets/not-found-page.png"
          width={500}
          height={500}
          alt="404"
        />
        <div className="text-center lg:text-start">
          <h2 className="text-4xl font-cormorant font-bold">
            The page could not be found
          </h2>
          <p className="text-Text mt-4 font-cagliostro text-lg">
            You can return to the beginning to continue traveling in the world
            of poetry
          </p>
          <div>
            <LinkButton variant="default" href="/" className="mt-10">
              Go Back to Home
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
