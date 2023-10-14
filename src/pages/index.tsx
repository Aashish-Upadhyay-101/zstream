import { useSession } from "next-auth/react";
import { Navbar } from "zstream/ui/components";

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
