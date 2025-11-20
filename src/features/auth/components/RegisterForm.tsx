import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { register } from "../AuthThunks";
import { Box, TextField, Button, Typography, CircularProgress, Container } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import styles from "../styles/RegisterForm.module.css";

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
    };

    return (
        <Box className={styles.registerContainer}>
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
                        Join our growing network of battery swap stations. Get started in minutes.
                    </Typography>
                </Box>
            </Box>

            <Box className={styles.formSection}>
                <Container maxWidth="sm">
                    <Box className={styles.formBox}>
                        <Box className={styles.formHeader}>
                            <Box className={styles.lockIcon}>
                                <PersonAddOutlinedIcon sx={{ fontSize: 28, color: "#04C4D9" }} />
                            </Box>
                            <Typography variant="h5" className={styles.formTitle}>
                                Create Account
                            </Typography>
                            <Typography variant="body2" className={styles.formSubtitle}>
                                Sign up to start managing your battery network
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                required
                                autoFocus
                                placeholder="Choose a username"
                                className={styles.textField}
                            />

                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                required
                                placeholder="your@email.com"
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
                                placeholder="Minimum 6 characters with numbers and symbols"
                                helperText="At least 6 characters, include numbers and symbols"
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
                                        Creating account...
                                    </Box>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            <Box className={styles.loginBox}>
                                <Typography variant="body2">
                                    Already have an account?{" "}
                                    <a href="/login" className={styles.loginLink}>
                                        Sign in here
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

export default RegisterForm;
