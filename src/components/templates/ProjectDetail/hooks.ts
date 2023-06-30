import { useState } from "react";
import useSWR from "swr";

export interface FindOneProject {
  title: string;
  procuringEntity: string;
  referenceNumber: string;
  areaOfDelivery: string;
  approvedBudgetContract: number;
  procurementMode: string;
  contractDuration: string;
  priority: string;
  status: string;
  media: {
    id: string;
    file: string;
    type: string;
  }[];
  comment: {
    user: {
      fullName: string;
    };
    createdAt: string;
    text: string;
  }[];
  activityLog: {
    user: {
      fullName: string;
    };
    after: {
      values: {
        message: string;
      }[];
    };
    createdAt: string;
  }[];
}

export const useHooks = (projectId: string) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data }: { data: FindOneProject | undefined } = useSWR(
    `/project/${projectId}`
  );

  const [openChangeProjectStatusDialog, setOpenChangeProjectStatusDialog] =
    useState(false);
  return {
    data,
    isEditing,
    setIsEditing,
    openChangeProjectStatusDialog,
    setOpenChangeProjectStatusDialog,
  };
};
