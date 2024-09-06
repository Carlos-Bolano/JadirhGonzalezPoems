"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/Button";

export function DeletePoem({ poemId }: { poemId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/poems/${poemId}`);
      if (res.status === 200) {
        window.location.reload();
        return toast({
          description: "Your poem has been deleted.",
        });
      } else {
        alert("Failed to delete poem. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete poem:", error);
      alert(
        "An error occurred while deleting the poem. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="font-cagliostro text-red-400">Delete Poem</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-cagliostro">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-cormorant text-3xl font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-Text text-cagliostro">
            This action cannot be undone. This will permanently delete the poem
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"default"} onClick={handleDelete}>
              {loading ? "Deleting..." : "Delete Poem"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
