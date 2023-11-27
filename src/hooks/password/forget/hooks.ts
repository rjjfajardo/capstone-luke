import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/lib/yup";
import axios from "@/lib/axios";
import { useState } from "react";
import Router from "next/router";

interface FormValues {
  email: string;
}

export const useHooks = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Email in invalid")
          .required("This field is required"),
      })
    ),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const sendResetPasswordLinkHandler = async (data: FormValues) => {
    await axios
      .post("/api/auth/password/reset-link", {
        data: {
          data,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            {
              pathname: "/password/sent",
              query: {
                message: "Please check your email for more details.",
              },
            },
            "/password/sent"
          );
        }
      })
      .catch((error) => {
        setErrorMessage("Your email doesn't exist.");
        console.log(error);
      });
  };

  return {
    control,
    onSubmit: handleSubmit(sendResetPasswordLinkHandler),
    errorMessage,
  };
};
