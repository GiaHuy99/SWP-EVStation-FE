import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/Hooks';
import { logout } from '../auth/AuthSlice';
import evstation from '../../asset/images/Hyundai-iF-Design-Award.jpg'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
    Fade,
    Slide,
    Stack,
    Chip,
    Grid,

} from '@mui/material';
import {
    Menu as MenuIcon,
    DirectionsCar,
    CreditCard,
    Subscriptions,
    SwapHoriz,
    Battery6Bar,
    LocalGasStation,
    Dashboard,
    Logout,

} from '@mui/icons-material';
import battery from "../../asset/icons/battery.png"
import charge from "../../asset/icons/charging-station.png"
import ContactSection from "../contactSection/ContactSection";
import bangGiaQuangDuong from '../../asset/images/quangduong.jpg';
import bangGiaNangLuong from '../../asset/images/nangluong.jpg';
import Paper from "@mui/material/Paper";
// Secondary Navigation Bar Component
const SecondaryNavbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        try {
            console.log('Logout initiated...');
            console.log('Current auth state before logout:', {
                token: localStorage.getItem('token'),
                username: localStorage.getItem('username'),
                role: localStorage.getItem('role')
            });

            // Dispatch Redux logout action to clear authentication state
            dispatch(logout());

            console.log('Redux logout action dispatched');

            // Verify localStorage is cleared
            setTimeout(() => {
                console.log('Auth state after logout:', {
                    token: localStorage.getItem('token'),
                    username: localStorage.getItem('username'),
                    role: localStorage.getItem('role')
                });

                console.log('Navigating to login page...');
                navigate('/login', { replace: true });
            }, 100);

        } catch (error) {
            console.error('Error during logout:', error);
            // Fallback: clear localStorage manually and navigate
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            navigate('/login', { replace: true });
        }
    };

    const navItems = [
        {
            label: 'Link Vehicle',
            path: '/linkVehicle/regist',
            icon: <DirectionsCar />
        },
        {
            label: 'Change Plan',
            path: '/subcriptionPlan/changePlanPage',
            icon: <CreditCard />
        },
        {
            label: 'My Plan',
            path: '/subscriptions',
            icon: <Subscriptions />
        },
        {
            label: 'Swap PIN',
            path: '/swapBattery',
            icon: <SwapHoriz />
        },
        {
            label: 'invoice History',
            path: '/invoice/history',
            icon: <Dashboard />
        }
    ];

    const drawer = (
        <Box 
            onClick={handleDrawerToggle} 
            sx={{ 
                textAlign: 'center', 
                backgroundColor: '#022601' // Dark green background
            }}
        >
            <Typography variant="h6" sx={{ my: 2, color: theme.palette.primary.main }}>
                EV Battery Swap
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={{
                                color: theme.palette.common.white,
                                '&:hover': {
                                    backgroundColor: 'rgba(4, 191, 51, 0.15)', // Primary green with opacity
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}

                {/* Logout Button in Mobile Drawer */}
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: 'rgba(4, 191, 51, 0.15)', // Primary green with opacity
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#022601', // Dark green background
                    boxShadow: theme.shadows[2],
                    zIndex: theme.zIndex.drawer + 1,
                    borderRadius: 0
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 0,
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            color: theme.palette.primary.main, // Bright green
                            letterSpacing: '0.5px'
                        }}
                    >
                        EV Battery Swap
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    color: theme.palette.common.white,
                                    backgroundColor: 'transparent',
                                    borderRadius: theme.shape.borderRadius,
                                    '&:hover': {
                                        backgroundColor: 'rgba(4, 191, 51, 0.15)', // Primary green with opacity
                                        color: theme.palette.primary.main, // Bright green
                                        transform: 'translateY(-1px)',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}

                        {/* Logout Button */}
                        <Button
                            onClick={handleLogout}
                            startIcon={<Logout />}
                            variant="outlined"
                            sx={{
                                color: theme.palette.primary.main, // Bright green
                                borderColor: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: 'rgba(4, 191, 51, 0.15)',
                                    borderColor: theme.palette.primary.main,
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Box>

                    {/* Mobile menu button */}
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

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
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
        </>
    );
};

// Advertisement Service Section Component
const AdvertisementSection: React.FC = () => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('advertisement-section');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    const services = [
        {
            icon: '⚡',
            title: 'Fast Charging',
            description: 'Get your battery fully charged in just minutes at any of our stations.',
            features: ['Quick Swap', '24/7 Available', 'Smart Stations']
        },
        {
            icon: '🌍',
            title: 'Wide Network',
            description: 'Access our extensive network of charging stations across the city.',
            features: ['10+ Stations in VIET NAM', 'City Coverage', 'Real-time Updates']
        },
        {
            icon: '💡',
            title: 'Smart Technology',
            description: 'Advanced battery management system for optimal performance.',
            features: ['AI-Powered', 'Analytics Dashboard', 'Predictive Maintenance']
        },
        {
            icon: '🔒',
            title: 'Secure & Safe',
            description: 'Your safety is our priority with industry-leading security standards.',
            features: ['Encrypted Data', 'Safety Certified', '24/7 Monitoring']
        }
    ];

    return (
        <Box id="advertisement-section" sx={{ py: 10, backgroundColor: '#022601' }}>
            <Container maxWidth="lg">
                <Fade in={isVisible} timeout={1000}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: theme.palette.common.white,
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}
                        >
                            Why Choose Our Service?
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.secondary.main, // Light green
                                maxWidth: '700px',
                                mx: 'auto',
                                lineHeight: 1.8
                            }}
                        >
                            Experience the future of electric vehicle battery management
                            with our innovative swap system
                        </Typography>
                    </Box>
                </Fade>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 4,
                        mt: 6
                    }}
                >
                    {services.map((service, index) => (
                        <Slide
                            key={index}
                            direction="up"
                            in={isVisible}
                            timeout={600 + index * 200}
                        >
                            <Card
                                sx={{
                                    backgroundColor: '#067302', // Very dark green
                                    border: `2px solid transparent`,
                                    borderRadius: Number(theme.shape.borderRadius) * 1.5,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'visible',
                                    '&:hover': {
                                        transform: 'translateY(-12px) scale(1.02)',
                                        borderColor: theme.palette.primary.main, // Bright green
                                        boxShadow: `0 20px 40px ${theme.palette.primary.main}40`,
                                        backgroundColor: '#078C03' // Dark green
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    },
                                    '&:hover::before': {
                                        opacity: 1
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            fontSize: '4rem',
                                            mb: 3,
                                            display: 'inline-block',
                                            animation: isVisible ? 'bounce 2s infinite' : 'none',
                                            '@keyframes bounce': {
                                                '0%, 100%': {
                                                    transform: 'translateY(0)'
                                                },
                                                '50%': {
                                                    transform: 'translateY(-10px)'
                                                }
                                            }
                                        }}
                                    >
                                        {service.icon}
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: theme.palette.common.white,
                                            fontSize: { xs: '1.3rem', md: '1.5rem' }
                                        }}
                                    >
                                        {service.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.secondary.main, // Light green
                                            mb: 3,
                                            lineHeight: 1.7,
                                            minHeight: '60px'
                                        }}
                                    >
                                        {service.description}
                                    </Typography>

                                    <Stack spacing={1} alignItems="center">
                                        {service.features.map((feature, idx) => (
                                            <Chip
                                                key={idx}
                                                label={feature}
                                                size="small"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    backgroundColor: theme.palette.primary.main, // Bright green
                                                    color: theme.palette.common.white,
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.primary.dark, // Dark green
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Slide>
                    ))}
                </Box>

                {/* Statistics Section */}
                <Fade in={isVisible} timeout={1500}>
                    <Box
                        sx={{
                            mt: 10,
                            py: 6,
                            borderRadius: Number(theme.shape.borderRadius) * 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #078C03 100%)`,
                            boxShadow: theme.shadows[8]
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(4, 1fr)'
                                },
                                gap: 4
                            }}
                        >
                            {[
                                { number: '50K+', label: 'Active Users' },
                                { number: '10+', label: 'Swap Stations In Viet Nam' },
                                { number: '1M+', label: 'Battery Swaps' },
                                { number: '99%', label: 'Satisfaction Rate' }
                            ].map((stat, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        textAlign: 'center',
                                        animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.15}s both` : 'none',
                                        '@keyframes fadeInUp': {
                                            '0%': {
                                                opacity: 0,
                                                transform: 'translateY(30px)'
                                            },
                                            '100%': {
                                                opacity: 1,
                                                transform: 'translateY(0)'
                                            }
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: theme.typography.fontWeightBold,
                                            color: theme.palette.common.white,
                                            mb: 1,
                                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.common.white,
                                            opacity: 0.9,
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

// Thành phần Trang chủ (Homepage Component)
const HomePage: React.FC = () => {
    const theme = useTheme();
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Secondary Navigation Bar */}
            <SecondaryNavbar />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${evstation})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 70%',
                        color: theme.palette.common.white,
                        py: 16,
                        textAlign: 'center'
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: theme.typography.fontWeightBold,
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                lineHeight: 1.2,
                                color: theme.palette.common.white
                            }}
                        >
                            Welcome to EV Battery Swap
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                opacity: 0.9,
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                maxWidth: '600px',
                                mx: 'auto',
                                color: theme.palette.common.white
                            }}
                        >
                            Manage your electric vehicle battery subscriptions and swap services efficiently
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                to="/linkVehicle/regist"
                                sx={{
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.primary.dark,
                                    px: 4,
                                    '&:hover': {
                                        backgroundColor: theme.palette.common.white,
                                    },
                                }}
                            >
                                Link Vehicle
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component={Link}
                                to="/map"
                                sx={{
                                    borderColor: theme.palette.common.white,
                                    color: theme.palette.common.white,
                                    px: 4,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderColor: theme.palette.common.white,
                                    },
                                }}
                            >
                                Find Swap Station
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Features Section */}
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            mb: 6,
                        }}
                    >
                        Key Features
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(3, 1fr)'
                            },
                            gap: 4,
                            mt: 4
                        }}
                    >
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box
                                    component="img"
                                    src={battery}
                                    alt="Battery Swap Icon"
                                    sx={{
                                        height: '48px',
                                        width: '48px',
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                                    Battery Swap
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                    Quick and efficient battery swapping at our network of stations across the city.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/swapBattery"
                                    variant="contained"
                                >
                                    Start Swap
                                </Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{ fontSize: '3rem', mb: 2 }}>
                                    📋
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                                    Plan Management
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                    Manage your subscription plans, upgrade or downgrade as needed for your usage.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/subscriptions"
                                    variant="contained"
                                >
                                    Manage Plan
                                </Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box
                                    component="img"
                                    src={charge}
                                    alt="Battery Swap Icon"
                                    sx={{
                                        height: '48px',
                                        width: '48px',
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                                    Vehicle Management
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                    Link and manage your electric vehicles for seamless battery swap services.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/linkVehicle/regist"
                                    variant="contained"
                                >
                                    Link Vehicle
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Container>

                {/* === BẮT ĐẦU SECTION BẢNG GIÁ DỊCH VỤ === */}
                <Box sx={{ py: 8, backgroundColor: theme.palette.background.paper }}>
                    <Container maxWidth="lg">
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                textAlign: 'center',
                                mb: 6,
                            }}
                        >
                            Bảng giá dịch vụ
                        </Typography>

                        <Grid container spacing={4} justifyContent="center">
                            {/* Ảnh 1 */}
                            <Grid >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        borderRadius: theme.shape.borderRadius,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: theme.shadows[8],
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={bangGiaNangLuong}
                                        alt="Bảng giá dịch vụ 1"
                                        sx={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </Paper>
                            </Grid>

                            {/* Ảnh 2 */}
                            <Grid>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        borderRadius: theme.shape.borderRadius,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: theme.shadows[8],
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={bangGiaQuangDuong}
                                        alt="Bảng giá dịch vụ 2"
                                        sx={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                {/* === KẾT THÚC SECTION BẢNG GIÁ === */}

                {/* CTA Section */}
                <Box sx={{ backgroundColor: theme.palette.background.default, py: 8, textAlign: 'center' }}>
                    <Container maxWidth="md">
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                mb: 3,
                            }}
                        >
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, lineHeight: 1.6 }}>
                            Join thousands of satisfied EV users and experience seamless battery swapping.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/linkVehicle/regist"
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.2rem',
                            }}
                        >
                            Get Started Today
                        </Button>
                    </Container>
                </Box>
            </Box>

            {/* Advertisement Section */}
            <AdvertisementSection />

            <ContactSection />



            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: '#022601',
                    color: theme.palette.secondary.main,
                    py: 4,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        © 2025 EV Battery Swap Management. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;