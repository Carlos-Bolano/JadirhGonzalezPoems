"use client";
import { NavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = pathname === "/sing-in";
  return (
    <header
      className={cn("fixed z-50 w-full font-cagliostro border-b text-sm")}
    >
      <div className="flex justify-between items-center py-4 container">
        <Link
          href={"/"}
          className="font-cagliostro tracking-[1px]  flex items-start gap-1"
        >
          <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
        </Link>
        <nav className="hidden lg:flex justify-between items-center gap-8 uppercase text-black tracking-[1px]">
          {NavLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn("navlink", {
                  "text-black afterActive": isActive,
                })}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex justify-between items-center">
            <Link
              href={"/sing-in"}
              className={cn(" drop-shadow-2xl navlink hidden lg:flex", {
                "text-black afterActive": isActive,
              })}
            >
              Sing In
            </Link>
          </div>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;
