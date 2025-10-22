import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: FC = () => {
    return (
        <div>
            <Navbar />
            <Outlet /> {/* Render nội dung route ở đây */}
        </div>
    );
};

export default Layout;