import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import React from "react";

const SingIn = () => {
  return (
    <section className="grid place-items-center justify-center bg-[#f5f5f57e] min-h-[calc(100vh-150px)]">
      <div className="container flex flex-col lg:flex-row justify-center items-center mx-auto p-10 ">
        <Image
          className="rounded-lg "
          src="/assets/drops-animation.gif"
          width={500}
          height={500}
          alt="logo"
        />
        <div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center lg:text-start text-balance text-Dark">
            Welcome back Mr Jadirh
          </h1>
          <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty text-Text">
            Enter the realm of words, where verses come alive.
          </p>
          <form
            className="mt-10 flex flex-col justify-center items-center gap-5"
            action=""
          >
            <Input
              label="Email"
              placeholder="Jhondoe@gmail.com"
              name="email"
              type="email"
              required
            />
            <Input
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              required
            />
            <div>
              <Button variant={"default"} size={"lg"} type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingIn;
