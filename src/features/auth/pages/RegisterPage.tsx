import { useEffect } from "react";
import { useAppSelector } from "../../../app/Hooks";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import styles from "../styles/RegisterPage.module.css";

const RegisterPage = () => {
    const { token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const { registerSuccess } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (registerSuccess) {
            navigate("/login");
        }
    }, [registerSuccess, navigate]);

    return (
        <div className={styles.registerPage}>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
