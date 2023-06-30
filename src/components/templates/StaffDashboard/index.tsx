import PageTitle from "@/components/parts/PageTitlte";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import AssignedProjectTable from "../AssignedProjectTable";
import { Typography } from "@mui/material";
import { getColor } from "@/lib/getColor";
// import { useHooks } from "./hooks";
import Link from "@/components/parts/Link";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

interface ProjectsProps {
  projects: {
    project: {
      id: string;
      title: string;
      referenceNumber: string;
      priority: string;
      status: string;
      users: {
        fullName: string;
      }[];
    };
  }[];
}

const StaffDashboard = ({ projects }: ProjectsProps) => {
  // const { getColor } = useHooks();
  return (
    <>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <PageTitle title="Good Morning Luke" sx={{ fontSize: 40 }} />
        <Box color="#BCB7B7" fontSize={20}>
          Wednesday, February 10, 2023
        </Box>
      </Stack>
      <Box fontSize={20} fontWeight={500}>
        Assigned Projects
      </Box>
      <Box display="flex" justifyContent="flex-end" my={2} border={1}>
        TextField
      </Box>
      {/* <AssignedProjectTable /> */}
      {/* {JSON.stringify(projects)} */}
      <Grid container spacing={4}>
        {projects?.map(({ project }) => (
          <Grid item xs={12} lg={4} key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              sx={{ textDecoration: "none" }}
            >
              <Stack
                border={1}
                height={150}
                boxShadow={1}
                p={1}
                borderRadius={1}
                color="#f5f5f5"
              >
                {/* TODO: Company Metrics/Statistics */}
                <Stack color="#000000">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignContent="center"
                    mb={1.5}
                  >
                    <Typography color="#BCB7B7">
                      {project.referenceNumber}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: getColor(project.priority),
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#ffffff",
                        width: "fit-content",
                        padding: 0.5,
                      }}
                    >
                      {project.priority}
                    </Box>
                  </Box>
                  <Typography>{project.title}</Typography>
                  {/* <Typography>{project.status}</Typography> */}

                  {/* <Box display="flex" justifyContent="space-between">
                    <AvatarGroup>
                      {project?.users?.map((u) => (
                        <Avatar key={u.fullName}>{u.fullName[0]}</Avatar>
                      ))}
                    </AvatarGroup>
                  </Box> */}
                </Stack>
              </Stack>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StaffDashboard;
