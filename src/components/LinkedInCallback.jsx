import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LinkedInCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const linkedInLogin = async () => {
      const params = new URLSearchParams(window.location.search);

      const code = params.get("code");
      const state = params.get("state");

      const savedState = localStorage.getItem("linkedin_state");

      if (!code) {
        alert("Authorization code not found.");
        navigate("/login");
        return;
      }

      if (state !== savedState) {
        alert("Invalid state.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          "https://localhost:7116/api/LinkedIn/LoginIn",
          {
            code: code,
          }
        );

        if (response.data.token)
           {
          console.log(localStorage.setItem("token", response.data.token));
          console.log(localStorage.setItem("customerId", response.data.customerId));
          console.log(localStorage.setItem("customerName", response.data.customerName));
          console.log(localStorage.setItem("role", response.data.role));

          
          alert("LinkedIn Login Successful");

          navigate("/education");
        } else {
          alert("Login failed.");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "LinkedIn Login Failed");
        navigate("/login");
      }
    };

    linkedInLogin();
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h3>Signing in with LinkedIn...</h3>
      <p>Please wait.</p>
    </div>
  );
}

export default LinkedInCallback;