"use client";

import { useRef, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import InputField, { InputFieldHandle } from "../../SharedComponents/basicComponents/InputField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from "./LoginPage.module.css";
import { loginUser } from "../../services/userService";
import { AuthContext } from "@/app/context/AuthContext";

const Login = () => {
  const userRef = useRef<InputFieldHandle>(null);
  const passRef = useRef<InputFieldHandle>(null);
  const [formError, setFormError] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userName = userRef.current?.getValue();
    const password = passRef.current?.getValue();

    userRef.current?.clearError();
    passRef.current?.clearError();
    setFormError("");

    if (!userName) return userRef.current?.setError("Username is required");
    if (!password) return passRef.current?.setError("Password is required");

    try {
      const token = await loginUser(userName, password);
      login(token);
      router.push("/");
    } catch {
      setFormError("Invalid username or password");
      passRef.current?.setError(" ");
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} className={styles.formBox}>
      <h2 className={styles.heading}>Admin Login</h2>
      <InputField ref={userRef} label="Username" />
      <InputField ref={passRef} label="Password" type="password" />
      <Button type="submit" variant="contained" fullWidth className={styles.loginButton}>
        Login
      </Button>
      {formError && <p className={styles.errorText}>{formError}</p>}
    </Box>
  );
};

export default Login;
