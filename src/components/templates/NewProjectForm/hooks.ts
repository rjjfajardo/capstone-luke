import { useForm } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import type { FileWithPath } from "react-dropzone";
import { Project, User } from "@prisma/client";

// export interface FormValues {
//   title: string;
//   procuringEntity: string;
//   referenceNumber: string;
//   areaOfDelivery: string;
//   approvedBudgetContract: number;
//   procurementMode: string;
//   contractDuration: string;
//   priority: string;
//   assignee: string[];
//   files: {
//     file: string;
//     type: string;
//   }[];
// }

const schema = yup.object().shape({
  title: yup.string().required(),
  procuringEntity: yup.string().required(),
  referenceNumber: yup.string().required(),
  areaOfDelivery: yup.string().required(),
  approvedBudgetContract: yup.number().required(),
  procurementMode: yup.string().required(),
  contractDuration: yup.string().required(),
  priority: yup.string().required(),
  assignee: yup.array().of(yup.string().required("Assignee/s is required")),
});

interface FileType {
  file: string;
  fileType: string;
}

export const useHooks = () => {
  const session = useSession();
  const { data: users }: { data?: User[] } = useSWR("/user");
  const [files, setFiles] = useState<FileType[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Project>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  // const isTeamProjectEnabled = watch("isTeamProject") || false;

  // const assigneeLimit = watch("assignee") || [];
  const uploadMedia = async (acceptedFiles: FileWithPath[]) => {
    // const fileAttachment: { file: string; type: string }[] = [];

    if (acceptedFiles.length <= 0) return;

    const file = acceptedFiles[0];

    console.log(file);

    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    try {
      const response = await axios.get(
        `/api/project/upload-url?file=${filename}&fileType=${fileType}`
      );

      const { signedUrl, fields } = response.data || {};
      // if (!signedUrl || !fields) {
      //   throw new Error("Invalid response data");
      // }

      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string);
        }
      });

      await axios.put(signedUrl, formData);

      setFiles([...files, { file: filename, fileType: fileType }]);
    } catch (error) {
      // Handle error
      console.error("Failed to upload media:", error);
    }
  };

  // const assigneeOptions =

  const createProject = async (data: Project) => {
    console.log(data);
    await axios
      .post("/api/project", { ...data, files, userId: session.data?.user.id })
      .then(() => {
        reset();
        alert("ALL GOOD");
      });
  };

  const dropzoneConfig = {
    multiple: true,
    maxSize: 52428800,
    onDropAccepted: uploadMedia,
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

  // useEffect(() => {
  //   if (!isTeamProjectEnabled) {
  //     reset({ assignee: [] });
  //   }
  // }, [isTeamProjectEnabled, reset]);

  return {
    control,
    onSubmit: handleSubmit(createProject),
    errors,
    files,
    users,
    // assigneeLimit,
    // isTeamProjectEnabled,
    dropzoneConfig,
    uploadMedia,
  };
};
