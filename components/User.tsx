"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 py-1 px-4 rounded-sm cursor-pointer hover:bg-Dark/10">
          <Avatar>
            <AvatarImage src="/assets/jadirh.jpg" alt="Jadirh Gonzalez" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <h3 className="font-bold font-cormorant text-xl">
              Jadirh Gonzalez
            </h3>
            <span className="text-Text  font-cormorant -mt-1">Writter</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-cagliostro">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <button
            title="Sign Out Button"
            className="flex w-full gap-1"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
