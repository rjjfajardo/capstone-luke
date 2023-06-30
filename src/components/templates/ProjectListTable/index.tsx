import Link from "@/components/parts/Link";
import Loading from "@/components/parts/Loading";
import MoreVertMenu from "@/components/parts/MoreVertMenu";
import { Avatar, AvatarGroup } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { FindAllProject, useHooks } from "./hooks";
import { formatToPhp } from "@/lib/formatToPhp";

const ProjectListTable = () => {
  const { rows } = useHooks();

  if (!rows) return <Loading />;

  const columns: GridColDef<FindAllProject>[] = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      minWidth: 200,
      editable: true,
      renderCell: (params) => (
        <Link href={`/projects/${params.row.id}`}>{params.row.title}</Link>
      ),
    },
    {
      field: "referenceNumber",
      headerName: "Reference Number",
      width: 150,
      minWidth: 100,
    },
    {
      field: "approvedBudgetContract",
      headerName: "Budget",
      width: 150,
      minWidth: 100,
      renderCell: (params) => formatToPhp(params.row.approvedBudgetContract),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      minWidth: 100,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      minWidth: 100,
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
              <Avatar key={user.userId}>{user.fullName[0]}</Avatar>
            ))}
        </AvatarGroup>
      ),
    },
    {
      field: "Action",
      type: "actions",
      headerAlign: "center",
      width: 50,
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
    <>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </>
  );
};

export default ProjectListTable;
