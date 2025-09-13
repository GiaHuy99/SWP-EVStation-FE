
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { login } from "../authThunks";
import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2 className={styles.title}>Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            <p className={styles.registerLink}>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </form>
    );
};

export default LoginForm;
