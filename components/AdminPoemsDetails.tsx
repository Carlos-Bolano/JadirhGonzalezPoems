"use client";
import React, { useState, useEffect } from "react";
import { CreatePoem } from "./CreatePoem";
import { LinkButton } from "./ui/LinkButton";
import { Poem } from "./PoemCard";
import Greeting from "./greeting";
import TotalAdminCard from "./TotalAdminCard";
import MostPoemCard from "./MostPoemCard";

const AdminPoemsDetails = () => {
  const [mostPoems, setMostPoems] = useState({
    mostViewedPoem: {} as Poem,
    mostLikedPoem: {} as Poem,
    mostCommentedPoem: {} as Poem,
    totalViews: 0,
    totalLikes: 0,
    totalPoems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/poems/most", { cache: "no-store" }).then((res) => {
      res.json().then((data) => {
        setMostPoems({
          mostViewedPoem: data.mostViewedPoem,
          mostLikedPoem: data.mostLikedPoem,
          mostCommentedPoem: data.mostCommentedPoem,
          totalViews: data.totalViews,
          totalLikes: data.totalLikes,
          totalPoems: data.totalPoems,
        });
        setLoading(false);
      });
    });
  }, []);

  return (
    <section className="flex flex-col justify-between lg:flex-row gap-5">
      <div className="font-cagliostro">
        <Greeting />
        <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty text-Text md:max-w-xl md:m-auto">
          Welcome to your administration panel Here you can create, edit and
          delete poems, you can also see some statistics of your poems
        </p>
        <div className="flex flex-col md:flex-row justify-center lg:justify-normal mt-4 gap-4">
          <CreatePoem />
          <LinkButton variant="secondary" href="/admin/messages">
            Messages
          </LinkButton>
        </div>
      </div>
      <aside className="flex flex-col justify-between items-center md:justify-normal lg:items-end gap-5 ">
        <div className="flex flex-col md:flex-row-reverse gap-5">
          <MostPoemCard
            loading={loading}
            poem={mostPoems.mostViewedPoem}
            tag="Most Viewed"
          />
          <MostPoemCard
            loading={loading}
            poem={mostPoems.mostLikedPoem}
            tag="Most Liked"
          />
          <MostPoemCard
            loading={loading}
            poem={mostPoems.mostCommentedPoem}
            tag="Most Commented"
          />
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-5">
          <TotalAdminCard
            loading={loading}
            title="Poems"
            count={mostPoems.totalPoems}
          />
          <TotalAdminCard
            loading={loading}
            title="Likes"
            count={mostPoems.totalLikes}
          />
          <TotalAdminCard
            loading={loading}
            title="Views"
            count={mostPoems.totalViews}
          />
        </div>
      </aside>
    </section>
  );
};

export default AdminPoemsDetails;
