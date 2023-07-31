import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import "../css/AuthStyles.css"; // Import the custom CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      // Handle successful login
      console.log(response.data);
      setAuthenticated(true);
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      // Handle login error (e.g., show an error message)
      console.error(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-form">
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
