import Image from "next/image";

const NoMessagesYet = () => {
  return (
    <article className="flex flex-col lg:flex-row items-center justify-center ">
      <Image
        src="/assets/no-message.png"
        alt="No Messages Yet"
        width={400}
        height={400}
      />
      <div>
        <h2 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center lg:text-start text-balance text-Dark ">
          No Messages Yet
        </h2>
        <p className="md:text-[20px] font-cagliostro text-pretty text-Text mt-4 max-w-[530px]">
          Be the first to send a message!
        </p>
      </div>
    </article>
  );
};

export default NoMessagesYet;
