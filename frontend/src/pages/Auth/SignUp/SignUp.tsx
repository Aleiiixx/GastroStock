import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Business, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignUp.module.css";

const API_URL = import.meta.env.VITE_BACKEND_URL; // URL del backend desde el .env

const SignUp: React.FC = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Función para validar el email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail) ? "" : "Invalid email format");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword !== confirmPassword ? "Passwords do not match" : "");
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError(password !== newConfirmPassword ? "Passwords do not match" : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Mostrar notificación de éxito
      toast.success("Account created successfully!");

      // Guardamos el token y autenticamos al usuario
      login(data.token);

      // Redirigir a la página principal
      navigate("/suppliers");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      setPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" className={styles.title}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Restaurant Name"
              variant="outlined"
              fullWidth
              className={styles.input}
              sx={{ mt: 4 }}
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={styles.input}
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              className={styles.input}
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              className={styles.input}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="signupButton"
              sx={{ mt: 5 }}
              className={styles.button}
              disabled={
                !!emailError ||
                !!passwordError ||
                !email.trim() ||
                !password.trim() ||
                !confirmPassword.trim() ||
                loading
              }
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <Divider className={styles.divider}>OR</Divider>

            <Button
              variant="outlined"
              color="primary"
              id="loginButton"
              className={styles.button}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
