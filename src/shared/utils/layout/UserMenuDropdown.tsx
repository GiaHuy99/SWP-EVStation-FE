import React, { useState, useEffect } from "react";
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Box,
    Typography,
    Divider,
    LinearProgress,
    Chip,
} from "@mui/material";
import {
    Person as PersonIcon,
    CreditCard as CreditCardIcon,
    AccountBalanceWallet as AccountBalanceWalletIcon,
    CalendarMonth as CalendarMonthIcon,
    SwapHoriz as SwapHorizIcon,
    TrendingUp,
    Logout as LogoutIcon,
    CheckCircle,
    Cancel,
    Warning,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchUserReputation } from "../../../features/user/UserThunks";
import { logout } from "../../../features/auth/AuthSlice"; // ← Đảm bảo import đúng
import { useNavigate } from "react-router-dom";

const UserMenuDropdown: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { reputation, loadingReputation } = useAppSelector((state) => state.user);

    // Gọi API điểm uy tín khi mở dropdown
    useEffect(() => {
        if (anchorEl && !reputation && !loadingReputation) {
            dispatch(fetchUserReputation());
        }
    }, [anchorEl, dispatch, reputation, loadingReputation]);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
        handleClose();
    };

    const percentage = reputation ? (reputation.currentReputation / reputation.maxReputation) * 100 : 0;
    const getReputationColor = () => {
        if (!reputation) return "grey";
        if (percentage >= 80) return "success";
        if (percentage >= 50) return "warning";
        return "error";
    };

    return (
        <>
            {/* Avatar mở dropdown */}
            <Avatar
                onClick={handleClick}
                sx={{
                    cursor: "pointer",
                    bgcolor: "primary.main",
                    width: 40,
                    height: 40,
                    fontWeight: "bold",
                }}
            >
                U
            </Avatar>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 340, borderRadius: 2, mt: 1.5, boxShadow: 6 },
                }}
            >
                {/* 1. Hồ sơ cá nhân */}
                <MenuItem onClick={() => { navigate("/user/profile"); handleClose(); }}>
                    <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Hồ sơ cá nhân</ListItemText>
                </MenuItem>

                {/* 2. ĐIỂM UY TÍN – HIỆN NGAY TRONG DROPDOWN */}
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Điểm Uy Tín
                    </Typography>

                    {loadingReputation ? (
                        <LinearProgress sx={{ borderRadius: 2 }} />
                    ) : reputation ? (
                        <Box sx={{ bgcolor: "grey.50", borderRadius: 2, p: 2, border: "1px solid", borderColor: "grey.300" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                <Typography variant="h5" fontWeight="bold" color={getReputationColor()}>
                                    {reputation.currentReputation} / {reputation.maxReputation}
                                </Typography>
                                {percentage >= 80 ? <CheckCircle color="success" /> :
                                    percentage >= 50 ? <Warning color="warning" /> :
                                        <Cancel color="error" />}
                            </Box>

                            <LinearProgress
                                variant="determinate"
                                value={percentage}
                                color={getReputationColor()}
                                sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                            />

                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 1.5 }}>
                                {reputation.message}
                            </Typography>

                            <Box sx={{ fontSize: "0.8rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                                <div>Hủy: <strong>{reputation.cancelledCount}</strong></div>
                                <div>Hết hạn: <strong>{reputation.expiredCount}</strong></div>
                                <div>Đã dùng: <strong>{reputation.usedCount}</strong></div>
                                <div>
                                    Đặt lịch: {reputation.canReserve ?
                                    <Chip label="Được phép" color="success" size="small" /> :
                                    <Chip label="Bị khóa" color="error" size="small" />}
                                </div>
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="error">Không tải được điểm uy tín</Typography>
                    )}
                </Box>

                <Divider />

                {/* Các chức năng khác */}
                <MenuItem onClick={() => { navigate("/subscriptionPlan/changePlanPage"); handleClose(); }}>
                    <ListItemIcon><CreditCardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Đổi gói dịch vụ</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => { navigate("/invoice/history"); handleClose(); }}>
                    <ListItemIcon><AccountBalanceWalletIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Lịch sử hóa đơn</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => { navigate("/reservation/history"); handleClose(); }}>
                    <ListItemIcon><CalendarMonthIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Lịch sử đặt chỗ</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => { navigate("/swap/history"); handleClose(); }}>
                    <ListItemIcon><SwapHorizIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText>Lịch sử đổi pin</ListItemText>
                </MenuItem>

                <Divider />

                {/* Đăng xuất */}
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText sx={{ color: "error" }}>Đăng xuất</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenuDropdown;