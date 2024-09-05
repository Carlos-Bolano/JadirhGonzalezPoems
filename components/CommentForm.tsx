"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import { commentPoem } from "@/lib/actions/poem.actions"; // Ajusta la ruta según sea necesario
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";

export function CommentForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await commentPoem(id, { name, comment });

      if (!response || !response.success) {
        setError("Failed to add comment.");
        return;
      }

      setName("");
      setComment("");
      router.refresh();
      return toast({
        description: "Comment added successfully.",
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              name="name"
              type="text"
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              className="w-full font-cagliostro"
              label="Comment"
              placeholder="Your comment"
              name="comment"
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <DialogClose asChild>
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Comment"}
              </Button>
            </DialogClose>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
