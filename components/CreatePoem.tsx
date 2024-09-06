"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Button } from "./ui/Button";
import { toast } from "./ui/use-toast";

export function CreatePoem() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const newPoem = {
      title: formData.get("title"),
      content: formData.get("content"),
      readingTime: new Number(formData.get("readingTime")),
    };

    const res = await axios.post("/api/poems", newPoem);

    if (res.status === 200) {
      setLoading(false);
      toast({
        description: "Your poem has been created.",
      });
      window.location.reload();
    }
  };
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
        <form onSubmit={handleSubmit}>
          <Input
            label="Title of Poem"
            name="title"
            type="text"
            placeholder="love and other drugs of life"
            required
          />
          <Textarea
            className="mt-4"
            label="Content of Poem"
            name="content"
            rows={5}
            placeholder="love and other drugs of life"
            required
          />
          <div className="mt-4 flex flex-wrap gap-4 justify-between">
            <Select name="readingTime" defaultValue="1">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time of reading" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Times</SelectLabel>
                  <SelectItem value="1">1 Minute</SelectItem>
                  <SelectItem value="2">2 Minutes</SelectItem>
                  <SelectItem value="3">3 Minutes</SelectItem>
                  <SelectItem value="4">4 Minutes</SelectItem>
                  <SelectItem value="5">5 Minutes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogClose asChild>
              <Button
                variant="default"
                size={"lg"}
                type="submit"
                onClick={() => handleSubmit}
              >
                {loading ? "Loading..." : "Create Poem"}
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
