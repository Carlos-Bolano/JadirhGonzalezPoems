import { CreatePoem } from "./CreatePoem";
import { LinkButton } from "./ui/LinkButton";
import { Poem } from "./PoemCard";
import Greeting from "./greeting";
import TotalAdminCard from "./TotalAdminCard";
import MostPoemCard from "./MostPoemCard";

interface AdminPoemsDetailsProps {
  totalPoems: number;
  poems: Poem[];
}

const AdminPoemsDetails = ({ totalPoems, poems }: AdminPoemsDetailsProps) => {
  const mostViewedPoem = poems.reduce(
    (max, poem) => (poem.views > max.views ? poem : max),
    poems[0]
  );

  const mostLikedPoem = poems.reduce(
    (max, poem) => (poem.likes > max.likes ? poem : max),
    poems[0]
  );

  const mostCommentedPoem = poems.reduce(
    (max, poem) => (poem.comments > max.comments ? poem : max),
    poems[0]
  );

  const totalLikes = poems.reduce((acc, poem) => acc + poem.likes, 0);
  const totalViews = poems.reduce((acc, poem) => acc + poem.views, 0);
  return (
    <section className="flex flex-col justify-between lg:flex-row gap-5">
      <div className="font-cagliostro">
        <Greeting />
        <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty text-Text md:max-w-xl md:m-auto">
          Welcome to your administration panel. Here you can create, edit, and
          delete poems, and also see some statistics of your poems.
        </p>
        <div className="flex flex-col md:flex-row justify-center lg:justify-normal mt-4 gap-4">
          <CreatePoem />
          <LinkButton variant="secondary" href="/admin/messages">
            Messages
          </LinkButton>
        </div>
      </div>
      <aside className="flex flex-col justify-between items-center md:justify-normal lg:items-end gap-5">
        <div className="flex flex-col md:flex-row-reverse gap-5">
          <MostPoemCard poem={mostViewedPoem} tag="Most Viewed" />
          <MostPoemCard poem={mostLikedPoem} tag="Most Liked" />
          <MostPoemCard poem={mostCommentedPoem} tag="Most Commented" />
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
