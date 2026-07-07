import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await login(user);

      console.log(res);

      // Save JWT Token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("customerId", res.data.customerId);
      localStorage.setItem("customerName", res.data.customerName);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      // Navigate to Education Page
      navigate("/education");

    } catch (err) {

      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
      console.log("Request:", user);
      alert(err.response?.data?.message || "Login Failed");


    }
  };

  return (
    <div className="container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>
        Don't have an account?
        <Link to="/"> Register</Link>
      </p>

    </div>
  );
}

export default Login;