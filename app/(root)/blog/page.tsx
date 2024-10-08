"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useState, useEffect } from "react";

import axios from "axios";
import useFilteredPoems from "../../../hooks/useFilteredPoems";
import HeaderBlog from "../../../components/HeaderBlog";
import Input from "../../../components/ui/Input";
import Search from "../../../icons/Search";
import Loader from "../../../components/Loader";
import PoemCard, { Poem } from "../../../components/PoemCard";
const BlogPage = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);

  const getPoems = async () => {
    const res = await axios.get("/api/poems");
    const data = await res.data;
    setLoading(false);
    setPoems(data);
  };

  useEffect(() => {
    getPoems();
  }, []);

  const {
    poems: filteredPoems,
    filter,
    searchQuery,
    handleFilterChange,
    handleSearchChange,
  } = useFilteredPoems(poems);

  return (
    <section className="container">
      <HeaderBlog />
      <section className="my-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Poems" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Poems</SelectItem>
              <SelectItem value="MostSeen">Most Popular</SelectItem>
              <SelectItem value="MostLiked">Most liked</SelectItem>
              <SelectItem value="Favorite">My Favorites</SelectItem>
            </SelectContent>
          </Select>
          <span className="font-cagliostro block">
            Filter poems or search for a poem in the search bar
          </span>
          <div className="relative font-cagliostro">
            <Search className="absolute top-1/2 -translate-y-1/2 right-2" />
            <Input
              name="search"
              placeholder="Search Poems..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-[280px] bg-red-400"
            />
          </div>
        </div>
        <div className="cards">
          {loading ? (
            <Loader />
          ) : (
            filteredPoems.map((poem: Poem) => (
              <PoemCard key={poem._id} poem={poem} href={`/blog/${poem._id}`} />
            ))
          )}
        </div>
      </section>
    </section>
  );
};

export default BlogPage;
