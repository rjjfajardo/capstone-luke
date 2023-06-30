import SelectInput from "@/components/parts/SelectInput";
import TextInput from "@/components/parts/TextInput";
import CustomAvatar from "@/components/templates/CustomAvatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { useHooks } from "./hooks";

const NewStaff = () => {
  const { control } = useHooks();
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} lg={6} zeroMinWidth>
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
            name="contact"
            control={control}
            formControlProps={{ sx: { mb: 3, mr: 1, width: "50%" } }}
            label="Contact Number"
            hasRequiredLabel
          />

          <SelectInput
            name="role"
            control={control}
            options={[
              { id: "Staff", label: "Staff" },
              { id: "Admin", label: "Admin" },
            ]}
            formControlProps={{ sx: { mb: 3, width: "50%" } }}
            label="Priority"
            hasRequiredLabel
          />
        </Stack>
        <Stack
          width={200}
          border="1px solid yellow"
          //  boxShadow={2}

          padding={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1.5}
        >
          <CustomAvatar
            displayName="rj"
            rootStyles={{
              backgroundColor: "primary.main",
              height: "6rem",
              width: "6rem",
            }}
          />
          {/* <ImageProfileUpload open={true} /> */}
          <IconButton
            sx={{
              padding: 1.5,
              borderRadius: 1,
              // position: "absolute",
              // right: 0,
              // zIndex: 200,
              //bottom: 0,
              //   borderColor: "primary.main",
              //   border: 1,
              // border: "1px solid primary.main",
              backgroundColor: "grey.200",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
            //onClick={openImageUploadModal}
            size="small"
          >
            <PhotoCameraIcon sx={{ fontSize: "inherit", mr: 1 }} /> Select Image
          </IconButton>
        </Stack>
        <Stack direction="row" gap={2} mt={5}>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            sx={{ width: 150 }}
          >
            {"Password Reset"}
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ width: 150 }}
          >
            {"Update User"}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NewStaff;
