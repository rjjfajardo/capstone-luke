import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { PurchaseOrderProps } from ".";

interface HookProps
  extends Pick<PurchaseOrderProps, "handleClose" | "status" | "projectId"> {}

export const useHooks = ({ handleClose, projectId, status }: HookProps) => {
  const [file, setFile] = useState<{
    fileName: string | undefined;
    fileUrl: string | undefined;
  }>();

  const { control, reset } = useForm();

  const handleResetAndClose = () => {
    reset();
    handleClose();
  };

  const session = useSession();

  const updateProjectPhase = async () => {
    await axios
      .put(`/api/project/${projectId}`, {
        status,
        projectId,
        userId: session.data?.user.id,
        file: file,
      })
      .then(() => {
        handleResetAndClose();
        mutate(`/project/${projectId}`);
      });
  };

  return {
    control,
    handleResetAndClose,
    file,
    setFile,
    onSubmit: updateProjectPhase,
  };
};
