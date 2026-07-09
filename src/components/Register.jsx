// import { useState } from "react";
// import { register } from "../services/authService";
// import { Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

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

//   const handleChange = (e) => {
//     setCustomer((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Sending Data:", customer);

//     try {
//       const response = await register(customer);
//       console.log(response.data);
//       alert("Registration Successful");
//     } catch (error) {
//       console.error(error.response?.data || error);
//       alert(
//         JSON.stringify(error.response?.data?.errors || error.response?.data)
//       );
//     }
//   };
//    // Google Login
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const res = await axios.post(
//          "https://localhost:7116/api/Google/signin",
//         //  "http://localhost:5173/api/Google/signin",
//         {
//           idToken: credentialResponse.credential,
//         }
//       ); 
//       // localStorage.setItem("token", res.data.token);
//       // console.log("Google Login Response:", res.data);
//       // localStorage.setItem("customerId", res.data.customerId);
//       // localStorage.setItem("customerName", res.data.firstName);
//       // localStorage.setItem("role", res.data.role);

//       alert("Google Login Successful");

//       navigate("/education");
//     } catch (err) {
//       console.log(err);
//       alert("Google Login Failed");
//     }
//   };


//   return (
//     <>
//     <div className="container">
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={customer.firstName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={customer.lastName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={customer.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={customer.phoneNumber}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={customer.dateOfBirth}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={customer.password}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="role"
//           value={customer.role}
//           onChange={handleChange}
//         >
//           <option value="Customer">Customer</option>
//           <option value="Admin">Admin</option>
//         </select>

//         <button type="submit">Register</button>
//       </form>
//      <div>
//          <GoogleLogin
//         onSuccess={handleGoogleSuccess}
//         onError={() => {
//           alert("Google Login Failed");
//         }}
//       />
//       </div>
//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//     </>
//   );
// }

// export default Register;





import { useState } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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

      console.log("Google Response:", res.data);

      setCustomer({
        firstName: res.data.givenName || res.data.name || "",
        lastName: "",
        email: res.data.email || "",
        phoneNumber: "",
        dateOfBirth: "",
        password: "",
        role: "Customer",
      });

      setPicture(res.data.picture || "");

      alert("Google details loaded successfully");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Google Login Failed");
    }
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

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;