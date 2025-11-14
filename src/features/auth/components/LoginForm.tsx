// src/features/auth/LoginForm.tsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { login } from "../AuthThunks";

import {
    PageContainer,
    FormCard,
    Title,
    StyledTextField,
    FullWidthBox,
} from "../../../styles/AdminDashboardStyles";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

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
        <PageContainer maxWidth={false}>
            <FormCard elevation={3}>
                <Title >
                    Login
                </Title>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <StyledTextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                        autoFocus
                        error={!!error}
                    />

                    <StyledTextField
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
                    />

                    <FullWidthBox sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #3b336e 0%, #03a9bf 100%)",
                                },
                                textTransform: "none",
                                fontSize: "1rem",
                            }}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </FullWidthBox>

                    <FullWidthBox sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{" "}
                            <a href="/register" style={{ color: "#04C4D9", fontWeight: 500 }}>
                                Register
                            </a>
                        </Typography>
                    </FullWidthBox>
                </Box>
            </FormCard>
        </PageContainer>
    );
};

export default LoginForm;