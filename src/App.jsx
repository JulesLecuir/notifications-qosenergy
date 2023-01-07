import * as React from "react";
import {useColorScheme} from "@mui/joy/styles";
import Box from "@mui/joy/Box";

import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

// Icons import
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

// Custom
import Layout from "./components/base/Layout";
import SettingsPage from "./components/settings";

function ColorSchemeToggle() {
  const {mode, setMode} = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}>
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

function SidebarNavigation() {
  return (
    <List size="sm" sx={{"--List-item-radius": "8px", "--List-gap": "4px"}}>
      <ListItem nested>
        <ListSubheader>Settings</ListSubheader>
        <List>
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{color: "inherit"}}>
                <PeopleRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Notifications</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <AssignmentIndRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Members</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <ArticleRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Etc.</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}

export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <>
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <SidebarNavigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}>
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}>
            <IconButton
              variant="outlined"
              size="sm"
              sx={{display: {sm: "none"}}}
              onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <IconButton size="sm" variant="solid" sx={{display: {xs: "none", sm: "inline-flex"}}}>
              <GroupRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Team
            </Typography>
          </Box>
          <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: "500px",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />
          <Box sx={{display: "flex", flexDirection: "row", gap: 1.5}}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{display: {xs: "inline-flex", sm: "none"}}}>
              <SearchRoundedIcon />
            </IconButton>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>

        <Layout.SideNav>
          <SidebarNavigation />
        </Layout.SideNav>

        <Layout.Main>
          <SettingsPage />
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
