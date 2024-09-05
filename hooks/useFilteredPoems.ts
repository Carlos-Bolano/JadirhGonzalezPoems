"use client";
import { useState, useEffect } from "react";
import { Poem } from "../components/PoemCard";

const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const useFilteredPoems = (initialPoems: Poem[]) => {
  const [poems, setPoems] = useState<Poem[]>(initialPoems);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPoems(initialPoems);
  }, [initialPoems]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPoems = () => {
    let filtered = poems;

    switch (filter) {
      case "MostSeen":
        filtered = [...filtered].sort((a, b) => b.views - a.views);
        break;
      case "MostLiked":
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
        break;
      case "Favorite":
        const favoriteIds = JSON.parse(
          localStorage.getItem("likedPoems") || "[]"
        );
        filtered = filtered.filter((poem) => favoriteIds.includes(poem._id));
        break;
      default:
        break;
    }

    if (searchQuery) {
      filtered = filtered.filter((poem) =>
        normalizeText(poem.title.toLowerCase()).includes(
          normalizeText(searchQuery)
        )
      );
    }
    return filtered;
  };

  return {
    poems: filteredPoems(),
    filter,
    searchQuery,
    handleFilterChange,
    handleSearchChange,
  };
};

export default useFilteredPoems;
