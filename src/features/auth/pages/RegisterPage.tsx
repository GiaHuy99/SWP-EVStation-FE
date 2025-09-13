import { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import styles from "../styles/RegisterPage.module.css";

const RegisterPage = () => {
    const { token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/hello"); // sau khi register thành công → HelloPage
        }
    }, [token, navigate]);

    return (
        <div className={styles.registerPage}>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
