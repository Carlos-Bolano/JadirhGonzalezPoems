"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Section = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  return (
    <section
      className={cn("", {
        "pt-[4.5em] container bg-red-200": pathname !== "/" ? true : false,
      })}
    >
      {children}
    </section>
  );
};

export default Section;
