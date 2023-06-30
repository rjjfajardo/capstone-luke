import Dialog from "@/components/parts/Dialog";
import Box from "@mui/material/Box";

// import TextInput from "@/components/parts/TextInput/index";
import { useHooks } from "./hooks";
import FileDropzone from "@/components/parts/FileDropzone";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import moment from "moment";

export interface AcceptanceProps {
  projectId: string;
  open: boolean;
  handleClose: () => void;
}

const AcceptanceDialog = ({
  projectId,
  open,
  handleClose,
}: AcceptanceProps) => {
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
        {/* <Controller
          name="dateOfSignature"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error, invalid },
          }) => (
            <DatePicker
              // label="Birthdate"
              disableFuture
              value={value}
              // eslint-disable-next-line
              onChange={(value) => onChange(moment(value).format("YYYY-MM-DD"))}
              renderInput={(params) => (
                <TextField
                  helperText={invalid ? error?.message : null}
                  variant="filled"
                  margin="dense"
                  fullWidth
                  color="primary"
                  autoComplete="bday"
                  {...params}
                  error={invalid}
                />
              )}
            />
          )}
        /> */}
      </Box>
    </Dialog>
  );
};

export default AcceptanceDialog;
