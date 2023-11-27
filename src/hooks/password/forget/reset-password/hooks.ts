import {
  UserI,
  isChangePasswordOnlySchema,
} from "@/components/templates/Profile/hooks";
import { useSnackbar } from "@/hooks/useSnackbar";
import axios from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useHooks = ({
  userId,
  forgetPasswordId,
}: {
  userId: string;
  forgetPasswordId: number;
}) => {
  const { setSnackbarProps } = useSnackbar();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, reset, handleSubmit } = useForm<
    UserI & { forgetPasswordId: number }
  >({
    resolver: yupResolver(isChangePasswordOnlySchema),
  });

  const resetPasswordHandler = async (
    values: UserI & { forgetPasswordId: number }
  ) => {
    try {
      await axios({
        method: "POST",
        url: "/api/auth/reset-password",
        data: {
          values: { ...values, forgetPasswordId },
          userId,
        },
      }).then((res) => {
        setSnackbarProps({
          open: true,
          message:
            "Successfully updated password. Please check your email if your forgotten it.",
          severity: "success",
        });
        Router.push("/password/done");
      });
    } catch (e) {
      reset({
        newPassword: "",
      });

      setSnackbarProps({
        open: true,
        message: "Error while trying to update password",
        severity: "error",
      });
    }
  };

  return {
    showPassword,
    setShowPassword,
    control,
    onSubmit: handleSubmit(resetPasswordHandler),
  };
};
