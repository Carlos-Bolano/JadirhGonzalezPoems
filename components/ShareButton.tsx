"use client";
import { Copy } from "lucide-react";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Input from "./ui/Input";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

export default function ShareButton() {
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast({
        description: "Link copied to clipboard!",
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg font-cagliostro">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-3xl">
            Share link
          </DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              name="link"
              label="Link"
              id="link"
              defaultValue={link}
              readOnly
            />
          </div>
          <Button
            onClick={handleCopy}
            type="button"
            size="default"
            className="p-3.5"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="secondary" size="lg">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
