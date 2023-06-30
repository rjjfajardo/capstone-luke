import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//TODO: Put tabs eg ('Files' and 'Medias' and then group by from what status )
interface Props {
  mobileHandleCloseDrawer: (close: boolean) => void;
}
const AttachmentsDrawer = ({ mobileHandleCloseDrawer }: Props) => {
  return (
    <Stack fontSize={20} fontWeight={600}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        Attachments
        <IconButton
          size="large"
          onClick={() => mobileHandleCloseDrawer(false)}
          sx={{ display: { md: "none", xs: "block" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ marginTop: 1 }} />
    </Stack>
  );
};
export default AttachmentsDrawer;
