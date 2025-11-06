import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/Hooks';
import { logout } from '../auth/AuthSlice';
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
    Chip
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
    Logout
} from '@mui/icons-material';
import battery from "../../asset/icons/battery.png"
import charge from "../../asset/icons/charging-station.png"
import ContactSection from "../contactSection/ContactSection";

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
        }
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: '#202426' }}>
            <Typography variant="h6" sx={{ my: 2, color: '#9DA65D' }}>
                EV Battery Swap
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={{
                                color: '#F2F2F2',
                                '&:hover': {
                                    backgroundColor: 'rgba(157, 166, 93, 0.15)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#6C733D' }}>
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
                            color: '#9DA65D',
                            '&:hover': {
                                backgroundColor: 'rgba(157, 166, 93, 0.1)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#9DA65D' }}>
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
                    backgroundColor: '#202426',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: theme.zIndex.drawer + 1
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 0,
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: '#9DA65D',
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
                                    color: '#F2F2F2',
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    fontSize: '0.95rem',
                                    fontWeight: '400',
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(157, 166, 93, 0.15)',
                                        color: '#9DA65D',
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
                            sx={{
                                color: '#F2F2F2',
                                backgroundColor: 'transparent',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '0.95rem',
                                fontWeight: '400',
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(157, 166, 93, 0.3)',
                                '&:hover': {
                                    backgroundColor: 'rgba(157, 166, 93, 0.15)',
                                    color: '#9DA65D',
                                    borderColor: '#9DA65D',
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
            features: ['500+ Stations', 'City Coverage', 'Real-time Updates']
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
        <Box id="advertisement-section" sx={{ py: 10, backgroundColor: '#202426' }}>
            <Container maxWidth="lg">
                <Fade in={isVisible} timeout={1000}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                color: '#F2F2F2',
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}
                        >
                            Why Choose Our Service?
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#8C8C88',
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
                                    backgroundColor: '#282B2F',
                                    border: '2px solid transparent',
                                    borderRadius: '16px',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'visible',
                                    '&:hover': {
                                        transform: 'translateY(-12px) scale(1.02)',
                                        borderColor: '#6C733D',
                                        boxShadow: '0 20px 40px rgba(108,115,61,0.25)',
                                        backgroundColor: '#2E3236'
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: 'linear-gradient(90deg, #6C733D, #9DA65D)',
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
                                            fontWeight: 'bold',
                                            mb: 2,
                                            color: '#F2F2F2',
                                            fontSize: { xs: '1.3rem', md: '1.5rem' }
                                        }}
                                    >
                                        {service.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#8C8C88',
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
                                                    backgroundColor: '#6C733D',
                                                    color: '#F2F2F2',
                                                    fontSize: '0.75rem',
                                                    '&:hover': {
                                                        backgroundColor: '#9DA65D'
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
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #6C733D 0%, #9DA65D 100%)',
                            boxShadow: '0 10px 40px rgba(108,115,61,0.3)'
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
                                { number: '500+', label: 'Swap Stations' },
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
                                            fontWeight: 'bold',
                                            color: '#F2F2F2',
                                            mb: 1,
                                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#F2F2F2',
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
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Secondary Navigation Bar */}
            <SecondaryNavbar />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #6C733D 0%, #9DA65D 100%)',
                        color: 'white',
                        py: 8,
                        textAlign: 'center'
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                lineHeight: 1.2
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
                                mx: 'auto'
                            }}
                        >
                            Manage your electric vehicle battery subscriptions and swap services efficiently
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                to="/subscriptions"
                                sx={{
                                    backgroundColor: '#F2F2F2',
                                    color: '#6C733D',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                View My Plan
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component={Link}
                                to="/map"
                                sx={{
                                    borderColor: '#F2F2F2',
                                    color: '#F2F2F2',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(242,242,242,0.1)',
                                        borderColor: '#F2F2F2',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease'
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
                            fontWeight: 'bold',
                            color: '#202426',
                            fontSize: { xs: '2rem', md: '2.5rem' }
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
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: '1px solid #F2F2F2',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(108,115,61,0.2)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box
                                    component="img" // Dùng Box của MUI để render thẻ <img>
                                    src={battery}
                                    alt="Battery Swap Icon"
                                    sx={{
                                        height: '48px', // Đặt kích thước cho icon
                                        width: '48px',
                                        mb: 2, // Margin bottom
                                    }}
                                />
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#202426' }}>
                                    Battery Swap
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#8C8C88', lineHeight: 1.6 }}>
                                    Quick and efficient battery swapping at our network of stations across the city.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/swapBattery"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#6C733D',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        px: 3,
                                        color: '#F2F2F2',
                                        '&:hover': { backgroundColor: '#9DA65D' }
                                    }}
                                >
                                    Start Swap
                                </Button>
                            </CardActions>
                        </Card>

                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: '1px solid #F2F2F2',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(108,115,61,0.2)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{ fontSize: '3rem', mb: 2 }}>
                                    📋
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#202426' }}>
                                    Plan Management
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#8C8C88', lineHeight: 1.6 }}>
                                    Manage your subscription plans, upgrade or downgrade as needed for your usage.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/subscriptions"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#6C733D',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        px: 3,
                                        color: '#F2F2F2',
                                        '&:hover': { backgroundColor: '#9DA65D' }
                                    }}
                                >
                                    Manage Plan
                                </Button>
                            </CardActions>
                        </Card>

                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: '1px solid #F2F2F2',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(108,115,61,0.2)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box
                                    component="img" // Dùng Box của MUI để render thẻ <img>
                                    src={charge}
                                    alt="Battery Swap Icon"
                                    sx={{
                                        height: '48px', // Đặt kích thước cho icon
                                        width: '48px',
                                        mb: 2, // Margin bottom
                                    }}
                                />
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#202426' }}>
                                    Vehicle Management
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#8C8C88', lineHeight: 1.6 }}>
                                    Link and manage your electric vehicles for seamless battery swap services.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/linkVehicle/regist"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#6C733D',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        px: 3,
                                        color: '#F2F2F2',
                                        '&:hover': { backgroundColor: '#9DA65D' }
                                    }}
                                >
                                    Link Vehicle
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Container>

                {/* CTA Section */}
                <Box sx={{ backgroundColor: '#F2F2F2', py: 8, textAlign: 'center' }}>
                    <Container maxWidth="md">
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                mb: 3,
                                color: '#202426',
                                fontSize: { xs: '2rem', md: '2.5rem' }
                            }}
                        >
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, color: '#8C8C88', lineHeight: 1.6 }}>
                            Join thousands of satisfied EV users and experience seamless battery swapping.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/linkVehicle/regist"
                            sx={{
                                backgroundColor: '#6C733D',
                                px: 6,
                                py: 2,
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                borderRadius: '8px',
                                textTransform: 'none',
                                color: '#F2F2F2',
                                '&:hover': {
                                    backgroundColor: '#9DA65D',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(108,115,61,0.3)',
                                },
                                transition: 'all 0.3s ease'
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
                    backgroundColor: '#202426',
                    color: '#F2F2F2',
                    py: 4,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        © 2025 EV Battery Swap Management. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;