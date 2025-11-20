// src/features/profile/UserProfile.tsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Avatar,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchUserProfile, updateProfile } from "../ProfileThunks";
import { clearMessages } from "../ProfileSlice";

const ProfileContainer = styled(Paper)(({ theme }) => ({
    maxWidth: 600,
    margin: "40px auto",
    padding: theme.spacing(5),
    borderRadius: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    border: "1px solid #f0f0f0",
    backgroundColor: "#fff",
}));

const UserProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { profile, loading, error, successMessage } = useAppSelector((state) => state.profile);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ phone: "", address: "" });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                phone: profile.phone || "",
                address: profile.address || "",
            });
        }
    }, [profile]);

    // Sửa lỗi: success → successMessage
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessages()), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    const handleSave = () => {
        dispatch(
            updateProfile({
                phone: formData.phone || null,
                address: formData.address || null,
            })
        );
        setIsEditing(false);
    };

    if (loading && !profile) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress size={60} thickness={5} color="primary" />
            </Box>
        );
    }

    return (
        <ProfileContainer elevation={3}>
            <Stack direction="column" alignItems="center" spacing={4}>
                {/* Avatar + Info */}
                <Box textAlign="center">
                    <Avatar
                        sx={{
                            width: 110,
                            height: 110,
                            bgcolor: "#4C428C",
                            fontSize: "3rem",
                            boxShadow: "0 8px 20px rgba(76, 66, 140, 0.3)",
                        }}
                    >
                        <PersonIcon fontSize="inherit" />
                    </Avatar>
                    <Typography variant="h4" fontWeight={700} mt={3} color="#1e293b">
                        {profile?.username || "User"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt={1}>
                        {profile?.email || "email@example.com"}
                    </Typography>
                </Box>

                {/* Thông tin chi tiết */}
                <Box width="100%">
                    <Typography variant="h6" fontWeight={600} mb={3} color="#1e293b">
                        Thông tin cá nhân
                    </Typography>

                    {/* Thông báo */}
                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
                            {successMessage}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Stack spacing={3}>
                        <TextField label="Email" value={profile?.email || ""} fullWidth disabled variant="outlined" />

                        <TextField
                            label="Số điện thoại"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            fullWidth
                            disabled={!isEditing}
                            placeholder="Chưa cập nhật"
                            variant="outlined"
                        />

                        <TextField
                            label="Địa chỉ"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                            disabled={!isEditing}
                            placeholder="Chưa cập nhật"
                            variant="outlined"
                        />
                    </Stack>

                    {/* Nút hành động */}
                    <Box textAlign="right" mt={5}>
                        {isEditing ? (
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            phone: profile?.phone || "",
                                            address: profile?.address || "",
                                        });
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                    onClick={handleSave}
                                    disabled={loading}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        bgcolor: "#22c55e",
                                        "&:hover": { bgcolor: "#16a34a" },
                                        borderRadius: 3,
                                    }}
                                >
                                    Lưu thay đổi
                                </Button>
                            </Stack>
                        ) : (
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditing(true)}
                                sx={{
                                    px: 5,
                                    py: 1.8,
                                    bgcolor: "#6366f1",
                                    "&:hover": { bgcolor: "#4f46e5" },
                                    borderRadius: 3,
                                    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
                                }}
                            >
                                Chỉnh sửa thông tin
                            </Button>
                        )}
                    </Box>
                </Box>
            </Stack>
        </ProfileContainer>
    );
};

export default UserProfile;