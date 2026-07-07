import { useState } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", customer);

    try {
      const response = await register(customer);
      console.log(response.data);
      alert("Registration Successful");
    } catch (error) {
      console.error(error.response?.data || error);
      alert(
        JSON.stringify(error.response?.data?.errors || error.response?.data)
      );
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={customer.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={customer.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={customer.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dateOfBirth"
          value={customer.dateOfBirth}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={customer.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={customer.role}
          onChange={handleChange}
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;