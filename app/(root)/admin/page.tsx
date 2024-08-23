import AdminPoemCard from "@/components/AdminPoemCard";
import { CreatePoem } from "@/components/CreatePoem";
import Greeting from "@/components/greeting";
import MostPoemCard from "@/components/MostPoemCard";
import { Poem } from "@/components/PoemCard";
import TotalAdminCard from "@/components/TotalAdminCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuDemo } from "@/components/User";
import Search from "@/icons/Search";
import { getMostPoem, getPoems } from "@/lib/actions/poem.actions";

const AdminPage = async () => {
  const Poems: Poem[] = await getPoems();
  const totalPoems = Poems.length;
  const mostPoem = await getMostPoem();
  const {
    mostViewedPoem,
    mostLikedPoem,
    mostCommentedPoem,
    totalViews,
    totalLikes,
  } = mostPoem;

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
          <Greeting />
          <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty text-Text md:max-w-xl md:m-auto">
            Welcome to your administration panel Here you can create, edit and
            delete poems, you can also see some statistics of your poems
          </p>
          <div className="flex justify-center lg:justify-normal mt-4">
            <CreatePoem />
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
      <section className="mt-20">
        <div className="flex justify-between items-center gap-8 mb-10">
          <Select>
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
          <CreatePoem />
        </div>
        <div className="cards">
          {Poems.map((poem: Poem) => (
            <AdminPoemCard
              key={poem._id}
              poem={poem}
              href={`/blog/${poem._id}`}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default AdminPage;
