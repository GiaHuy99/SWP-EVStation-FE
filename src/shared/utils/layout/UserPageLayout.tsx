import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Box, Button, Container, useTheme } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const UserPageLayout: React.FC = () => {
    const theme = useTheme();
    
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
            {/* Top Navigation Bar with Home Button */}
            <Box
                sx={{
                    backgroundColor: '#202426',
                    py: 2,
                    px: 3,
                    boxShadow: theme.shadows[2]
                }}
            >
                <Container maxWidth="lg">
                    <Button
                        component={Link}
                        to="/homepage"
                        startIcon={<HomeIcon />}
                        sx={{
                            color: theme.palette.common.white,
                            backgroundColor: 'transparent',
                            borderRadius: theme.shape.borderRadius,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                                color: theme.palette.secondary.main,
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        Back to Home
                    </Button>
                </Container>
            </Box>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default UserPageLayout;
