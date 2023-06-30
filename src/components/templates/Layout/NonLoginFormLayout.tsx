import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";

const LayoutBase = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#fdfdfd",
  [theme.breakpoints.up("md")]: {
    padding: "40px 360px",
  },
}));

const Panel = styled(Stack)(({ theme }) => ({
  padding: 40,
  [theme.breakpoints.up("md")]: {
    minWidth: 670,
    backgroundColor: theme.palette.common.white,
    boxShadow: "0px 1px 2px rgba(20, 20, 20, 0.101961)",
    border: "1px solid #dfe0e1",
    borderRadius: 3,
  },
}));

export default function NonLoginForm(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <LayoutBase>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Panel>{children}</Panel>
      </Box>
    </LayoutBase>
  );
}
