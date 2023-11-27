import NonLoginForm from "@/components/templates/Layout/NonLoginFormLayout";

import Link from "@/components/parts/Link";
import { CheckCircleRounded } from "@mui/icons-material";
import Stack from "@mui/material/Stack";

const ResetSuccessfulPage = () => {
  return (
    <NonLoginForm>
      <Stack direction="column" alignItems="center">
        <CheckCircleRounded sx={{ width: 50, height: 50 }} color="success" />
        <h3>Reset password was successful</h3>

        <Link href="/login">Return to login page</Link>
      </Stack>
    </NonLoginForm>
  );
};

export default ResetSuccessfulPage;
