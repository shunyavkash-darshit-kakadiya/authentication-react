import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import apiList from "../../constants/apiList";
import apiService from "../../services/apiService";
import GooglePage from "../Google/GooglePage";
import { useAuth } from "../../stores/useAuth";

const LoginPage = () => {
  const { setUserInfo } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService(apiList.AUTH.LOGIN, formData);
      if (data?.data?.require2FA) {
        setUserInfo({
          pending2FA: data?.data?.accountId,
          twoFactorEnabled: true,
        });
        return;
      }
      setFormData({ email: "", password: "" });
      setUserInfo({
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <GooglePage />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
