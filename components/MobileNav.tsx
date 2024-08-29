import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";

const MobileNav = () => {
  const { status } = useSession();

  return (
    <nav className="flex lg:hidden font-cagliostro justify-center items-center">
      <Sheet>
        <SheetTrigger title="Menu button navbar for mobile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6h16" />
            <path d="M7 12h13" />
            <path d="M10 18h10" />
          </svg>
        </SheetTrigger>
        <SheetContent className="border-none flex flex-col justify-center items-center">
          <SheetHeader className="text-centert text-xl">
            <SheetTitle className="pt-10 font-cormorant font-bold text-2xl">
              Where do you want to navigate?
            </SheetTitle>
            <SheetDescription className="font-cagliostro">
              Select one of the available locations.
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <div className="flex flex-col mt-16 gap-8 uppercase font-bold tracking-[3px] h-full">
              {NavLinks.map((item) => {
                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      key={item.label}
                      className="text-center navlink"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
              <SheetClose asChild key={"/sing-in"}>
                {status === "authenticated" ? (
                  <Link
                    href={"/admin"}
                    className="navlink drop-shadow-2xl text-center"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href={"/sing-in"}
                    className="drop-shadow-2xl text-center navlink"
                  >
                    Sing in
                  </Link>
                )}
              </SheetClose>
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
