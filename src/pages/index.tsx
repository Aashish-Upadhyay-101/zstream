import { useSession } from "next-auth/react";
import { Navbar } from "zstream/ui/components";

import { api } from "zstream/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <Navbar />
    </>
  );
}
