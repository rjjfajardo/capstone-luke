import FormBase from "@/components/parts/FormBase";
import InputLabel from "@/components/parts/InputLabel";
import NonLoginForm from "@/components/templates/Layout/NonLoginFormLayout";
import { useHooks } from "@/hooks/password/forget/reset-password/hooks";
import { isGreaterThan5Minutes } from "@/lib/isGreaterThanFiveMinutes";
import { Dangerous } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ForgotPassword } from "@prisma/client";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { Controller } from "react-hook-form";
import { prisma } from "@/prisma/prisma";

const ResetPasswordPage = ({
  data,
}: {
  data: ForgotPassword & {
    user: {
      email: string;
    };
  };
}) => {
  const { showPassword, setShowPassword, control, onSubmit } = useHooks({
    userId: data.userId,
    forgetPasswordId: data.forgotPasswordId,
  });

  return (
    <NonLoginForm>
      {isGreaterThan5Minutes(data.createdAt) ? (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Dangerous color="error" sx={{ width: 50, height: 50 }} />
          <h3>Link has expired!</h3>
          <Button
            onClick={() => Router.push("/password/forget")}
            variant="contained"
          >
            Request a new password reset
          </Button>
        </Stack>
      ) : (
        <FormBase onSubmit={onSubmit}>
          <InputLabel>Email</InputLabel>
          <Box border={1} borderRadius={1} padding={2} mb={2} color="grey.400">
            {data.user.email}
          </Box>

          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({
              field: { onChange, value },
              fieldState: { invalid, error },
            }) => (
              <>
                <InputLabel>New Password</InputLabel>
                <TextField
                  helperText={error?.message ?? undefined}
                  fullWidth
                  value={value}
                  error={invalid}
                  onChange={(value) => onChange(value)}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          />
          <Stack direction="row">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              sx={{ fontWeight: 600 }}
            >
              Confirm Change Password
            </Button>
          </Stack>
        </FormBase>
      )}
    </NonLoginForm>
  );
};

export default ResetPasswordPage;

//@ts-ignore
export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const findAccount = await prisma.forgotPassword.findFirst({
    where: {
      token: params.token,
    },
    select: {
      forgotPasswordId: true,
      userId: true,
      token: true,
      isUsed: true,
      createdAt: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(findAccount));

  return { props: { data } };
}
