import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /login page
    router.push("/login");
  }, []);

  return null; // This is an empty component, as it will immediately redirect.
};

export default Home;
