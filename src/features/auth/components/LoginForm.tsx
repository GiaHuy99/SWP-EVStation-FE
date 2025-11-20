import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { login } from "../AuthThunks";
import { Box, TextField, Button, Typography, CircularProgress, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <Box className={styles.loginContainer}>
            <Box className={styles.heroSection}>
                <Box className={styles.heroContent}>
                    <Box className={styles.logoBox}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <rect width="60" height="60" rx="12" fill="#04C4D9" />
                            <path d="M30 15L45 25V40C45 45.5228 40.5228 50 35 50H25C19.4772 50 15 45.5228 15 40V25L30 15Z" fill="white" opacity="0.9" />
                            <circle cx="30" cy="32" r="6" fill="#4C428C" />
                        </svg>
                    </Box>
                    <Typography variant="h3" className={styles.heroTitle}>
                        EV Battery Swap
                    </Typography>
                    <Typography variant="h6" className={styles.heroSubtitle}>
                        Smart Battery Management System
                    </Typography>
                    <Typography className={styles.heroDescription}>
                        Streamline your battery swap operations with our comprehensive management platform. Fast, reliable, and secure.
                    </Typography>
                </Box>
            </Box>

            <Box className={styles.formSection}>
                <Container maxWidth="sm">
                    <Box className={styles.formBox}>
                        <Box className={styles.formHeader}>
                            <Box className={styles.lockIcon}>
                                <LockOutlinedIcon sx={{ fontSize: 28, color: "#04C4D9" }} />
                            </Box>
                            <Typography variant="h5" className={styles.formTitle}>
                                Sign In
                            </Typography>
                            <Typography variant="body2" className={styles.formSubtitle}>
                                Enter your credentials to access your account
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
                            <TextField
                                fullWidth
                                label="Username or Email"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                required
                                autoFocus
                                error={!!error}
                                placeholder="Enter your username"
                                className={styles.textField}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                                error={!!error}
                                helperText={error}
                                placeholder="Enter your password"
                                className={styles.textField}
                            />

                            {error && (
                                <Box className={styles.errorBox}>
                                    <Typography variant="body2" className={styles.errorText}>
                                        {error}
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                className={styles.submitButton}
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    borderRadius: "10px",
                                }}
                            >
                                {loading ? (
                                    <Box className={styles.loadingBox}>
                                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                        Signing in...
                                    </Box>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            <Box className={styles.signupBox}>
                                <Typography variant="body2">
                                    Don't have an account?{" "}
                                    <a href="/register" className={styles.signupLink}>
                                        Create one
                                    </a>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LoginForm;
