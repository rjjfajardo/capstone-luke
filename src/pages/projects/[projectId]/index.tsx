import ProjectDetail from "@/components/templates/ProjectDetail";

import { useHooks } from "../../../hooks/projects/projectDetails/hooks";

const ProjectDetailPage = () => {
  const { projectId } = useHooks();

  return <ProjectDetail projectId={projectId} />;
};

export default ProjectDetailPage;
