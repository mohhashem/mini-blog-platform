"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Header = () => {
  const { isAdmin, adminName, logout, loading } = useContext(AuthContext);
  const router = useRouter();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Box
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <Typography variant="h6" color="inherit">
            Blog
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress color="inherit" size={20} />
          </Box>
        ) : isAdmin ? (
          <>
            <Typography variant="body1" sx={{ color: "#fff", mr: 2 }}>
              Welcome, {adminName}
            </Typography>
            <Button color="inherit" onClick={() => {
              logout();
              router.push("/");
            }}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Admin Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
