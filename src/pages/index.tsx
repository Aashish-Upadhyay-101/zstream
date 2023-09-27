import { Button } from "zstream/ui/primitives/button";

import { api } from "zstream/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Button>zStream</Button>
    </>
  );
}
