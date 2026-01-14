"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import React from "react";
import Input from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { toast } from "../../../components/ui/use-toast";
import { signinSchema } from "../../../schemas/auth.schema";

const SingIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const values = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    const parsed = signinSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      setFieldErrors({
        email: flat.fieldErrors.email?.[0],
        password: flat.fieldErrors.password?.[0],
      });
      toast({
        title: "Invalid credentials",
        description: "Check your email and password",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setFieldErrors({});
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.ok) {
        toast({ title: "Welcome back", description: "Log in successful", variant: "default" });
        return router.push("/admin");
      }
      if (res?.error) {
        setError(res.error as string);
        toast({
          title: "Incorrect credentials",
          description: "Check your email and password",
          variant: "destructive",
        });
      }
    } catch (e) {
      setError("Error Server: " + e);
      toast({ title: "Error Server: " + e, description: "Try again later", variant: "destructive" });
    }
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
          <form className="mt-10 flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit}>
            <Input label="Email" placeholder="Jhondoe@gmail.com" name="email" type="email" required />
            {fieldErrors.email && (
              <span className="text-red-600 text-sm w-full text-center lg:text-start">
                {fieldErrors.email}
              </span>
            )}
            <Input label="Password" placeholder="********" name="password" type="password" required />
            {fieldErrors.password && (
              <span className="text-red-600 text-sm w-full text-center lg:text-start">
                {fieldErrors.password}
              </span>
            )}
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
