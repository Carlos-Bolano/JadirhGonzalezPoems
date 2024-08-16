import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-3xl font-bold">
            Comments Section
          </DialogTitle>
          <DialogDescription className="font-cagliostro">
            Leave your opinion about how this poem made you feel.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action="" className="space-y-4">
            <Input
              placeholder="Your name"
              name="name"
              type="text"
              required
              label="Name"
            />
            <Textarea
              className="w-full font-cagliostro"
              label="Commentary"
              placeholder="Your comment"
              name="comment"
              rows={3}
              required
            />
            <Button type="submit" variant="default" size="lg">
              Comment
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
