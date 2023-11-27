import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TextInput from "@/components/parts/TextInput";
import NonLoginForm from "@/components/templates/Layout/NonLoginFormLayout";

import { useHooks } from "../../../hooks/password/forget/hooks";
import Link from "@/components/parts/Link";

function PasswordForgetPage() {
  const { control, onSubmit, errorMessage } = useHooks();

  return (
    <NonLoginForm>
      <Box
        sx={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {"Reset your password"}
      </Box>
      <Box sx={{ color: "#495057", mb: 2 }}>
        {
          "To reset your password, please enter the email address you use to log in."
        }
      </Box>
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            "& .MuiFormControl-root": {
              width: "100%",
            },
          }}
        >
          <TextInput
            label={"Email"}
            name="email"
            control={control}
            placeholder={"Email"}
            defaultValue=""
            rules={{ required: true }}
            formatType="email"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%", mt: 2, fontWeight: "bold" }}
        >
          {"Receive reset link"}
        </Button>

        {errorMessage && (
          <Box
            sx={{
              textAlign: "center",
              color: "error.main",
              fontSize: "0.75rem",
              mt: 1,
            }}
          >
            {errorMessage}
          </Box>
        )}
      </form>
      <Link
        href="/login"
        sx={{ mt: 2, justifyContent: "center", display: "flex" }}
      >
        Return to login page
      </Link>
    </NonLoginForm>
  );
}

export default PasswordForgetPage;
