import React, { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import client from "../router/Client";
import Logo from "/assets/Logo.svg";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (localStorage.getItem("token") == null) {
    return <Navigate to={"/"} />;
  }

  const logout = () => {
    client.post("auth/logout").then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", height: "90%" }}>
      <Typography variant="h6" sx={{ my: 2, marginLeft: 2 }}>
        <img src={Logo} alt="Logo" style={{ width: "120px" }} />
      </Typography>
      <List sx={{ flexGrow: 1 }}>
        <ListItem button component={Link} to="dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="siswa" sx={{ pl: 4 }}>
          <ListItemText primary="Rekap" />
        </ListItem>
        <ListItem button component={Link} to="data-siswa" sx={{ pl: 4 }}>
          <ListItemText primary="Data Siswa" />
        </ListItem>
        <ListItem button component={Link} to="absensi">
          <ListItemText primary="Absensi" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          px: 5,
          borderRadius: { md: "0 0 50px 50px" },
          boxShadow: "0px 12px 24px #DDE9F9",
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ justifyContent: isMobile ? "none" : "space-between", height: 90 }}>
          {!isMobile && <img src={Logo} alt="Logo" />}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <img src={Logo} style={{ height: "40px", paddingLeft: 25 }} alt="Logo" />
            </>
          ) : (
            <Box sx={{ display: "flex",gap: 4, justifyContent: {lg: 'space-between'} }}>
              <Link to="dashboard">
                <Button
                  onClick={() => handleButtonClick("Dashboard")}
                  sx={{
                    fontWeight: "bold",
                    color: selectedButton === "Dashboard" ? "#2D8EFF" : "gray",
                    borderBottom:
                      selectedButton === "Dashboard"
                        ? "2px solid #2D8EFF"
                        : "2px solid transparent",
                    "&:hover": {
                      color: "#2D8EFF",
                      borderBottom: "2px solid #2D8EFF",
                    },
                  }}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="siswa">
                <Button
                  onClick={() => handleButtonClick("Rekap")}
                  sx={{
                    fontWeight: "bold",
                    color: selectedButton === "Rekap" ? "#2D8EFF" : "gray",
                    borderBottom:
                      selectedButton === "Rekap"
                        ? "2px solid #2D8EFF"
                        : "2px solid transparent",
                    "&:hover": {
                      color: "#2D8EFF",
                      borderBottom: "2px solid #2D8EFF",
                    },
                  }}
                >
                  Rekap
                </Button>
              </Link>
              <Link to="data-siswa">
                <Button
                  onClick={() => handleButtonClick("Data Siswa")}
                  sx={{
                    fontWeight: "bold",
                    color: selectedButton === "Data Siswa" ? "#2D8EFF" : "gray",
                    borderBottom:
                      selectedButton === "Data Siswa"
                        ? "2px solid #2D8EFF"
                        : "2px solid transparent",
                    "&:hover": {
                      color: "#2D8EFF",
                      borderBottom: "2px solid #2D8EFF",
                    },
                  }}
                >
                  Data Siswa
                </Button>
              </Link>
              <Link to="absensi">
                <Button
                  onClick={() => handleButtonClick("Absensi")}
                  sx={{
                    fontWeight: "bold",
                    color: selectedButton === "Absensi" ? "#2D8EFF" : "gray",
                    borderBottom:
                      selectedButton === "Absensi"
                        ? "2px solid #2D8EFF"
                        : "2px solid transparent",
                    "&:hover": {
                      color: "#2D8EFF",
                      borderBottom: "2px solid #2D8EFF",
                    },
                  }}
                >
                  Absensi
                </Button>
              </Link>
            </Box>
          )}

          {!isMobile && (
            <Box>
            <Tooltip title="Pengaturan">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "end",
                    marginRight: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", color: "black" }}>
                    {localStorage.getItem("nama")}
                  </Typography>
                  <Typography sx={{ fontWeight: "light" }}>
                    {localStorage.getItem("email")}
                  </Typography>
                </Box>
                <Avatar
                  sx={{ height: 56, width: 56 }}
                  alt="Profil"
                  src="https://plus.unsplash.com/premium_photo-1664300900349-afd61c20f8b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography fontWeight="semibold" textAlign="center">
                  <button onClick={logout}>Logout</button>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Outlet />
    </>
  );
}
