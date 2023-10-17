import PageTitle from "@/components/parts/PageTitlte";
import TextInput from "@/components/parts/TextInput";
import StaffListTable from "@/components/templates/StaffListTable";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Stack } from "@mui/material";
import { useHooks } from "./hooks";
import Link from "@/components/parts/Link";

const StaffListPage = () => {
	const { control } = useHooks();
	return (
		<>
			<PageTitle title="Staff" />

			<Stack
				border={1}
				boxShadow={1}
				borderRadius={1}
				color="#f5f5f5"
				p={2}
				width="100%"
				height="100vh"
			>
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
							name=""
							placeholder="Search"
							formControlProps={{ sx: { width: 500 } }}
						/>
						<Button variant="contained">Search</Button>
					</Box>
					<Link href="/staff/new">
						<Button
							variant="contained"
							sx={{ width: 140 }}
							startIcon={<AddIcon />}
						>
							Add Staff
						</Button>
					</Link>
				</Stack>
				<StaffListTable />
			</Stack>
		</>
	);
};
export default StaffListPage;
