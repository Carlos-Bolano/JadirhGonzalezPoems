import PoemCard, { Poem } from "@/components/PoemCard";

import HeaderBlog from "@/components/HeaderBlog";

import { getPoems } from "@/lib/actions/poem.actions";

const BlogPage = async () => {
  const Poems: Poem[] = await getPoems();
  return (
    <section className="container">
      <HeaderBlog />
      <section className="my-10">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
          <h3 className="text-3xl font-bold md:text-4xl font-cormorant text-center lg:text-start text-balance text-Dark">
            Filter Poems
          </h3>
        </div>

        <div className="cards">
          {Poems.map((poem: Poem) => (
            <PoemCard key={poem._id} poem={poem} href={`/blog/${poem._id}`} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default BlogPage;
