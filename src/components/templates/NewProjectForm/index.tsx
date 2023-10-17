import FileDropzone from "@/components/parts/FileDropzone";
import FormBase from "@/components/parts/FormBase";
import SelectInput from "@/components/parts/SelectInput";
import TextInput from "@/components/parts/TextInput/index";
import {
	Box,
	Button,
	FormControl,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import { useHooks } from "./hooks";

const NewProjectForm = () => {
	const {
		control,
		onSubmit,
		errors,
		dropzoneConfig,
		// isTeamProjectEnabled,
		// assigneeLimit,
		users,
		files,
		uploadMedia,
	} = useHooks();

	//console.log(assigneeLimit);

	return (
		<FormBase onSubmit={onSubmit}>
			<Grid container spacing={2} padding={2}>
				<Grid item xs={12} lg={6} zeroMinWidth>
					<TextInput
						name="title"
						control={control}
						formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
						label="Title"
						hasRequiredLabel
					/>
					<TextInput
						name="procuringEntity"
						control={control}
						formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
						label="Procuring Entity"
						hasRequiredLabel
					/>
					<TextInput
						name="referenceNumber"
						control={control}
						formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
						label="Reference Number"
						hasRequiredLabel
					/>
					<TextInput
						name="areaOfDelivery"
						control={control}
						formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
						label="Area of Delivery"
						hasRequiredLabel
					/>
					<TextInput
						name="approvedBudgetContract"
						control={control}
						formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
						label="Approve Budget Contract"
						hasRequiredLabel
					/>
					<SelectInput
						name="procurementMode"
						control={control}
						options={[
							{
								id: "Negotiate Procurement",
								label: "Negotiate Procurement",
							},
							{
								id: "Small Value Procurement",
								label: "Small Value Procurement",
							},
							{ id: "Public Bidding", label: "Public Bidding" },
						]}
						formControlProps={{ fullWidth: true }}
						label="Procurement Mode"
						hasRequiredLabel
					/>
				</Grid>

				<Grid item xs={12} lg={6}>
					<Box display="flex" alignItems="center" gap={1}>
						<TextInput
							name="contractDuration"
							control={control}
							formControlProps={{ sx: { mb: 3 } }}
							label="Contract Duration"
							hasRequiredLabel
						/>
						<Typography color="#000000">Day/s</Typography>
					</Box>
					<SelectInput
						name="priority"
						control={control}
						options={[
							{ id: "High", label: "High" },
							{ id: "Medium", label: "Medium" },
							{ id: "Low", label: "Low" },
						]}
						formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
						label="Priority"
						hasRequiredLabel
					/>

					{/* <Controller
            name="isTeamProject"
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormControl error={!!fieldState.error} fullWidth={true}>
                <Stack direction="row" lineHeight={3} ml={-1}>
                  <Checkbox checked={value} onChange={onChange} />
                  Team Project
                </Stack>
              </FormControl>
            )}
            /> */}
					{users && users.length && (
						<SelectInput
							name="assignee"
							control={control}
							options={
								users.map((u) => ({
									id: u.userId ?? "",
									label: u.fullName ?? "",
								})) ?? []
							}
							formControlProps={{
								fullWidth: true,
								sx: { mb: 3 },
							}}
							label="Assignee/s"
							hasRequiredLabel
							multiple
							// disabled={assigneeLimit.length === 3}
						/>
					)}

					<FileDropzone
						useDropzoneProps={dropzoneConfig}
						dropzoneTitle="Drag and drop files here or click to add."
					/>

					{files.map((f) => (
						<Box key={f.file} border={1} padding={1} gap={2}>
							{f.file}
						</Box>
					))}

					<Stack direction="row" justifyContent="center" gap={2}>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							sx={{ width: 150 }}
						>
							{"SUBMIT"}
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</FormBase>
	);
};

export default NewProjectForm;
