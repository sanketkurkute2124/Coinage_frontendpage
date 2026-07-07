import { useState,useEffect } from "react";
import { addEducation } from "../services/educationService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Education() {

  //for the education details
  const API_URL = "https://localhost:7116/api/Education";
  const navigate = useNavigate();

  //for showing education details
  const [educationList, setEducationList] = useState([]);

  const [education, setEducation] = useState({
    qualification: "",
    collegeName: "",
    university: "",
    passingYear: "",
    percentage: "",
  });

  const [certificate, setCertificate] = useState(null);


  const handleChange = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  useEffect(() => {
    loadEducationData();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();

  //     formData.append(
  //       "CustomerId",
  //       localStorage.getItem("customerId")
  //     );

  //     formData.append(
  //       "Qualification",
  //       education.qualification
  //     );

  //     formData.append(
  //       "CollegeName",
  //       education.collegeName
  //     );

  //     formData.append(
  //       "University",
  //       education.university
  //     );

  //     formData.append(
  //       "PassingYear",
  //       education.passingYear
  //     );

  //     formData.append(
  //       "Percentage",
  //       education.percentage
  //     );

  //     if (certificate) {
  //       formData.append("Certificate", certificate);
  //     }

  //     const response = await addEducation(formData);

  //     alert(response.message || "Education saved successfully.");

  //     navigate("/"); // Change this route if needed

  //   } catch (err) {
  //     console.log(err.response?.data);
  //     console.log(err.response?.status);
  //     console.log(education);
  //   }
  // };

  //modified on <button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "CustomerId",
        localStorage.getItem("customerId")
      );

      formData.append("Qualification", education.qualification);
      formData.append("CollegeName", education.collegeName);
      formData.append("University", education.university);
      formData.append("PassingYear", education.passingYear);
      formData.append("Percentage", education.percentage);

      if (certificate) {
        formData.append("Certificate", certificate);
      }

      const response = await addEducation(formData);

      alert(response.message || "Education saved successfully.");

      // Clear form
      setEducation({
        qualification: "",
        collegeName: "",
        university: "",
        passingYear: "",
        percentage: "",
      });

      setCertificate(null);

      // Refresh table
      await loadEducationData();

      // Remove this if you want to stay on the page
      // navigate("/");

    } catch (err) {
      console.log(err.response?.data);
      console.log(err.response?.status);
      console.log(err);
    }
  };


  //Education details
  const loadEducationData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/GetAllCustomerEducationByCustomerId/${localStorage.getItem("customerId")}`
      );

      if (response.data.success) {
        setEducationList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">

        <h2>Education Details</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={education.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              required
            />
          </div>

          <div>
            <label>College Name</label>
            <input
              type="text"
              name="collegeName"
              value={education.collegeName}
              onChange={handleChange}
              placeholder="College Name"
              required
            />
          </div>

          <div>
            <label>University</label>
            <input
              type="text"
              name="university"
              value={education.university}
              onChange={handleChange}
              placeholder="University"
              required
            />
          </div>

          <div>
            <label>Passing Year</label>
            <input
              type="number"
              name="passingYear"
              value={education.passingYear}
              onChange={handleChange}
              placeholder="Passing Year"
              required
            />
          </div>

          <div>
            <label>Percentage</label>
            <input
              type="number"
              step="0.01"
              name="percentage"
              value={education.percentage}
              onChange={handleChange}
              placeholder="Percentage"
              required
            />
          </div>

          <div>
            <label>Certificate</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit">
            Save
          </button>

        </form>

      </div>
      <div className="mt-5">
        <h3>Customer Education Details</h3>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Customer Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>University</th>
              <th>College</th>
              <th>Passing Year</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>
            {educationList.length > 0 ? (
              educationList.map((item) => (
                <tr key={item.educationId}>
                  <td>{item.customerId}</td>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.qualification}</td>
                  <td>{item.university}</td>
                  <td>{item.college}</td>
                  <td>{item.passingYear}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Education;