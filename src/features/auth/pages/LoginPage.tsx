import { useEffect } from "react";
import { useAppSelector } from "../../../app/Hooks";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
    // Lấy cả token và role từ Redux state
    const { token, role } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Chỉ thực hiện điều hướng khi có cả token và role
        if (token && role) {
            if (role === "ADMIN") {
                navigate("/stations/list");
            } else if (role === "USER") {
                navigate("/homepage");
            }
            else if (role === "STAFF") {
                navigate("/staff/swap/status");
            }

            // Bạn có thể thêm else cho các trường hợp role khác nếu cần
        }
    }, [token, role, navigate]); // Thêm role vào dependency array

    return (
        <div className={styles.loginPage}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
