import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stack, Box, Button } from "@mui/material";
import TextInput from "@/components/parts/TextInput";
import ProjectListTable from "@/components/templates/ProjectListTable";
import { useHooks } from "../../hooks/projects/hooks";
import PageTitle from "@/components/parts/PageTitlte";

const ProjectListPage = () => {
  const { control } = useHooks();

  return (
    <>
      <PageTitle title="PROJECTS" />
      {/* 
      <Stack
        border={1}
        boxShadow={1}
        borderRadius={1}
        color="#f5f5f5"
        p={2}
        width="100%"
      > */}
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb={3}
        height={40}
      >
        <Box display="flex" gap={1}>
          <TextInput
            control={control}
            name="project"
            placeholder="Search"
            formControlProps={{ sx: { width: 800 } }}
          />
          <Button variant="contained">Search</Button>
        </Box>
      </Stack>
      <ProjectListTable />
      {/* </Stack> */}
    </>
  );
};

export default ProjectListPage;
