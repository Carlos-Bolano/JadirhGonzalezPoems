"use client";
import React, { useState } from "react";
import PoemCard from "@/components/PoemCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeaderBlog from "@/components/HeaderBlog";
import { Poems } from "@/constants";

const Page = () => {
  const [filter, setFilter] = useState("All");

  const filteredPoems = Poems.filter((poem) => {
    if (filter === "MostSeen") {
      return poem.views > 0;
    }
    if (filter === "MostLiked") {
      return poem.likes > 0;
    }
    return true;
  });

  const sortedPoems = filteredPoems.sort((a, b) => {
    if (filter === "MostSeen") {
      return b.views - a.views;
    }
    if (filter === "MostLiked") {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <section className="container">
      <HeaderBlog />
      <section className="my-10">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
          <h3 className="text-3xl font-bold md:text-4xl font-cormorant text-center lg:text-start text-balance text-Dark">
            Filter Poems
          </h3>
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Poems" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Poems</SelectItem>
              <SelectItem value="MostSeen">Most Seen</SelectItem>
              <SelectItem value="MostLiked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="cards">
          {sortedPoems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} href={`/blog/${poem.id}`} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Page;
