import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      login(
        { email, password },
        {
          onSuccess: () => {
            setEmail("");
            setPassword("");
          },
        }
      );
    }
  }

  // useEffect(
  //   function () {
  //     if (isAuthenticated) navigate("/app", { replace: true });
  //   },
  //   [isAuthenticated, navigate]
  // );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
          />
        </div>
        <div>
          <Button type="primary" disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>
      <div className={styles.signup}>
        <Button
          type="primary"
          onClick={() => navigate("/signup")}
          disabled={isLoading}
        >
          Sign up
        </Button>
      </div>
    </main>
  );
}
