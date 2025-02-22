import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Divider
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  // Función para validar el email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    console.log("Login with", { email, password });
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" className={styles.title}>
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={styles.input}
              sx={{ mt: 4 }}
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
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
                },
              }}
            />
            <Link className={styles.forgotPassword} onClick={() => navigate("/")}>
              Forgot Password?
            </Link>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={styles.button}
              sx={{ mt: 4 }}
              disabled={!!emailError || !email.trim()} // Deshabilita si el email no es válido o está vacío
            >
              Login
            </Button>

            <Divider className={styles.divider}>OR</Divider>

            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
