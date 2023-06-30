import { useSession, signOut } from "next-auth/react";

export const useHooks = () => {
  const { data: user } = useSession();

  return {
    user,
    signOut,
  };
};
