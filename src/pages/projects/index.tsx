import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stack, Box, Button, Grid, StyledEngineProvider } from "@mui/material";
import TextInput from "@/components/parts/TextInput";
import ProjectListTable from "@/components/templates/ProjectListTable";
import { useHooks } from "../../hooks/projects/hooks";
import PageTitle from "@/components/parts/PageTitlte";

import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

const ProjectListPage = () => {
  const { control, filter, appendRequestParamForFilter } = useHooks();

  return (
    <StyledEngineProvider>
      <PageTitle title="PROJECTS" />
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} lg={12}>
          <Stack
            boxShadow={2}
            p={1}
            borderRadius={1}
            padding={2}
            gap={2}
            width={{ xs: 450, lg: "auto" }}
          >
            <TextInput
              control={control}
              name="searchValue"
              placeholder="Enter reference number"
            />

            <Button variant="contained" onClick={appendRequestParamForFilter}>
              Filter
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <div style={{ width: "100%" }}>
        <Box sx={{ height: 550, width: { xs: "32%", lg: "100%" } }}>
          <ProjectListTable searchValue={filter} />
        </Box>
      </div>
    </StyledEngineProvider>
  );
};

export default ProjectListPage;

export async function getServerSideProps(context: CtxOrReq) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
