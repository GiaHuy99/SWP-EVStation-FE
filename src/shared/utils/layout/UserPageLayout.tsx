import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const UserPageLayout: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Top Navigation Bar with Home Button */}
            <Box
                sx={{
                    backgroundColor: '#1a1a1a',
                    py: 2,
                    px: 3,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
            >
                <Container maxWidth="lg">
                    <Button
                        component={Link}
                        to="/homepage"
                        startIcon={<HomeIcon />}
                        sx={{
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(100, 181, 246, 0.15)',
                                color: '#64b5f6',
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
