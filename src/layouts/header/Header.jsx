import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import apiList from "../../constants/apiList";
import { useAuth } from "../../stores/useAuth";

const Header = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch(apiList.AUTH.LOGOUT.url, {
        method: apiList.AUTH.LOGOUT.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Authentication App
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
