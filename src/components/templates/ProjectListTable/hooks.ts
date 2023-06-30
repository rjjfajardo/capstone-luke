import useSWR from "swr";

export type FindAllProject = {
  id: string;
  title: string;
  //   procuringEntity: string;
  referenceNumber: string;
  //   areaOfDelivery: string;
  approvedBudgetContract: number;
  //   procurementMode: string;
  //   contractDuration: string;
  priority: string;
  projectAssignee: {
    user: {
      userId: string;
      fullName: string;
      image: string;
    };
  }[];
};

export const useHooks = () => {
  const { data }: { data: FindAllProject[] | undefined } = useSWR(`/project`);

  console.log(data);
  return { rows: data };
};
