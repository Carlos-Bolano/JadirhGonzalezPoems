"use client";
import MostPoemCard from "@/components/MostPoemCard";
import PoemCard from "@/components/PoemCard";
import TotalAdminCard from "@/components/TotalAdminCard";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuDemo } from "@/components/User";
import { Poems } from "@/constants";
import Search from "@/icons/Search";
import { useState } from "react";

const AdminPage = () => {
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
    <section className="container py-8">
      <header className="flex flex-col md:flex-row md:justify-between items-center gap-4 pb-8">
        <div>
          <DropdownMenuDemo />
        </div>
        <form action="" className="relative font-cagliostro max-w-[300px] ">
          <Search className="absolute top-1/2 -translate-y-1/2 right-3 " />
          <input
            type="text"
            className="py-2 pl-4 pr-8 border-2 border-Dark w-full"
            placeholder="Search a poem"
          />
        </form>
      </header>
      <section className="flex flex-col justify-between lg:flex-row gap-5">
        <div className="font-cagliostro">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center lg:text-start text-balance text-Dark mb-4">
            Good morning Jadirh 🌞
          </h2>
          <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty text-Text md:max-w-xl md:m-auto">
            Welcome to your administration panel Here you can create, edit and
            delete poems, you can also see some statistics of your poems
          </p>
          <div className="flex justify-center lg:justify-normal mt-4">
            <Button variant="default">Create a new poem</Button>
          </div>
        </div>
        <aside className="flex flex-col justify-between items-center md:justify-normal lg:items-end gap-5 ">
          <div className="flex flex-col md:flex-row-reverse gap-5">
            <MostPoemCard
              href="/"
              title="eco del invierno"
              content="alla en tu casa con la silla de...  "
              count={400}
            />
            <MostPoemCard
              href="/"
              title="eco del invierno"
              content="alla en tu casa con la silla de...  "
              count={400}
            />
            <MostPoemCard
              href="/"
              title="eco del invierno"
              content="alla en tu casa con la silla de...  "
              count={400}
            />
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-5">
            <TotalAdminCard title="Poems" count={20} />
            <TotalAdminCard title="Likes" count={128} />
            <TotalAdminCard title="Views" count={400} />
          </div>
        </aside>
      </section>
      <section className="mt-20">
        <div className="flex justify-between items-center gap-8 mb-10">
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
          <span>Edit yours poems or write down a new one!</span>
          <Button variant="default" size={"lg"}>
            New poem
          </Button>
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

export default AdminPage;
