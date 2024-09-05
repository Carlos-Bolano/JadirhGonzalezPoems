import About from "../../sections/About";
import Contact from "../../sections/Contact";
import Cover from "../../sections/Cover";
import HowBegan from "../../sections/HowBegan";
import Latest from "../../sections/Latest";

export default function Home() {
  return (
    <>
      <Cover />
      <HowBegan />
      <About />
      <Latest />
      <Contact />
    </>
  );
}
