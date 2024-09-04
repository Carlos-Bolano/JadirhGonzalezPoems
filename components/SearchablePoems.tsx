"use client";

import { useState, useEffect } from "react";
import AdminPoemCard from "@/components/AdminPoemCard";
import { Poem } from "@/components/PoemCard";

interface SearchablePoemsProps {
  poems: Poem[];
}

const SearchablePoems = ({ poems }: SearchablePoemsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>(poems);

  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const inputElement = document.getElementById(
      "searchInput"
    ) as HTMLInputElement | null;

    const handleInput = (e: Event) => {
      setSearchTerm((e.target as HTMLInputElement).value);
    };

    if (inputElement) {
      inputElement.addEventListener("input", handleInput);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleInput);
      }
    };
  }, []);

  useEffect(() => {
    const tabButtons = document.querySelectorAll(".tab-button");

    const handleTabClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const tab = target.getAttribute("data-tab");
      if (tab) {
        setActiveTab(tab);
      }
    };

    tabButtons.forEach((button) =>
      button.addEventListener("click", handleTabClick)
    );

    return () => {
      tabButtons.forEach((button) =>
        button.removeEventListener("click", handleTabClick)
      );
    };
  }, []);

  useEffect(() => {
    let filtered = poems.filter((poem) =>
      normalizeText(poem.title.toLowerCase()).includes(
        normalizeText(searchTerm.toLowerCase())
      )
    );

    switch (activeTab) {
      case "MostPopular":
        filtered = [...filtered].sort((a, b) => b.views - a.views);
        break;
      case "MostLiked":
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      const tab = button.getAttribute("data-tab");
      if (tab === activeTab) {
        button.classList.add("bg-gray-300");
      } else {
        button.classList.remove("bg-gray-300");
      }
    });

    setFilteredPoems(filtered);
  }, [searchTerm, activeTab, poems]);

  return (
    <div className="cards">
      {filteredPoems.map((poem) => (
        <AdminPoemCard key={poem._id} poem={poem} href={`/blog/${poem._id}`} />
      ))}
    </div>
  );
};

export default SearchablePoems;
