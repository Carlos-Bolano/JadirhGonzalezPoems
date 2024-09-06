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
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

export function UpdatePoem({ poemId }: { poemId: string }) {
  const [loading, setLoading] = useState(false);
  const [poemData, setPoemData] = useState({
    title: "",
    content: "",
    readingTime: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();

  const fetchPoemData = async () => {
    try {
      const res = await axios.get(`/api/poems/${poemId}`);
      console.log(res);
      if (res.status === 200) {
        setPoemData({
          title: res.data.title,
          content: res.data.content,
          readingTime: res.data.readingTime.toString(),
        });
      }
    } catch (error) {
      console.error("Failed to fetch poem data", error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
    fetchPoemData();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPoemData({
      ...poemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setPoemData((prevState) => ({
      ...prevState,
      readingTime: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/poems/${poemId}`, poemData);
      if (res.status === 200) {
        setLoading(false);
        toast({
          description: "Your poem has been updated.",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update poem", error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={handleOpenDialog}
          className="font-cagliostro text-blue-500"
        >
          Update Poem
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-4xl font-bold">
            Update Poem
          </DialogTitle>
          <DialogDescription className="font-cagliostro">
            Edit your existing poem and refine your verses.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            label="Title of Poem"
            name="title"
            type="text"
            placeholder="love and other drugs of life"
            value={poemData.title}
            onChange={handleInputChange}
            required
          />
          <Textarea
            className="mt-4"
            label="Content of Poem"
            name="content"
            rows={5}
            placeholder="love and other drugs of life"
            value={poemData.content}
            onChange={handleInputChange}
            required
          />
          <div className="mt-4 flex flex-wrap gap-4 justify-between">
            <Select
              name="readingTime"
              value={poemData.readingTime}
              onValueChange={handleSelectChange}
            >
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
                {loading ? "Loading..." : "Update Poem"}
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
