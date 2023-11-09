import SelectInput from "@/components/parts/SelectInput";
import TextInput from "@/components/parts/TextInput";
import CustomAvatar from "@/components/templates/CustomAvatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { useHooks } from "../../../hooks/staff/new/hooks";
import FormBase from "@/components/parts/FormBase";

const NewStaff = () => {
  const { control, onSubmit } = useHooks();
  return (
    <Stack
      height="auto"
      boxShadow={1}
      borderRadius={1}
      sx={{ backgroundColor: "#ffffff" }}
    >
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} lg={6} zeroMinWidth>
          <FormBase onSubmit={onSubmit}>
            <TextInput
              name="fullName"
              control={control}
              formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
              label="Full Name"
              hasRequiredLabel
            />
            <TextInput
              name="email"
              control={control}
              formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
              label="Email Address"
              hasRequiredLabel
            />

            <Stack display="flex" flexDirection="row">
              <TextInput
                name="contactNumber"
                control={control}
                formControlProps={{ sx: { mb: 3, mr: 1, width: "50%" } }}
                label="Contact Number"
                hasRequiredLabel
              />
            </Stack>

            <Stack direction="row" gap={2} mt={5}>
              {/* <Button
              type="submit"
              color="primary"
              variant="outlined"
              sx={{ width: 150 }}
            >
              {"Password Reset"}
            </Button> */}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: 150 }}
              >
                Create User
              </Button>
            </Stack>
          </FormBase>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default NewStaff;
