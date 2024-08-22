import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/Button";
import CreatePoemForm from "./CreatePoemForm";

export function CreatePoem() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create a new poem</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-4xl font-bold">
            Create a new poem
          </DialogTitle>
          <DialogDescription className="font-cagliostro">
            Bring your thoughts to life in verse and share your essence with the
            world.
          </DialogDescription>
        </DialogHeader>
        <CreatePoemForm />
      </DialogContent>
    </Dialog>
  );
}
