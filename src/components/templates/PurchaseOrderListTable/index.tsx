import { PurchaseOrderStatus } from ".prisma/client";
import { Link } from "@/components/parts/Link/Link";
import Loading from "@/components/parts/Loading";
import MoreVertMenu from "@/components/parts/MoreVertMenu";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import { PurchaseOrders, useHooks } from "./hooks";
import { getPurchaseOrderStatusColor } from "@/lib/getColor";

const PurchaseOrderListTable = () => {
  const { orders, router, isLoading } = useHooks();

  if (isLoading) return <Loading />;

  const columns: GridColDef<PurchaseOrders>[] = [
    {
      field: "purchaseOrderNumber",
      headerName: "Purchase Order #",
      width: 300,
      minWidth: 200,
      renderCell: (params) => (
        <Link
          href={`/order-management/${params.row.id}`}
          sx={{ textDecoration: "underline", color: "inherit" }}
        >
          {params.row.purchaseOrderNumber}
        </Link>
      ),
    },
    {
      field: "title",
      headerName: "Project Title",
      width: 300,
      minWidth: 200,
      renderCell: (params) => (
        <Link
          href={`/projects/${params.row.projectId}`}
          sx={{ textDecoration: "underline", color: "inherit" }}
        >
          {params.row.project.title}
        </Link>
      ),
    },
    {
      field: "projectStatus",
      headerName: "Project Status",
      width: 120,
      minWidth: 130,
      renderCell: (params) => params.row.project.status,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      minWidth: 150,
      valueGetter: ({ row }) => row.status,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={getPurchaseOrderStatusColor(params.row.status)}
        />
      ),
    },
    {
      field: "orderedAt",
      headerName: "Ordered Date",
      width: 160,
      minWidth: 150,
      renderCell: (params) =>
        params.row.orderedAt
          ? format(new Date(params.row.orderedAt), "yyyy-MM-dd")
          : "",
    },
    {
      field: "deliveredAt",
      headerName: "Delivered Date",
      width: 160,
      minWidth: 150,
      renderCell: (params) =>
        params.row.deliveredAt
          ? format(new Date(params.row.deliveredAt), "yyyy-MM-dd")
          : "",
    },
    {
      field: "createdAt",
      headerName: "Order Created",
      width: 160,
      minWidth: 150,
      valueGetter: ({ row }) => row.createdAt,
      renderCell: (params) =>
        format(new Date(params.row.createdAt), "yyyy-MM-dd"),
    },
    {
      field: "Action",
      type: "actions",
      align: "right",
      width: 60,
      minWidth: 60,
      getActions: (params) => getActionMenu(params),
    },
  ];

  const getActionMenu = (params: GridRowParams): JSX.Element[] => {
    return [
      <MoreVertMenu
        key={params.row.id}
        options={[
          {
            label: "View",
            onClick: () => router.push(`/order-management/${params.row.id}`),
          },
        ]}
      />,
    ];
  };

  return (
    <DataGrid
      rows={orders}
      columns={columns}
      getRowId={(row: PurchaseOrders) => row.id}
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

export default PurchaseOrderListTable;
