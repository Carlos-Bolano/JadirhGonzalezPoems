"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/Button";

const SingIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log(res);
    if (res?.error) setError(res.error as string);

    if (res?.ok) return router.push("/admin");
    setLoading(false);
  };
  return (
    <section className="grid place-items-center justify-center bg-[#f5f5f57e] min-h-[calc(100vh-150px)]">
      <div className="container flex flex-col lg:flex-row justify-center items-center mx-auto p-10 ">
        <Image
          unoptimized
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
            onSubmit={handleSubmit}
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
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingIn;
