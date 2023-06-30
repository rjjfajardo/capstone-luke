import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const useHooks = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmitLogin = (data: FormValues) => {
    console.log(data);
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
      redirect: true,
    }).then((result) => {
      console.log(result);
    });
  };

  return {
    control,
    errors,
    showPassword,
    handleClickShowPassword,
    handleSubmit,
    getSession,
    onSubmitLogin,
  };
};
