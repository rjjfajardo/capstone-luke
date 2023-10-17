import { Button, Avatar, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useHooks } from "./hooks";
import { User } from ".prisma/client";
import Loading from "@/components/parts/Loading";
import MoreVertMenu from "@/components/parts/MoreVertMenu";

const StaffListTable = () => {
	const { users } = useHooks();

	if (!users?.length) return <Loading />;

	const columns: GridColDef<User>[] = [
		{
			field: "fullName",
			headerName: "Name",
			width: 300,
			minWidth: 200,
			renderCell: (params) => (
				<Stack
					display="flex"
					flexDirection="row"
					gap={1}
					alignItems="center"
				>
					<Avatar sx={{ height: 28, width: 28 }}>
						{params.row.fullName?.[0]}
					</Avatar>
					{params.row.fullName}
				</Stack>
			),
		},
		{
			field: "email",
			headerName: "Email Address",
			width: 300,
			minWidth: 200,
		},
		{
			field: "role",
			headerName: "Role",
			width: 300,
			minWidth: 150,
			renderCell: (params) => params.row.role.toUpperCase(),
		},
		{
			field: "Action",
			type: "actions",
			align: "right",
			width: 400,
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
						onClick: () => console.log(params.row.id),
					},
				]}
			/>,
		];
	};

	return (
		<DataGrid
			// sx={{ m: 2 }}
			rows={users}
			columns={columns}
			getRowId={(row: User) => row.userId}
			// initialState={{
			//   pinnedColumns: { right: ['actions'] },
			// }}
			//pageSizeOptions={[5]}
			disableRowSelectionOnClick
			sx={{
				"& .MuiDataGrid-columnHeadersInner": {
					backgroundColor: "grey.200",
				},
				"& .MuiDataGrid-columnHeaderTitle": {
					fontWeight: 700,
				},
			}}
		/>
	);
};

export default StaffListTable;
