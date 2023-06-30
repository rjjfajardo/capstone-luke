import { User } from "@prisma/client";
import useSWR from "swr";

export const useHooks = () => {
  const { data: users }: { data?: User[] } = useSWR("/user");

  return {
    users,
  };
};
