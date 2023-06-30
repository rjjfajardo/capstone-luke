import ProjectDetail from "@/components/templates/ProjectDetail";
import Box from "@mui/material/Box";

import { useHooks } from "./hooks";

const ProjectHeader = () => {
  return (
    <Box
      border="1px solid red"
      margin={0}
      padding={0}
      sx={{
        position: "sticky",
        top: 0,
        // padding: 2,
        zIndex: 1,
      }}
    >
      Sticky Header
    </Box>
  );
};

const ProjectDetailPage = () => {
  const { projectId } = useHooks();

  return (
    <>
      {/* <ProjectHeader /> */}
      <ProjectDetail projectId={projectId} />
    </>
  );
};

export default ProjectDetailPage;
