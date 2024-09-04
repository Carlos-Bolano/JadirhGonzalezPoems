import React from "react";
import Greeting from "./greeting";
import { CreatePoem } from "./CreatePoem";
import MostPoemCard from "./MostPoemCard";
import TotalAdminCard from "@/components/TotalAdminCard";
import { getMostPoem } from "@/lib/actions/poem.actions";
import { LinkButton } from "./ui/LinkButton";

const AdminPoemsDetails = async ({ totalPoems }: { totalPoems: number }) => {
  const mostPoem = await getMostPoem();
  const {
    mostViewedPoem,
    mostLikedPoem,
    mostCommentedPoem,
    totalViews,
    totalLikes,
  } = mostPoem;
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
            title={mostViewedPoem.title}
            content={mostViewedPoem.content}
            count={mostViewedPoem.views}
            href={"/blog/" + mostViewedPoem._id}
            tag="Most Viewed"
          />
          <MostPoemCard
            title={mostLikedPoem.title}
            content={mostLikedPoem.content}
            count={mostLikedPoem.likes}
            href={"/blog/" + mostLikedPoem._id}
            tag="Most Liked"
          />
          <MostPoemCard
            title={mostCommentedPoem.title}
            content={mostCommentedPoem.content}
            count={mostCommentedPoem.comments.length}
            href={"/blog/" + mostCommentedPoem._id}
            tag="Most Commented"
          />
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-5">
          <TotalAdminCard title="Poems" count={totalPoems} />
          <TotalAdminCard title="Likes" count={totalLikes} />
          <TotalAdminCard title="Views" count={totalViews} />
        </div>
      </aside>
    </section>
  );
};

export default AdminPoemsDetails;
