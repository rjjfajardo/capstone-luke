import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import PageTitle from "@/components/parts/PageTitlte";
import { Stack, Box, Button } from "@mui/material";
import TextInput from "@/components/parts/TextInput";
import ProjectListTable from "@/components/templates/ProjectListTable";
import { useHooks } from "./hooks";

const ProjectListPage = () => {
	const { control } = useHooks();
	return (
		<>
			<PageTitle title="PROJECTS" />

			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				mb={2}
				height={40}
				gap={2}
				alignItems="flex-end"
			>
				<TextInput
					control={control}
					name="project"
					placeholder="Search"
					formControlProps={{
						sx: { width: "98%" },
					}}
				/>
				<Button variant="contained" sx={{ fontWeight: 500 }}>
					Search
				</Button>
			</Stack>
			<ProjectListTable />
		</>
	);
};

export default ProjectListPage;
