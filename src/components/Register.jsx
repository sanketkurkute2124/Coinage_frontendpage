import { useState, useEffect } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { linkedInLogin } from "../services/linkedinService";
import axios from "axios";

function Register() {
  
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    role: "Customer",
  });

  const [picture, setPicture] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Register Customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending Data :", customer);

      const response = await register(customer);

      console.log(response.data);

      alert("Registration Successful");

      // Clear form
      setCustomer({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        password: "",
        role: "Customer",
      });

      setPicture("");
    } catch (error) {
      console.log(error.response?.data || error);

      alert(
        JSON.stringify(error.response?.data?.errors || error.response?.data)
      );
    }
  };

  // Google Login
  const handleGoogleFetch = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "https://localhost:7116/api/Google/LoginIn",
        {
          idToken: credentialResponse.credential,
        }
      );

      console.log(res.data);

      const user = res.data.data;

      setCustomer((prev) => ({
        ...prev,
        firstName: user.customerName || "",
        lastName: "",
        email: user.email || "",
      }));

      alert("Google details loaded successfully");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Google Login Failed");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("linkedinUser");

    if (!data) return;

    try {
      const linkedinUser = JSON.parse(data);

      setCustomer((prev) => ({
        ...prev,
        firstName: linkedinUser.firstName || "",
        lastName: linkedinUser.lastName || "",
        email: linkedinUser.email || "",
      }));

      localStorage.removeItem("linkedinUser");
    } catch (err) {
      console.error("Invalid linkedinUser in localStorage:", data);
      console.error(err);
    }
  }, []);
  // LinkedIn Login

  // ==========================
  const handleLinkedInLogin = () => {
    //   const clientId = "778we1fuvooq5g";
    //   const redirectUri = encodeURIComponent(
    //   "http://localhost:5173/linkedin/callback"
    // );

    //   const state = Math.random().toString(36).substring(2);

    //   console.log("LinkedIn State:", state);

    //   localStorage.setItem("linkedin_state", state);

    //   window.location.href =
    //     `https://www.linkedin.com/oauth/v2/authorization` +
    //     `?response_type=code` +
    //     `&client_id=${clientId}` +
    //     `&redirect_uri=${redirectUri}` +
    //     `&scope=openid%20profile%20email` +
    //     `&state=${state}`;
    linkedInLogin();


  };




  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <h2 className="text-center mb-4">Customer Registration</h2>

        {picture && (
          <div className="text-center mb-3">
            <img
              src={picture}
              alt="Profile"
              width="100"
              height="100"
              style={{
                borderRadius: "50%",
                border: "2px solid gray",
              }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={customer.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={customer.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="date"
              name="dateOfBirth"
              value={customer.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={customer.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              name="role"
              value={customer.role}
              onChange={handleChange}
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>

        <hr />

        <div className="text-center mb-3">
          <GoogleLogin
            onSuccess={handleGoogleFetch}
            onError={() => {
              alert("Google Login Failed");
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleLinkedInLogin}
        >
          Continue with LinkedIn
        </button>

        <div className=""></div>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;



// import { useState, useEffect } from "react";
// import { register } from "../services/authService";
// import { Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { linkedInLogin } from "../services/linkedinService";
// import axios from "axios";

// function Register() {
//   const [customer, setCustomer] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     password: "",
//     role: "Customer",
//   });

//   const [picture, setPicture] =useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     setCustomer((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Register Customer
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log("Sending Data:", customer);

//       const response = await register(customer);

//       console.log(response.data);

//       alert("Registration Successful");

//       // Reset Form
//       setCustomer({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         dateOfBirth: "",
//         password: "",
//         role: "Customer",
//       });

//       // setPicture("");
//     } catch (error) {
//       console.log(error.response?.data || error);

//       alert(
//         JSON.stringify(error.response?.data?.errors || error.response?.data)
//       );
//     }
//   };

//   // ==========================
//   // Google Login
//   // ==========================
//   const handleGoogleFetch = async (credentialResponse) => {
//     try {
//       const res = await axios.post(
//         "https://localhost:7116/api/Google/LoginIn",
//         {
//           idToken: credentialResponse.credential,
//         }
//       );

//       console.log(res.data);

//       const user = res.data.data;

//       setCustomer((prev) => ({
//         ...prev,
//         firstName: user.firstName || user.customerName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//       }));

//       setPicture(user.picture || "");

//       alert("Google details loaded successfully");
//     } catch (err) {
//       console.log(err.response?.data || err);
//       alert("Google Login Failed");
//     }
//   };

//   // ==========================
//   // LinkedIn Callback Data
//   // ==========================
//   useEffect(() => {
//     const data = localStorage.getItem("linkedinUser");

//     if (!data) return;

//     try {
//       const linkedinUser = JSON.parse(data);

//       console.log("LinkedIn User:", linkedinUser);

//       setCustomer((prev) => ({
//         ...prev,
//         firstName: linkedinUser.firstName || "",
//         lastName: linkedinUser.lastName || "",
//         email: linkedinUser.email || "",
//       }));

//       setPicture(linkedinUser.picture || "");

//       localStorage.removeItem("linkedinUser");
//     } catch (err) {
//       console.error(err);
//     }
//   }, []);

//   // ==========================
//   // LinkedIn Login
//   // ==========================
//   const handleLinkedInLogin = () => {
//     linkedInLogin();
//   };

//   return (
//     <div className="container mt-5">
//       <div
//         className="card shadow p-4"
//         style={{ maxWidth: "500px", margin: "auto" }}
//       >
//         <h2 className="text-center mb-4">Customer Registration</h2>

//         {picture && (
//           <div className="text-center mb-3">
//             <img
//               src={picture}
//               alt="Profile"
//               width="120"
//               height="120"
//               style={{
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 border: "2px solid #0d6efd",
//               }}
//             />
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               className="form-control"
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={customer.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               className="form-control"
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={customer.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               className="form-control"
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={customer.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               className="form-control"
//               type="text"
//               name="phoneNumber"
//               placeholder="Phone Number"
//               value={customer.phoneNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               className="form-control"
//               type="date"
//               name="dateOfBirth"
//               value={customer.dateOfBirth}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               className="form-control"
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={customer.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <select
//               className="form-select"
//               name="role"
//               value={customer.role}
//               onChange={handleChange}
//             >
//               <option value="Customer">Customer</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>

//           <button className="btn btn-primary w-100" type="submit">
//             Register
//           </button>
//         </form>

//         <hr />

//         <div className="text-center mb-3">
//           <GoogleLogin
//             onSuccess={handleGoogleFetch}
//             onError={() => alert("Google Login Failed")}
//           />
//         </div>

//         <button
//           type="button"
//           className="btn btn-primary w-100"
//           onClick={handleLinkedInLogin}
//         >
//           Continue with LinkedIn
//         </button>

//         <p className="text-center mt-3">
//           Already have an account?{" "}
//           <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;