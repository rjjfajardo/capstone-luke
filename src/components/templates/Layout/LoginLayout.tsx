import { Box, Container, Toolbar } from "@mui/material";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import DocumentTitle from "@/components/parts/DocumenTitle";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useHooks } from "./hooks";

const drawerWidth = 220;

const LoginLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useHooks();
  const capitalize = (s: any) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <DocumentTitle title={capitalize(router.pathname.split("/")[1])} /> */}
      <Navbar
        drawerWidth={String(drawerWidth)}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        isAdmin={user?.user.role === "admin"}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        // userRole={session?.user?.role}
      />
      <Box
        component="main"
        sx={{
          p: {
            sm: 2,
            md: 2,
          },
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Container
          sx={{
            width: "100%",
            marginTop: "1rem",
            marginBottom: "1rem",
            //border: 1,
            //  p: 1,
          }}
          maxWidth="lg"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default LoginLayout;
