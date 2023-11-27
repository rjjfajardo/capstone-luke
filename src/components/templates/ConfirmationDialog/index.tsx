import React from "react";
import Dialog from "@/components/parts/Dialog";

interface ConfirmationDialogProps {
  handleClose: () => void;
  show: boolean;
  signOut: () => void;
}

const ConfirmationDialog = ({
  handleClose,
  show,
  signOut,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={show}
      dialogTitle="Are you sure you want to logout?"
      handleClose={handleClose}
      handleCancel={handleClose}
      handleSuccess={signOut}
      cancelButtonProps={{ variant: "outlined", color: "primary" }}
      cancelButtonLabel="Cancel"
      successButtonProps={{ variant: "contained", color: "primary" }}
      successButtonLabel="Logout"
    ></Dialog>
  );
};

export default ConfirmationDialog;
