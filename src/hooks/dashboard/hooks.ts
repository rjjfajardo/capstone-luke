import { getSession, useSession } from "next-auth/react";

import useSWR from "swr";

export const useHooks = () => {
  const { data: projects } = useSWR("/project-assignee");
  const { data: user, status } = useSession();

  // console.log(data);

  // const assigneeProjects =

  return {
    user,
    status,
    projects,
    getSession,
  };
};
