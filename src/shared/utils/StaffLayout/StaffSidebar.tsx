import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { selectProfile } from '../../../features/profileUser/ProfileSlice';
import { logout, selectIsLoggedIn } from '../../../features/auth/AuthSlice';
import {
    Box,
    Collapse,
    useTheme,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,
    Paper,

} from '@mui/material';
import {
    ArrowDropDown,
    ArrowDropUp,
    Battery6Bar,
    LocalGasStation,
    DirectionsCar,
    SwapHoriz,
    Login,
    PersonAdd,
    Logout,
    Subscriptions,
    BarChart,
    Person,
} from '@mui/icons-material';

const Sidebar: FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const profile = useAppSelector(selectProfile);

    // State cho menu sidebar
    const [menuStates, setMenuStates] = useState<{ [key: string]: boolean }>({
        stations: false,
        battery: false,
        subscription: false,
        vehicle: false,
        staff: false,
    });

    // State cho dropdown user
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openUserMenu = Boolean(anchorEl);

    const toggleMenu = (key: string) => {
        setMenuStates(prev => {
            const newState = { stations: false, battery: false, subscription: false, vehicle: false, staff: false };
            newState[key as keyof typeof newState] = !prev[key];
            return newState;
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // === CÁC HÀM CHO USER DROPDOWN ===
    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/user/profile');
        handleUserMenuClose();
    };
    // ================================

    const sidebarItemStyle = {
        color: theme.palette.common.white,
        fontWeight: 600,
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: 'rgba(4, 196, 217, 0.2)',
            transform: 'translateX(4px)',
        },
        transition: 'all 0.2s ease-in-out',
    };

    const subItemStyle = {
        color: theme.palette.common.white,
        fontWeight: 400,
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '100%',
        pl: 3,
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: 'rgba(4, 196, 217, 0.2)',
            transform: 'translateX(4px)',
        },
        transition: 'all 0.2s ease-in-out',
    };

    return (
        <Paper
            elevation={3}
            sx={{
                height: '100vh',
                width: { xs: 250, sm: 280 },
                backgroundColor: '#4C428C',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1000,
                overflowY: 'auto',
                borderRadius: 0,
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.1)' },
                '&::-webkit-scrollbar-thumb': { background: '#04C4D9', borderRadius: '3px' },
                '&::-webkit-scrollbar-thumb:hover': { background: '#03a8b8' },
            }}
        >
            {/* Logo/Header */}
            <Box sx={{ p: 2, borderBottom: '2px solid #04C4D9' }}>

                {/* Tên App */}
                <Typography variant="h6" sx={{ color: theme.palette.common.white, fontWeight: 700, textAlign: 'center' }}>
                    EV Battery Swap
                </Typography>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ flex: 1, p: 1 }}>
                <List sx={{ p: 0 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link as any}
                            to="/user/profile"
                            sx={sidebarItemStyle}
                        >
                            <ListItemIcon sx={{ color: '#04C4D9', minWidth: 40 }}>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Thông tin cá nhân" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => toggleMenu('battery')} sx={sidebarItemStyle}>
                            <ListItemIcon sx={{ color: '#04C4D9', minWidth: 40 }}><Battery6Bar /></ListItemIcon>
                            <ListItemText primary="Pin" />
                            {menuStates.battery ? <ArrowDropUp /> : <ArrowDropDown />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={menuStates.battery} timeout={300}>
                        <List sx={{ p: 0 }}>
                            <ListItem disablePadding><ListItemButton component={Link as any} to="/staff/swap/status" sx={subItemStyle}><ListItemText primary="Quản lý trao đổi pin" /></ListItemButton></ListItem>
                            <ListItem disablePadding><ListItemButton component={Link as any} to="/staff/battery/station-list" sx={subItemStyle}><ListItemText primary="Danh sách pin tại trạm" /></ListItemButton></ListItem>
                            <ListItem disablePadding><ListItemButton component={Link as any} to="/reservation/pending-reservation-swap" sx={subItemStyle}><ListItemText primary="Quản lý đặt pin" /></ListItemButton></ListItem>
                        </List>
                    </Collapse>
                </List>
            </Box>

            {/* Auth Section */}
            <Box sx={{ p: 1, borderTop: '2px solid #04C4D9' }}>
                {!isLoggedIn ? (
                    <>
                        <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemButton component={Link as any} to="/login" sx={sidebarItemStyle}>
                                <ListItemIcon sx={{ color: '#04C4D9', minWidth: 40 }}><Login /></ListItemIcon>
                                <ListItemText primary="Đăng Nhập" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link as any} to="/register" sx={sidebarItemStyle}>
                                <ListItemIcon sx={{ color: '#04C4D9', minWidth: 40 }}><PersonAdd /></ListItemIcon>
                                <ListItemText primary="Đăng Ký" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout} sx={sidebarItemStyle}>
                            <ListItemIcon sx={{ color: '#04C4D9', minWidth: 40 }}><Logout /></ListItemIcon>
                            <ListItemText primary="Đăng Xuất" />
                        </ListItemButton>
                    </ListItem>
                )}
            </Box>
        </Paper>
    );
};

export default Sidebar;