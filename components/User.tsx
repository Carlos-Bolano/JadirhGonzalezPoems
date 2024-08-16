import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 py-1 px-4 rounded-sm cursor-pointer hover:bg-Dark/10">
          <Image
            src="/assets/face.png"
            className="rounded-full w-10 h-10"
            alt="user"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-0">
            <h3 className="font-bold font-cormorant text-xl">
              Jadirh Gonzalez
            </h3>
            <span className="text-Text  font-cormorant -mt-1">Writter</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
