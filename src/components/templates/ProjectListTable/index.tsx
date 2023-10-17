import Link from "@/components/parts/Link";
import Loading from "@/components/parts/Loading";
import MoreVertMenu from "@/components/parts/MoreVertMenu";
import { Avatar, AvatarGroup, Chip, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { FindAllProject, useHooks } from "./hooks";
import { formatToPhp } from "@/lib/formatToPhp";
import { getPriorityColor } from "@/lib/getColor";

const ProjectListTable = () => {
	const { rows, router } = useHooks();

	if (!rows) return <Loading />;

	const columns: GridColDef<FindAllProject>[] = [
		{
			field: "title",
			headerName: "Title",
			width: 400,
			minWidth: 200,
			editable: true,
			renderCell: (params) => (
				<Link
					href={`/projects/${params.row.id}`}
					sx={{ textDecoration: "underline", color: "inherit" }}
				>
					{params.row.title}
				</Link>
			),
		},
		{
			field: "referenceNumber",
			headerName: "Reference Number",
			width: 200,
			minWidth: 100,
		},
		{
			field: "approvedBudgetContract",
			headerName: "Budget",
			width: 150,
			minWidth: 100,
			renderCell: (params) =>
				formatToPhp(params.row.approvedBudgetContract),
		},
		{
			field: "status",
			headerName: "Status",
			width: 200,
			minWidth: 100,
		},
		{
			field: "priority",
			headerName: "Priority",
			width: 150,
			minWidth: 100,
			renderCell: (params) => (
				<Chip
					label={params.row.priority}
					color={getPriorityColor(params.row.priority)}
				/>
			),
		},
		{
			field: "assignees",
			headerName: "Assignee/s",
			width: 200,
			minWidth: 150,
			renderCell: (params) => (
				<AvatarGroup>
					{params.row.projectAssignee &&
						params.row.projectAssignee.map(({ user }) => (
							<Avatar
								key={user.userId}
								// style={{ height: 20, width: 20 }}
							>
								{user.fullName[0]}
							</Avatar>
						))}
				</AvatarGroup>
			),
		},
		{
			field: "Action",
			type: "actions",
			width: 63,
			minWidth: 50,
			getActions: (params) => getActionMenu(params),
		},
	];

	const getActionMenu = (params: GridRowParams): JSX.Element[] => {
		return [
			<MoreVertMenu
				key={params.row.id}
				options={[
					{
						label: "Edit",
						onClick: () =>
							router.push(`/projects/${params.row.id}`),
					},
				]}
			/>,
		];
	};

	return (
		<Box sx={{ height: 600, width: 1363 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				disableRowSelectionOnClick
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 15,
						},
					},
				}}
				sx={{
					"& .MuiDataGrid-columnHeadersInner": {
						backgroundColor: "grey.200",
					},
					"& .MuiDataGrid-columnHeaderTitle": {
						fontWeight: 700,
					},
				}}
			/>
		</Box>
	);
};

export default ProjectListTable;
