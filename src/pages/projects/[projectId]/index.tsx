import ProjectDetail from "@/components/templates/ProjectDetail";
import Box from "@mui/material/Box";

import { useHooks } from "../../../hooks/projects/projectDetails/hooks";

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
