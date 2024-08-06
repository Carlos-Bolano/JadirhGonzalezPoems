import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-cagliostro capitalize">hello world</h1>

      <Button variant="default" size={"lg"}>
        <span className="font-cormorant">hello</span>
      </Button>
    </>
  );
}
