import {
  Box,
  Divider,
  Drawer,
  List,
  Stack,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import SidebarLinkMenu from "./SidebarLinkMenu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHooks } from "./hooks";

const adminLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  //TODO: change the route of this side menu
  {
    label: "Create Project",
    path: "/proposal/new",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Employees",
    path: "/staff",
  },
];

const staffLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

const Sidebar = (props: any) => {
  const { signOut } = useHooks();
  const router = useRouter();

  const { window, drawerWidth, handleDrawerToggle, mobileOpen, isAdmin } =
    props;

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {isAdmin
          ? adminLinks.map(({ path, label }) => (
              <SidebarLinkMenu
                path={path}
                label={label}
                key={label}
                routerPathName={router.pathname}
              />
            ))
          : staffLinks.map(({ path, label }) => (
              <SidebarLinkMenu
                path={path}
                label={label}
                key={label}
                routerPathName={router.pathname}
              />
            ))}
        <Stack mt={65}>
          <IconButton
            sx={{ fontSize: 18, color: "#ffffff" }}
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            <ExitToAppIcon /> Sign Out
          </IconButton>
        </Stack>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#2b3b5c",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#2b3b5c",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
