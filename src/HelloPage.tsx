import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Navigate } from "react-router-dom";
import { logout } from "./features/auth/authSlice";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import styles from "./features/auth/styles/LogoutButton.module.css";

const HelloPage: React.FC = () => {
    const { token, username } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    // Nếu chưa login thì về lại trang login
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div style={{padding: "2rem"}}>
            <h1>Hello, {username} 🎉</h1>
            <p>Bạn đã đăng nhập thành công!</p>
            <button
                onClick={handleLogout}
                className={styles.button}
            >
                Logout
            </button>

        </div>

    );
};

export default HelloPage;
