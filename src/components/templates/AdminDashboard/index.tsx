import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
// import StaffListPage from "@/components/templates/StaffListTable";
import SelectInput from "@/components/parts/SelectInput";
import { BarChart } from "../Charts/BarChart";

import { Typography } from "@mui/material";
import { useHooks } from "./hooks";
import Image from "next/image";

const AdminDashboard = () => {
	const { control } = useHooks();
	return (
		<Grid container spacing={4}>
			<Grid item xs={12} lg={4} display={{ md: "block", xs: "block" }}>
				<Stack
					height={450}
					boxShadow={1}
					p={2}
					borderRadius={1}
					display="flex"
					flexDirection="column"
					gap={5}
				>
					<Typography fontWeight={600} fontSize={18}>
						Company Metrics
					</Typography>
					<Box fontSize={22} fontWeight={700}>
						PHP 1,234,500.00
						<Typography fontSize={15} color="#BCB7B7">
							Total Revenue
						</Typography>
					</Box>
					<Box fontSize={22} fontWeight={600}>
						35
						<Typography fontSize={15} color="#BCB7B7">
							Total Projects Completed
						</Typography>
					</Box>
				</Stack>
			</Grid>
			<Grid item xs={12} lg={8}>
				<Stack height={450} boxShadow={1} p={2} borderRadius={1}>
					<Box display="flex" justifyContent="space-between">
						<Typography fontWeight={700} fontSize={18}>
							Earnings
						</Typography>
						<SelectInput
							name="role"
							control={control}
							options={[
								{ id: "2021", label: "2021" },
								{ id: "2022", label: "2022" },
								{ id: "2023", label: "2023" },
							]}
							formControlProps={{
								sx: {
									width: "20%",
									"& .MuiInputBase-root": {
										backgroundColor: "primary.main",
										color: "#FFFFFF",
										height: 40,
									},
									"& .MuiMenuItem-root": {
										backgroundColor: "primary.main",
										color: "#FFFFFF",
									},
									"& .MuiSvgIcon-root": {
										color: "#FFFFFF",
									},
								},
							}}
						/>
					</Box>

					<BarChart
						data={[
							100000, 3120000, 400112000, 8000000, 8000000,
							8000000, 8000000, 8000000, 400112000, 500000002,
						]}
						labels={[
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
						]}
					/>
				</Stack>
			</Grid>

			<Grid item xs={12} lg={12}>
				<Stack
					height={400}
					border={1}
					boxShadow={1}
					p={1}
					borderRadius={1}
					color="#f5f5f5"
				>
					<Typography fontWeight={700} fontSize={18}>
						Earnings
					</Typography>
					<Image
						src="https://sleekbbcs.s3.ap-southeast-1.amazonaws.com/7.jpg"
						alt={""}
						width={20}
						height={20}
					/>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default AdminDashboard;
