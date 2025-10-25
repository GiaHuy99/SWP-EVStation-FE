import React from 'react';
import { Link } from 'react-router-dom';
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
    useMediaQuery
} from '@mui/material';
import {
    Menu as MenuIcon,
    DirectionsCar,
    CreditCard,
    Subscriptions,
    SwapHoriz,
    Battery6Bar,
    LocalGasStation,
    Dashboard
} from '@mui/icons-material';

// Secondary Navigation Bar Component
const SecondaryNavbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, color: '#1976d2' }}>
                EV Battery Swap
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={{
                                color: '#333',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#1976d2' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ 
                    backgroundColor: '#1a1a1a',
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
                            color: '#ffffff',
                            letterSpacing: '0.5px'
                        }}
                    >
                        EV Battery Swap
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    fontSize: '0.95rem',
                                    fontWeight: '400',
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(100, 181, 246, 0.15)',
                                        color: '#64b5f6',
                                        transform: 'translateY(-1px)',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
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
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                                    backgroundColor: '#ffffff',
                                    color: '#1976d2',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
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
                                to="/swapBattery"
                                sx={{
                                    borderColor: '#ffffff',
                                    color: '#ffffff',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderColor: '#ffffff',
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
                            color: '#333',
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
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{ fontSize: '3rem', mb: 2, color: '#1976d2' }}>
                                    🔄
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                                    Battery Swap
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                    Quick and efficient battery swapping at our network of stations across the city.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/swapBattery"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        px: 3,
                                        '&:hover': { backgroundColor: '#1565c0' }
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
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{ fontSize: '3rem', mb: 2, color: '#1976d2' }}>
                                    📋
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                                    Plan Management
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                    Manage your subscription plans, upgrade or downgrade as needed for your usage.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/subscriptions"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        px: 3,
                                        '&:hover': { backgroundColor: '#1565c0' }
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
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{ fontSize: '3rem', mb: 2, color: '#1976d2' }}>
                                    🚗
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                                    Vehicle Management
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                    Link and manage your electric vehicles for seamless battery swap services.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                <Button
                                    component={Link}
                                    to="/linkVehicle/regist"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        px: 3,
                                        '&:hover': { backgroundColor: '#1565c0' }
                                    }}
                                >
                                    Link Vehicle
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Container>

                {/* CTA Section */}
                <Box sx={{ backgroundColor: '#f8f9fa', py: 8, textAlign: 'center' }}>
                    <Container maxWidth="md">
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                mb: 3,
                                color: '#333',
                                fontSize: { xs: '2rem', md: '2.5rem' }
                            }}
                        >
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, color: '#666', lineHeight: 1.6 }}>
                            Join thousands of satisfied EV users and experience seamless battery swapping.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/linkVehicle/regist"
                            sx={{
                                backgroundColor: '#1976d2',
                                px: 6,
                                py: 2,
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                borderRadius: '8px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Get Started Today
                        </Button>
                    </Container>
                </Box>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: '#1a1a1a',
                    color: 'white',
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