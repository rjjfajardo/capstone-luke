import { useForm } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "@/lib/axios";
import { User } from "@prisma/client";

interface UserI extends Partial<User> {}

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  contactNumber: yup.string().required(),
});

export const useHooks = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  const createUserHandler = async (values: UserI) => {
    try {
      await axios({
        method: "POST",
        url: "/api/auth/staffaccount",
        data: {
          values,
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { control, onSubmit: handleSubmit(createUserHandler) };
};
