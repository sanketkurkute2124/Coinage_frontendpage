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

        const linkedinUser = response.data.data;

        localStorage.setItem(
          "linkedinUser",
          JSON.stringify(linkedinUser)
        );

        navigate("/");
      } catch (error) {
        console.error(error);

        console.log(error.response);
        console.log(error.response?.data);

        alert(
          error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "LinkedIn Login Failed"
        );

        navigate("/login");
      }
    };

    linkedInLogin();
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h3>Signing in with LinkedIn...</h3>
      <p>Please wait...</p>
    </div>
  );
}

export default LinkedInCallback;