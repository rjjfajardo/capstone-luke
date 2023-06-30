import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "@/components/parts/TextInput";
import SendIcon from "@mui/icons-material/Send";
import { useHooks } from "./hooks";
import FormBase from "@/components/parts/FormBase";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { formatDistance } from "date-fns";

interface Props {
  mobileHandleCloseDrawer: (close: boolean) => void;
  projectId: string;
  comments: {
    user: {
      fullName: string;
    };
    createdAt: string;
    text: string;
  }[];
}

const CommentsDrawer = ({
  mobileHandleCloseDrawer,
  projectId,
  comments,
}: Props) => {
  const { control, onSubmit, session } = useHooks({ projectId });
  return (
    <Stack fontSize={20} fontWeight={600}>
      <Typography fontWeight={600} fontSize={18}>
        Comments
      </Typography>
      <FormBase onSubmit={onSubmit}>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          gap={1}
          color="#BCB7B7"
          fontSize={14}
        >
          <Avatar>{session.data?.user.name}</Avatar>

          <TextInput
            control={control}
            //  label="Add comment"
            name="text"
            formControlProps={{
              sx: {
                width: "88%",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "none" },
              },
            }}
          />
          <IconButton
            type="submit"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "primary.main",
              borderRadius: 1,
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#246BFD",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </FormBase>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          size="large"
          onClick={() => mobileHandleCloseDrawer(false)}
          sx={{ display: { md: "none", xs: "block" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* <Divider sx={{ marginTop: 1 }} /> */}

      <Stack
        height={580}
        maxHeight={580}
        mt={4}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {comments.map((c) => (
          <>
            <Box display="flex" justifyContent="space-between" mb={2} mt={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar>{c.user.fullName[0]}</Avatar>
                <Typography fontWeight={600}>{c.user.fullName}</Typography>
              </Box>
              <Typography mr={2}>
                {formatDistance(new Date(c.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </Typography>
            </Box>
            <Box fontSize={13} fontWeight={400} ml={6}>
              {c.text}
            </Box>
            <Divider sx={{ marginTop: 1 }} />
          </>
        ))}
      </Stack>
    </Stack>
  );
};
export default CommentsDrawer;
