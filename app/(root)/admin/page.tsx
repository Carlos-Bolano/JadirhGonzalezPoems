"use client";
import { CreatePoem } from "../../../components/CreatePoem";
import { Poem } from "../../../components/PoemCard";
import Input from "../../../components/ui/Input";
import UserDropdown from "../../../components/UserDropdown";
import Search from "../../../icons/Search";
import axios from "axios";
import useFilteredPoems from "../../../hooks/useFilteredPoems";
import { useEffect, useState } from "react";
import AdminPoemCard from "components/AdminPoemCard";
import Loader from "components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import AdminPoemsDetails from "components/AdminPoemsDetails";

const AdminPage = () => {
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
    <section className="container py-8">
      <header className="flex flex-col md:flex-row md:justify-between items-center gap-4 pb-8">
        <div>
          <UserDropdown />
        </div>
        <div className="relative font-cagliostro">
          <Search className="absolute top-1/2 -translate-y-1/2 right-2" />
          <Input
            name="search"
            placeholder="Search Poems..."
            className="w-[300px] "
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </header>
      <AdminPoemsDetails />
      <section className="mt-20">
        <div className="flex justify-center items-center flex-wrap-reverse lg:justify-between mb-10 gap-4">
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
          <span className="hidden lg:block">
            Edit your poems or write down a new one!
          </span>
          <CreatePoem />
        </div>
        {/* <SearchablePoems poems={Poems} /> */}
        <div className="cards">
          {loading ? (
            <Loader />
          ) : (
            filteredPoems.map((poem: Poem) => (
              <AdminPoemCard
                key={poem._id}
                poem={poem}
                href={`/blog/${poem._id}`}
              />
            ))
          )}
        </div>
      </section>
    </section>
  );
};

export default AdminPage;
