import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styled } from "@mui/material";
import Divider from "@mui/material/Divider";
import ProjectDetailDrawers from "./Drawers";

import StatusTrail from "./StatusTrail";
import { useHooks } from "./hooks";
import { formatToPhp } from "@/lib/formatToPhp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import EditProjectForm from "@/templates/";
import EditProjectForm from "../EditProjectForm";
import CommentsDrawer from "./Comments";
import ActivityLogsDrawer from "./ActivityLogs";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledBox = styled(Box)({
  display: "flex",
  gap: 10,
});

// const ProjectInfo = () => {
//   return (
//     <StyledBox>

//     </StyledBox>
//   )
// }

// const FixedHeader = styled(Box)(({ theme  }) => ({
//   display: "flex",
//   alignItems: "center",
//   zIndex: 1,
//   backgroundColor: "rgba(255, 255, 255, 0.8)",
//   backdropFilter: "blur(6px)",
//   position: "sticky",
//   // top: isMobilePath ? -16 : 48 - 16,
//   paddingTop: theme.spacing(3),
//   paddingBottom: theme.spacing(1),
//   paddingLeft: theme.spacing(3),
//   paddingRight: theme.spacing(3),
//   [theme.breakpoints.down("sm")]: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//   },
// }));

// const ProjectHeader = () => {
//   return (
//     <FixedHeader>
//       <Box>

//       </Box>
//     </FixedHeader>
//   )
// }

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  const { data, isEditing, setIsEditing } = useHooks(projectId);

  return (
    <>
      <Grid container spacing={1.5}>
        <Grid item xs={12} lg={12}>
          <Stack height={80} boxShadow={2} p={1} borderRadius={1} padding={2}>
            {" "}
            <Box
              sx={{
                fontSize: 13,
                color: "#BCB7B7",
                fontWeight: 500,
              }}
            >
              Title
              <Typography fontSize={18} color="#000000" fontWeight={600}>
                {data?.title}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Stack height={130} boxShadow={2} p={1} borderRadius={1} padding={2}>
            <ProjectDetailDrawers
              priority={data?.priority || ""}
              projectId={projectId}
              comments={data?.comment || []}
              activityLog={data?.activityLog || []}
              media={data?.media || []}
            />
            <StatusTrail status={data?.status || ""} projectId={projectId} />
          </Stack>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Stack
            height="auto"
            boxShadow={2}
            p={1}
            borderRadius={1}
            mb={1}
            padding={2}
            gap={3}
          >
            <Box display="flex" justifyContent="flex-end">
              {isEditing ? (
                <Stack direction="row" justifyContent="center" gap={2}>
                  <Button
                    type="submit"
                    // color="primary"
                    variant="outlined"
                    sx={{ width: 80 }}
                    onClick={() => setIsEditing(false)}
                  >
                    {"Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ width: 80 }}
                  >
                    {"Save"}
                  </Button>
                </Stack>
              ) : (
                <>
                  <IconButton
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
                    onClick={() => setIsEditing(true)}
                  >
                    <ModeEditIcon />
                  </IconButton>
                </>
              )}
            </Box>
            {isEditing ? (
              <>
                <EditProjectForm projectId={projectId} />
              </>
            ) : (
              <Stack display="flex" flexDirection="row" flexShrink={2} gap={6}>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Procuring Entity
                  <Typography fontSize={17} color="#000000">
                    {data?.procuringEntity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Reference Number
                  <Typography fontSize={17} color="#000000">
                    {data?.referenceNumber}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Area of Delivery
                  <Typography fontSize={17} color="#000000">
                    {data?.areaOfDelivery}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Approved Budget Contract
                  <Typography fontSize={17} color="#000000">
                    {formatToPhp(Number(data?.approvedBudgetContract))}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Procurement Mode
                  <Typography fontSize={17} color="#000000">
                    {data?.procurementMode}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Contract Duration
                  <Typography fontSize={17} color="#000000">
                    {`${data?.contractDuration} days`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Priority
                  <Typography fontSize={17} color="#000000">
                    {data?.priority}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Stack height="auto" boxShadow={2} p={1} borderRadius={1} padding={2}>
            {/* <Typography fontSize={18} fontWeight={600} mb={1}>
              {" "}
              Activity Logs
            </Typography> */}
            {/* {data?.media.map((d) => (
              <Box key={d.id} border={1} width="100%" p={2} mb={1}>
                {d.file}
              </Box>
            ))} */}
            <ActivityLogsDrawer
              activityLog={data?.activityLog || []}
              mobileHandleCloseDrawer={() => console.log("s")}
            />
          </Stack>
          <Button
            type="submit"
            // color="primary"
            color="error"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setIsEditing(false)}
            startIcon={<DeleteIcon />}
          >
            {"Delete Project"}
          </Button>
        </Grid>

        {/* <Grid item xs={12} lg={12}>
          <Stack height={480} boxShadow={2} p={1} borderRadius={1} padding={2}>
            <CommentsDrawer
              projectId={projectId}
              comments={data?.comment || []}
              mobileHandleCloseDrawer={() => console.log("asdasd")}
            />
          </Stack>
        </Grid> */}
      </Grid>
    </>
  );
};

export default ProjectDetail;
