import React from "react";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface FilePreviewBoxProps {
  fileName: string;
  fileUrl: string;
  onRemove?: () => void;
  showDelete?: boolean;
}

const FilePreviewBox: React.FC<FilePreviewBoxProps> = ({
  fileName,
  fileUrl,
  onRemove,
  showDelete = true,
}) => {
  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
      <Typography variant="subtitle1">{fileName}</Typography>
      <Box mt={1}>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download
        </Button>
        {showDelete && (
          <IconButton color="secondary" onClick={onRemove}>
            <Delete />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default FilePreviewBox;
