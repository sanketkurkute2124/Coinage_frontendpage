import { useState } from "react";
import { addEducation } from "../services/educationService";
import { useNavigate } from "react-router-dom";

function Education() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "CustomerId",
        localStorage.getItem("customerId")
      );

      formData.append(
        "Qualification",
        education.qualification
      );

      formData.append(
        "CollegeName",
        education.collegeName
      );

      formData.append(
        "University",
        education.university
      );

      formData.append(
        "PassingYear",
        education.passingYear
      );

      formData.append(
        "Percentage",
        education.percentage
      );

      if (certificate) {
        formData.append("Certificate", certificate);
      }

      const response = await addEducation(formData);

      alert(response.message || "Education saved successfully.");

      navigate("/"); // Change this route if needed

    } catch (err) {
    console.log(err.response?.data);
    console.log(err.response?.status);
    console.log(education);
}
  };

  return (
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
  );
}

export default Education;