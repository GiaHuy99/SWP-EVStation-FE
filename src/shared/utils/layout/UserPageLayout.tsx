import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/Hooks';
import { logout } from '../../../features/auth/AuthSlice';
import {
    Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    useTheme, useMediaQuery, Container, CssBaseline
} from '@mui/material';
import {
    Menu as MenuIcon,
    Person as PersonIcon,
    CreditCard,
    AccountBalanceWallet as AccountBalanceWalletIcon,
    CalendarMonth as CalendarMonthIcon,
    Logout, SwapHoriz as SwapHorizIcon
} from '@mui/icons-material';
import UserMenuDropdown from "./UserMenuDropdown";

const UserPageLayout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login', { replace: true });
    };

    const navItems = [

    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: '#000000' }}>
            <Typography variant="h6" sx={{ my: 2, color: theme.palette.primary.main }}>
                EV Battery Swap
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton component={Link} to={item.path} sx={{
                            color: theme.palette.common.white,
                            '&:hover': { backgroundColor: 'rgba(4, 191, 51, 0.15)' },
                        }}>
                            <ListItemIcon sx={{ color: theme.palette.primary.main }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} sx={{
                        color: theme.palette.primary.main,
                        '&:hover': { backgroundColor: 'rgba(4, 191, 51, 0.15)' },
                    }}>
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                {/* SECONDARY NAVBAR – ĐÚNG 100% NHƯ GỐC */}
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: '#000000',
                        boxShadow: theme.shadows[2],
                        zIndex: theme.zIndex.drawer + 1,
                        borderRadius: 0
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>

                        {/* Logo – Click về Home */}
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                textTransform: 'none',
                                p: 0,
                                '&:hover': { backgroundColor: 'transparent' }
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 0,
                                    fontWeight: 700,
                                    fontSize: '1.5rem',
                                    color: theme.palette.primary.main,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                EV Battery Swap
                            </Typography>
                        </Button>

                        {/* Desktop Navigation */}

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>

                            <UserMenuDropdown />

                        </Box>

                        {/* Mobile Menu Button */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Mobile Drawer – đúng y nguyên */}
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 280,
                            paddingTop: '1rem',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, mt: { xs: 7, sm: 8 } }}>
                    <Container maxWidth="lg" sx={{ py: 4 }}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default UserPageLayout;