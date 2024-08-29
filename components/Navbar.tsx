"use client";
import { NavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const isActive = pathname === "/sing-in";
  return (
    <header
      style={{ backdropFilter: "blur(8px)" }}
      className={cn(
        "fixed z-50 w-full font-cagliostro border-b text-sm bg-white/50"
      )}
    >
      <div className="flex justify-between items-center py-3 container">
        <Link
          href={"/"}
          className="font-cagliostro tracking-[1px]  flex items-start gap-1"
        >
          <Image src={"/logo.svg"} width={45} height={45} alt="logo" />
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
            {status === "authenticated" ? (
              <Link
                href={"/admin"}
                className={cn("navlink", {
                  "text-black afterActive":
                    pathname === "/admin" ? true : false,
                })}
              >
                Admin
              </Link>
            ) : (
              <Link
                href={"/sing-in"}
                className={cn("navlink", {
                  "text-black afterActive": isActive,
                })}
              >
                Sing in
              </Link>
            )}
          </div>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;
