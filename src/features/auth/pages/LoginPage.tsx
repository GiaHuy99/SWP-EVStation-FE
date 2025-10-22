import { useEffect } from "react";
import { useAppSelector } from "../../../app/Hooks";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
    const { token } = useAppSelector((state) => state.auth); // check token thay vì user
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/stations/list"); // login thành công thì sang HelloPage
        }
    }, [token, navigate]);

    return (
        <div className={styles.loginPage}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
