import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NoticeToProceedProps } from ".";

interface HookProps extends Pick<NoticeToProceedProps, "handleClose"> {}

const schema = yup.object().shape({
  // status: yup.string().required(),
  dateOfSignature: yup.string().required(),
});

export const useHooks = ({ handleClose }: HookProps) => {
  const { control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleResetAndClose = () => {
    reset();
    handleClose();
  };

  const dropzoneConfig = {
    multiple: true,
    maxSize: 52428800,
    onDropAccepted: () => console.log(""),
    onDropRejected: () => {
      console.log("File type not accepted");
    },
    //disabled: loading,
    accept: "image/*, application/pdf",
    // onDropAccepted: uploadFiles,
    // onDropRejected: () => {
    //   enqueueSnackbar("File type not accepted");
    // },
    // disabled: loading,
  };

  return { control, handleResetAndClose, dropzoneConfig };
};
