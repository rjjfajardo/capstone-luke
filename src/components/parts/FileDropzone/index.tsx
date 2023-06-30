import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
// import { alpha } from "@mui/material/styles";

const rootStyles = {
  height: "8rem",
  borderStyle: "dashed",
  borderColor: "primary.main",
  borderRadius: 1,
  borderWidth: "thin",
  cursor: "pointer",
  color: "primary.main",
  //backgroundColor: "background.default",
  //   "&:hover": {
  //     borderColor: (theme: any) => theme.palette.common.black,
  //   },
  "&:focus-within": {
    borderColor: "primary.main",
    //: (theme: any) => alpha(theme.palette.primary.main, 0.1),
    color: "primary.main",
  },
  marginBottom: 2,
};

interface DropzoneProps {
  dropzoneTitle: string;
  useDropzoneProps: any;
}

export default function FileDropzone({
  dropzoneTitle,
  useDropzoneProps,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone(useDropzoneProps);
  return (
    <Box {...getRootProps({})} sx={rootStyles}>
      <input {...getInputProps()} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          padding: 2,
        }}
      >
        <CloudUploadRoundedIcon
          sx={{
            fontSize: 50,
          }}
        />
        <Typography variant="body2" align="center">
          {dropzoneTitle || "Drag and drop files here, or click to add."}
        </Typography>
      </Box>
    </Box>
  );
}
