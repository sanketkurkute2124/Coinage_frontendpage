import { useState } from "react";
import { login } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
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

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(user);
     
      if (res.data.token) {
     console.log (localStorage.setItem("token", res.data.token));
     console.log(localStorage.setItem("customerId", res.data.customerId));
     console.log(localStorage.setItem("customerName", res.data.customerName));
      console.log(localStorage.setItem("role", res.data.role));
      
      alert("Login Successful");
      }

      navigate("/education");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
         "https://localhost:7116/api/Google/LoginIn",
        //  "http://localhost:5173/api/Google/signin",
        {
          idToken: credentialResponse.credential,
        }
      ); 

     if (res.data.token) {
       console.log (localStorage.setItem("token", res.data.token));
     console.log(localStorage.setItem("customerId", res.data.customerId));
     console.log(localStorage.setItem("customerName", res.data.customerName));
      console.log(localStorage.setItem("role", res.data.role));
      
      
      alert("Login Successful");
      }

      alert("Google Login Successful");

      navigate("/education");
    } catch (err) {
      console.log(err);
      alert("Google Login Failed");
    }
  };


  // LinkedIn Login
  // ==========================
  const handleLinkedInLogin = () => {
    const clientId = "778we1fuvooq5g";
    const redirectUri = encodeURIComponent(
    "http://localhost:5173/linkedin/callback"
  );

    const state = Math.random().toString(36).substring(2);

    localStorage.setItem("linkedin_state", state);

    window.location.href =
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=openid%20profile%20email` +
      `&state=${state}`;
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

        <button type="submit">Login</button>
      </form>

      <br />

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          alert("Google Login Failed");
        }}
      />

      <br />
 
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={handleLinkedInLogin}
      >
        Continue with LinkedIn
      </button>

      <br />

      <p>
        Don't have an account?
        <Link to="/"> Register</Link>
      </p>
    </div>
  );
}

export default Login;