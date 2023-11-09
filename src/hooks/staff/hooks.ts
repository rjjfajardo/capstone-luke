import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const useHooks = () => {
  const router = useRouter();
  const { control } = useForm();
  return {
    control,
    router,
  };
};
