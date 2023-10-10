import { useRouter } from "next/router";

const NewUser = () => {
  const router = useRouter();

  if (router.isReady) {
    router.push("/");
  }

  return <div>hello</div>;
};

export default NewUser;
