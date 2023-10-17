import { useForm } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Project } from "@prisma/client";

export interface FormValues {
  title: string;
  procuringEntity: string;
  referenceNumber: string;
  areaOfDelivery: string;
  approvedBudgetContract: number;
  procurementMode: string;
  contractDuration: string;
  priority: string;
  //   assignee: string[];
  //   files: {
  //     file: string;
  //     type: string;
  //   }[];
}

// const schema = yup.object().shape({
//   title: yup.string().required(),
//   procuringEntity: yup.string().required(),
//   referenceNumber: yup.string().required(),
//   areaOfDelivery: yup.string().required(),
//   approvedBudgetContract: yup.number().required(),
//   procurementMode: yup.string().required(),
//   contractDuration: yup.string().required(),
//   priority: yup.string().required(),
//   // assignee: yup.array().of(yup.string().required("Assignee/s is required")),
// });

interface UserFindAll {
  userId: string;
  fullName: string;
}

export const useHooks = ({ projectId }: { projectId: string }) => {
  const session = useSession();
  //   const { data: users }: { data?: UserFindAll[] } = useSWR("/user");
  const { data: project }: { data: Project | undefined } = useSWR(
    `/project/${projectId}`
  );
  // const [files, setFiles] = useState<FileType[]>([]);
  // const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: {
      title: project?.title,
      procuringEntity: project?.procuringEntity,
      referenceNumber: project?.referenceNumber,
      areaOfDelivery: project?.areaOfDelivery,
      approvedBudgetContract: project?.approvedBudgetContract,
      contractDuration: project?.contractDuration,
      procurementMode: project?.procurementMode,
      priority: project?.priority,
    },
    // resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  // const isTeamProjectEnabled = watch("isTeamProject") || false;

  // const assigneeOptions =

  //   const updateProject = async (data: FormValues) => {
  //     console.log(data);
  //     await axios
  //       .post("/api/project", { ...data, files, userId: session.data?.user.id })
  //       .then(() => {
  //         reset();
  //         alert("ALL GOOD");
  //       });
  //   };

  return {
    control,
    project,
    // onSubmit: handleSubmit(createProject),
    errors,
    // files,
    // users,
  };
};
