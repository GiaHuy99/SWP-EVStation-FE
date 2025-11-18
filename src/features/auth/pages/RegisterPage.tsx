import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/Hooks";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { resetRegisterSuccess } from "../AuthSlice";
import styles from "../styles/RegisterPage.module.css";

const RegisterPage = () => {
    const { registerSuccess } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (registerSuccess) {
            navigate("/login");
            dispatch(resetRegisterSuccess());
        }
    }, [registerSuccess, navigate, dispatch]);

    return (
        <div className={styles.registerPage}>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
