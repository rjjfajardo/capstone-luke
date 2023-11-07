import Dialog from "@/components/parts/Dialog";
import Box from "@mui/material/Box";

// import TextInput from "@/components/parts/TextInput/index";
import { useHooks } from "./hooks";

import { UploadDropzone } from "@/utils/uploadthing";
import FilePreviewPanel from "@/components/parts/FilePreviewPanel";
import { UploadFileResponse } from "uploadthing/client";

export interface CollectionOfReceiptDialogProps {
  projectId: string;
  open: boolean;
  handleClose: () => void;
  status: string;
}

const CollectionOfReceiptDialog = ({
  projectId,
  open,
  handleClose,
  status,
}: CollectionOfReceiptDialogProps) => {
  const { handleResetAndClose, file, setFile, onSubmit } = useHooks({
    handleClose,
    projectId,
    status,
  });
  return (
    <Dialog
      open={open}
      dialogTitle="Collection Of Receipt"
      info="Kindly upload supporting document."
      handleClose={handleResetAndClose}
      handleCancel={handleResetAndClose}
      handleSuccess={() => onSubmit()}
      cancelButtonProps={{ variant: "outlined", color: "primary" }}
      cancelButtonLabel={"Close"}
      successButtonProps={{ variant: "contained", color: "primary" }}
      successButtonLabel={"Confirm"}
      disabled={!file}
    >
      {file?.fileName && file.fileUrl ? (
        <FilePreviewPanel
          fileName={file.fileName}
          fileUrl={file.fileUrl}
          onRemove={() => setFile({ fileName: "", fileUrl: "" })}
        />
      ) : (
        <Box>
          <UploadDropzone
            endpoint="bucketFiles"
            onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
              // Do something with the response
              // console.log(});
              setFile({ fileName: res?.[0].name, fileUrl: res?.[0].url });
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              // Do something once upload begins
              console.log("Uploading: ", name);
            }}
          />
        </Box>
      )}
    </Dialog>
  );
};

export default CollectionOfReceiptDialog;
