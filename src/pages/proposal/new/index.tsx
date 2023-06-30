  import PageTitle from "@/components/parts/PageTitlte";
  import NewProjectForm from "@/components/templates/NewProjectForm";
  import { Stack } from "@mui/material";

  const CreateProjectPage = () => {
    return (
      <>
        <PageTitle title="Create New Project" />

        <Stack
          height="auto"
          boxShadow={1}
          borderRadius={1}
          sx={{ backgroundColor: "#ffffff" }}
        >
          <NewProjectForm />
        </Stack>
      </>
    );
  };

  export default CreateProjectPage;
