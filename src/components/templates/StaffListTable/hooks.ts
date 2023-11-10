import { User } from "@prisma/client";
import useSWR from "swr";

export interface UserWithProjectAssignee extends User {
  projectAssignee: {
    id: string;
  }[];
}

export const useHooks = () => {
  const { data: users }: { data?: UserWithProjectAssignee[] } = useSWR("/user");

  return {
    users,
  };
};
