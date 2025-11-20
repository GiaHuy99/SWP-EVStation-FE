import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Sidebar from './Sidebar';

const Layout: FC = () => {
    const theme = useTheme();
    
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: { xs: '250px', sm: '280px' }, // Responsive margin for sidebar width
                    p: { xs: 2, sm: 3 },
                    backgroundColor: theme.palette.background.default,
                    minHeight: '100vh',
                    transition: 'margin-left 0.3s ease-in-out',
                }}
            >
                <Outlet /> {/* Render nội dung route ở đây */}
            </Box>
        </Box>
    );
};

export default Layout;