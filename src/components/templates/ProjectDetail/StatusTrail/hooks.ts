import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

interface Steps {
  label: string;
}

export const useHooks = () => {
  const session = useSession();

  const steps: Steps[] = [
    {
      label: "Pre Bid",
    },
    {
      label: "Bidding",
    },
    {
      label: "Post Qualification",
    },
    {
      label: "Notice To Proceed",
    },
    {
      label: "Purchase Order",
    },
    {
      label: "Collection of Receipt",
    },
    {
      label: "Acceptance",
    },
  ];

  // const [isUpdatingPhase, setIsUpdatingPhase] = useState<boolean>(false);
  const [selectedPhaseName, setSelectedPhaseName] = useState<string>("");
  const [openPostQualificationDialog, setOpenPostQualificationDialog] =
    useState<boolean>(false);

  const [openNoticeToProceedDialog, setOpenNoticeToProceedDialog] =
    useState<boolean>(false);

  const [openPurchaseOrderDialog, setOpenPurchaseOrderDialog] =
    useState<boolean>(false);
  const [acceptanceDialog, setOpenAcceptanceDialog] = useState<boolean>(false);

  const isAllowToUpdatePhase = (
    index: number,
    currentIndex: number
  ): boolean => {
    for (let i = currentIndex; i < steps.length; i++) {
      if (i < index || i >= index + 2) {
        // Disable indexes before the specified index and two positions ahead
        // Adjust the condition based on your specific requirements
        // Return false for the disabled indexes
        return false;
      } else {
        return true;
      }
    }
    return true; // Enable the specified index
  };

  const findIndexByLabel = (targetLabel: string, steps: Steps[]) => {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].label === targetLabel) {
        return i; // Return the index if the label matches the target
      }
    }
    return -1; // Return -1 if the label is not found
  };

  const statuses = [
    "Purchase Order",
    "Notice To Proceed",
    "Post Qualification",
  ];

  const handleStatusUpdate = async (status: string, projectId: string) => {
    if (!statuses.includes(status)) {
      setSelectedPhaseName(status);
    }

    if (status === "Post Qualification") {
      setSelectedPhaseName(status);
      setOpenPostQualificationDialog(true);
      return;
    }

    if (status === "Notice To Proceed") {
      setOpenNoticeToProceedDialog(true);
      return;
    }

    if (status === "Purchase Order") {
      setOpenPurchaseOrderDialog(true);
      return;
    }

    if (status === "Acceptance") {
      setOpenPurchaseOrderDialog(true);
      return;
    }

    try {
      await axios
        .put(`/api/project/${projectId}`, {
          projectId,
          status,
          userId: session.data?.user.id,
        })
        .then((res) => {
          mutate(`/project/${projectId}`);
          console.log(res);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleStatusUpdate,
    findIndexByLabel,
    isAllowToUpdatePhase,
    selectedPhaseName,
    openPostQualificationDialog,
    setOpenPostQualificationDialog,
    openNoticeToProceedDialog,
    setOpenNoticeToProceedDialog,
    openPurchaseOrderDialog,
    setOpenPurchaseOrderDialog,
    acceptanceDialog,
    setOpenAcceptanceDialog,
  };
};
