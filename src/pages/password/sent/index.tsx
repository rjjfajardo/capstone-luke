import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TextInput from "@/components/parts/TextInput";
import NonLoginForm from "@/components/templates/Layout/NonLoginFormLayout";

import { useHooks } from "../../../hooks/password/forget/hooks";
import { CheckCircleRounded, MarkEmailRead } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Link from "@/components/parts/Link";

function ResetLinkSentPage() {
  const { control, onSubmit } = useHooks();

  return (
    <NonLoginForm>
      <Stack direction="column" alignItems="center">
        <MarkEmailRead sx={{ width: 50, height: 50 }} color="success" />
        <h3>Reset password link is sent. Please check your email.</h3>

        <Link href="/login">Return to login page</Link>
      </Stack>
    </NonLoginForm>
  );
}

export default ResetLinkSentPage;
