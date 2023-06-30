import Dialog from "@/components/parts/Dialog";
import Box from "@mui/material/Box";

import SelectInput from "@/components/parts/SelectInput";
import TextInput from "@/components/parts/TextInput/index";
import FileDropzone from "@/components/parts/FileDropzone";

import { useHooks } from "./hooks";

export interface PurchaseOrderProps {
  projectId: string;
  open: boolean;
  handleClose: () => void;
}

const PurchaseOrderDialog = ({
  projectId,
  open,
  handleClose,
}: PurchaseOrderProps) => {
  const { control, handleResetAndClose, dropzoneConfig } = useHooks({
    handleClose,
  });
  return (
    <Dialog
      open={open}
      dialogTitle={"Project Status"}
      handleClose={handleResetAndClose}
      handleCancel={handleResetAndClose}
      handleSuccess={() => {}}
      cancelButtonProps={{ variant: "outlined", color: "primary" }}
      cancelButtonLabel={"Close"}
      successButtonProps={{ variant: "contained", color: "primary" }}
      successButtonLabel={"Confirm"}
      // disabled={disableButton}
    >
      <Box>
        <FileDropzone
          useDropzoneProps={dropzoneConfig}
          dropzoneTitle="Drag and drop files here or click to add."
        />
      </Box>
    </Dialog>
  );
};

export default PurchaseOrderDialog;
