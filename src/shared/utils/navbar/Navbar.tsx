import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { logout, selectIsLoggedIn } from '../../../features/auth/AuthSlice';
import {
    Box,
    Button,
    createTheme,
    ThemeProvider,
    Menu,
    MenuItem
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    // 1. Thay đổi state: Thay vì dùng boolean, ta lưu trữ element làm "mỏ neo" cho Menu
    const [anchorEls, setAnchorEls] = useState<{ [key: string]: null | HTMLElement }>({
        stations: null,
        battery: null,
        subscription: null,
        vehicle: null,
    });

    // 2. Tạo hàm mở menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, key: string) => {
        setAnchorEls(prev => ({ ...prev, [key]: event.currentTarget }));
    };

    // 3. Tạo hàm đóng menu
    const handleMenuClose = (key: string) => {
        setAnchorEls(prev => ({ ...prev, [key]: null }));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#A8E6CF',
            },
            secondary: {
                main: '#81C784',
            },
        },
    });

    // Hàm tiện ích để tạo menu
    const createMenu = (key: string, label: string, items: { to: string, label: string, activeCheck?: () => boolean }[]) => (
        <Box sx={{ mx: 1 }}>
            <Button
                onClick={(e) => handleMenuOpen(e, key)}
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'secondary.main' },
                }}
                endIcon={<ArrowDropDownIcon />}
            >
                {label}
            </Button>
            <Menu
                anchorEl={anchorEls[key]}
                open={Boolean(anchorEls[key])}
                onClose={() => handleMenuClose(key)}
                // Căn chỉnh menu khớp với button
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {items.map(item => (
                    <MenuItem
                        key={item.to}
                        component={Link}
                        to={item.to}
                        onClick={() => handleMenuClose(key)}
                        sx={{
                            fontWeight: item.activeCheck ? (item.activeCheck() ? 'bold' : 'normal') : 'normal'
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="nav"
                sx={{
                    backgroundColor: 'primary.main',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    fontFamily: 'Arial, sans-serif',
                    color: 'white',
                }}
            >
                {/* Sử dụng hàm createMenu để render */}
                {createMenu('stations', 'Trạm Sạc', [
                    { to: '/stations/list', label: 'Danh Sách', activeCheck: () => location.pathname.startsWith('/stations/list') },
                    { to: '/stations/create', label: 'Tạo Trạm Sạc', activeCheck: () => location.pathname === '/stations/create' },
                ])}

                {createMenu('battery', 'Pin', [
                    { to: '/batteryType/list', label: 'Danh Sách Pin Type', activeCheck: () => location.pathname.startsWith('/batteryType/list') },
                    { to: '/batteryType/create', label: 'Tạo Pin Type', activeCheck: () => location.pathname === '/batteryType/create' },
                    { to: '/battery/create', label: 'Tạo Serial', activeCheck: () => location.pathname.startsWith('/battery/create') },
                    { to: '/battery/list', label: 'Danh Sách Serial', activeCheck: () => location.pathname.startsWith('/battery/list') },
                ])}

                {createMenu('subscription', 'Gói Đăng Ký', [
                    { to: '/subcriptionPlan/list', label: 'Danh Sách', activeCheck: () => location.pathname.startsWith('/subcriptionPlan/list') },
                    { to: '/subcriptionPlan/create', label: 'Tạo Gói', activeCheck: () => location.pathname === '/subcriptionPlan/create' },
                ])}

                {createMenu('vehicle', 'Xe', [
                    { to: '/vehicle/list', label: 'Danh Sách', activeCheck: () => location.pathname.startsWith('/vehicle/list') },
                    { to: '/vehicle/create', label: 'Tạo Xe', activeCheck: () => location.pathname === '/vehicle/create' },
                ])}


                {/* Các link riêng lẻ */}
                <Button component={Link} to="/subscriptions" sx={{ color: 'white', textDecoration: 'none', fontWeight: location.pathname === '/subscriptions' ? 'bold' : 'normal', '&:hover': { backgroundColor: 'secondary.main' } }}>
                    Gói Của Người Dùng
                </Button>
                <Button component={Link} to="/linkVehicle/regist" sx={{ color: 'white', textDecoration: 'none', fontWeight: location.pathname === '/linkVehicle/regist' ? 'bold' : 'normal', '&:hover': { backgroundColor: 'secondary.main' } }}>
                    Liên Kết Xe
                </Button>
                <Button component={Link} to="/subcriptionPlan/changePlanPage" sx={{ color: 'white', textDecoration: 'none', fontWeight: location.pathname === '/subcriptionPlan/changePlanPage' ? 'bold' : 'normal', '&:hover': { backgroundColor: 'secondary.main' } }}>
                    Thay Đổi Gói
                </Button>

                {/* Phần auth */}
                {!isLoggedIn ? (
                    <>
                        <Button component={Link} to="/login" sx={{ color: 'white', textDecoration: 'none', '&:hover': { backgroundColor: 'secondary.main' } }}>
                            Đăng Nhập
                        </Button>
                        <Button component={Link} to="/register" sx={{ color: 'white', textDecoration: 'none', '&:hover': { backgroundColor: 'secondary.main' } }}>
                            Đăng Ký
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleLogout} sx={{ color: 'black', textDecoration: 'underline', '&:hover': { backgroundColor: 'secondary.main' } }}>
                        Đăng Xuất
                    </Button>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default Navbar;