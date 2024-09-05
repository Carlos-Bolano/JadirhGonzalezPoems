import { CreatePoem } from "@/components/CreatePoem";
import { Poem } from "@/components/PoemCard";
import { getPoems } from "@/lib/actions/poem.actions";
import Input from "@/components/ui/Input";
import Search from "@/icons/Search";
import AdminPoemsDetails from "@/components/AdminPoemsDetails";
import UserDropdown from "@/components/UserDropdown";
import SearchablePoems from "@/components/SearchablePoems";

const AdminPage = async () => {
  let Poems: Poem[] = [];
  try {
    Poems = await getPoems();
  } catch (error) {
    console.error("Failed to fetch Poems:", error);
  }
  const totalPoems = Poems.length;

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
            id="searchInput"
          />
        </div>
      </header>
      <AdminPoemsDetails totalPoems={totalPoems} />
      <section className="mt-20">
        <div className="flex justify-center items-center flex-wrap-reverse lg:justify-between mb-10 gap-4">
          <div className="flex space-x-4">
            <button
              data-tab="all"
              className="tab-button border-2 border-Dark/50 py-2 px-6"
            >
              All Poems
            </button>
            <button
              data-tab="MostPopular"
              className="tab-button border-2 border-Dark/50 py-2 px-6"
            >
              Most Popular
            </button>
            <button
              data-tab="MostLiked"
              className="tab-button border-2 border-Dark/50 py-2 px-6"
            >
              Most Liked
            </button>
          </div>
          <span className="hidden lg:block">
            Edit your poems or write down a new one!
          </span>
          <CreatePoem />
        </div>
        <SearchablePoems poems={Poems} />
      </section>
    </section>
  );
};

export default AdminPage;
