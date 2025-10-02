import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { logout, selectIsLoggedIn } from '../../../features/auth/AuthSlice';
import {
    Box,
    Button,
    Collapse,
    createTheme,
    ThemeProvider,
    Typography
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Icon cho ▼

const Navbar: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    // State cho từng cụm độc lập
    const [menuStates, setMenuStates] = useState<{ [key: string]: boolean }>({
        stations: false,
        battery: false,
        subscription: false,
        vehicle: false
    });

    const toggleMenu = (key: string) => {
        setMenuStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // Theme MUI với màu xanh lá pastel
    const theme = createTheme({
        palette: {
            primary: {
                main: '#A8E6CF', // Xanh lá pastel chính
            },
            secondary: {
                main: '#81C784', // Xanh lá đậm hơn cho hover
            },
        },
    });

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

                {/* Cụm Trạm Sạc */}
                <Box sx={{ position: 'relative', mx: 1 }}>
                    <Button
                        onClick={() => toggleMenu('stations')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'secondary.main' },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        Trạm Sạc
                    </Button>
                    <Collapse in={menuStates.stations} timeout={300} sx={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                border: '1px solid grey.300',
                                borderRadius: 1,
                                boxShadow: 1,
                                minWidth: 150,
                            }}
                        >
                            <Button
                                component={Link as any}
                                to="/stations/list"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname.startsWith('/stations/list') ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Danh Sách
                            </Button>
                            <Button
                                component={Link as any}
                                to="/stations/create"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname === '/stations/create' ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Tạo Trạm Sạc
                            </Button>
                        </Box>
                    </Collapse>
                </Box>

                {/* Cụm Pin */}
                <Box sx={{ position: 'relative', mx: 1 }}>
                    <Button
                        onClick={() => toggleMenu('battery')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'secondary.main' },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        Pin
                    </Button>
                    <Collapse in={menuStates.battery} timeout={300} sx={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                border: '1px solid grey.300',
                                borderRadius: 1,
                                boxShadow: 1,
                                minWidth: 150,
                            }}
                        >
                            <Button
                                component={Link as any}
                                to="/battery/list"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname.startsWith('/battery/list') ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Danh Sách
                            </Button>
                            <Button
                                component={Link as any}
                                to="/battery/create"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname === '/battery/create' ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Tạo Pin
                            </Button>
                        </Box>
                    </Collapse>
                </Box>

                {/* Cụm Gói Đăng Ký */}
                <Box sx={{ position: 'relative', mx: 1 }}>
                    <Button
                        onClick={() => toggleMenu('subscription')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'secondary.main' },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        Gói Đăng Ký
                    </Button>
                    <Collapse in={menuStates.subscription} timeout={300} sx={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                border: '1px solid grey.300',
                                borderRadius: 1,
                                boxShadow: 1,
                                minWidth: 150,
                            }}
                        >
                            <Button
                                component={Link as any}
                                to="/subcriptionPlan/list"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: (location.pathname.startsWith('/subcriptionPlan') && !location.pathname.includes('change')) ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Danh Sách
                            </Button>
                            <Button
                                component={Link as any}
                                to="/subcriptionPlan/create"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname === '/subcriptionPlan/create' ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Tạo Gói
                            </Button>
                        </Box>
                    </Collapse>
                </Box>

                {/* Cụm Xe */}
                <Box sx={{ position: 'relative', mx: 1 }}>
                    <Button
                        onClick={() => toggleMenu('vehicle')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'secondary.main' },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        Xe
                    </Button>
                    <Collapse in={menuStates.vehicle} timeout={300} sx={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                border: '1px solid grey.300',
                                borderRadius: 1,
                                boxShadow: 1,
                                minWidth: 150,
                            }}
                        >
                            <Button
                                component={Link as any}
                                to="/vehicle/list"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname.startsWith('/vehicle/list') ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Danh Sách
                            </Button>
                            <Button
                                component={Link as any}
                                to="/vehicle/create"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'text.primary',
                                    fontWeight: location.pathname === '/vehicle/create' ? 'bold' : 'normal',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                            >
                                Tạo Xe
                            </Button>
                        </Box>
                    </Collapse>
                </Box>

                {/* Các link riêng lẻ */}
                <Button
                    component={Link as any}
                    to="/subscriptions"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: location.pathname === '/subscriptions' ? 'bold' : 'normal',
                        '&:hover': { backgroundColor: 'secondary.main' },
                    }}
                >
                    Gói Của Người Dùng
                </Button>
                <Button
                    component={Link as any}
                    to="/linkVehicle/regist"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: location.pathname === '/linkVehicle/regist' ? 'bold' : 'normal',
                        '&:hover': { backgroundColor: 'secondary.main' },
                    }}
                >
                    Liên Kết Xe
                </Button>
                <Button
                    component={Link as any}
                    to="/subcriptionPlan/changePlanPage"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: location.pathname === '/subcriptionPlan/changePlanPage' ? 'bold' : 'normal',
                        '&:hover': { backgroundColor: 'secondary.main' },
                    }}
                >
                    Thay Đổi Gói
                </Button>

                {/* Phần auth */}
                {!isLoggedIn ? (
                    <>
                        <Button
                            component={Link as any}
                            to="/login"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                '&:hover': { backgroundColor: 'secondary.main' },
                            }}
                        >
                            Đăng Nhập
                        </Button>
                        <Button
                            component={Link as any}
                            to="/register"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                '&:hover': { backgroundColor: 'secondary.main' },
                            }}
                        >
                            Đăng Ký
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={handleLogout}
                        sx={{
                            color: 'black',
                            textDecoration: 'underline',
                            '&:hover': { backgroundColor: 'secondary.main' },
                        }}
                    >
                        Đăng Xuất
                    </Button>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default Navbar;