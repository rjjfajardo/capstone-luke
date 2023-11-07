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
  postQualificationResult: {
    result: string;
    dq_remarks: string;
  };
  media: {
    fileName: string;
    fileUrl: string;
    origin: string;
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
        info?: string;
      }[];
    };
    createdAt: string;
  }[];
}

export const useHooks = (projectId: string) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    data,
    isLoading,
  }: { data: FindOneProject | undefined; isLoading: boolean } = useSWR(
    `/project/${projectId}`
  );

  const [openChangeProjectStatusDialog, setOpenChangeProjectStatusDialog] =
    useState(false);

  return {
    data,
    isEditing,
    setIsEditing,
    isLoading,
    openChangeProjectStatusDialog,
    setOpenChangeProjectStatusDialog,
  };
};
