import { SxProps } from "@mui/material";
import Stack from "@mui/material/Stack";

const PageTitle = ({ title, sx }: { title: string; sx?: SxProps }) => {
  return (
    <Stack
      sx={sx}
      display="flex"
      justifyContent="space-between"
      fontSize={20}
      fontWeight={600}
      mb={2}
    >
      {title}
    </Stack>
  );
};

export default PageTitle;
