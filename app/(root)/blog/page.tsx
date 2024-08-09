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

const page = () => {
  return (
    <section className="container">
      <HeaderBlog />
      <section className="my-10">
        <div className="flex gap-4 items-center mb-10">
          <h3 className="text-Dark font-cormorant text-4xl">Filter Poems</h3>
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
        </div>
        <div className="cards">
          {Poems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} href={`/blog/${poem.id}`} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default page;
