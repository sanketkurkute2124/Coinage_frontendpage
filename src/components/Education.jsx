import { useState, useEffect, useRef } from "react";
import { addEducation } from "../services/educationService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Education() {
  const API_URL = "https://localhost:7116/api/Education";

  const navigate = useNavigate();

  const [educationList, setEducationList] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const fileInputRef = useRef(null);

  const [education, setEducation] = useState({
    qualification: "",
    collegeName: "",
    university: "",
    passingYear: "",
    percentage: "",
  });



  // Used for Update
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadEducationData();
  }, []);

  const handleChange = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

   //session data  local storage clear
   window.addEventListener("beforeunload", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    localStorage.removeItem("customerName");
    localStorage.removeItem("role");
   });


  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("CustomerId", localStorage.getItem("customerId"));
      formData.append("Qualification", education.qualification);
      formData.append("CollegeName", education.collegeName);
      formData.append("University", education.university);
      formData.append("PassingYear", education.passingYear);
      formData.append("Percentage", education.percentage);

      if (certificate) {
        formData.append("Certificate", certificate);
      }

      const response = await addEducation(formData);

      alert(response.message || "Education Added Successfully");

      clearForm();

      await loadEducationData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (item) => {
    setEditId(item.educationId)
    setEducation({
      qualification: item.qualification,
      collegeName: item.college,
      university: item.university,
      passingYear: item.passingYear,
      percentage: item.percentage,
    });

    setCertificate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("Qualification", education.qualification);
      formData.append("CollegeName", education.collegeName);
      formData.append("University", education.university);
      formData.append("PassingYear", education.passingYear);
      formData.append("Percentage", education.percentage);

      if (certificate) {
        formData.append("Certificate", certificate);
      }

      await axios.put(
        `${API_URL}/UpdateCustomerEducation/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Education Updated Successfully");
      clearForm();
      setEditId(null);
      await loadEducationData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (educationId) => {
    if (!window.confirm("Delete this education?")) return;

    try {
      const response = await axios.delete(
        `${API_URL}/DeleteEducation/${educationId}`
      );

      if (response.data.success) {
        // Remove the deleted row immediately
        setEducationList((prev) =>
          prev.filter((item) => item.educationId !== educationId)
        );

        alert("Deleted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const clearForm = () => {
    setEducation({
      qualification: "",
      collegeName: "",
      university: "",
      passingYear: "",
      percentage: "",
    });

    setCertificate(null);

    setEditId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="container mt-4">

        <h2 className="mb-4">
          {editId ? "Update Education" : "Add Education"}
        </h2>

        <form
          onSubmit={editId ? handleUpdate : handleSubmit}
          className="border p-4 rounded shadow"
        >

          <div className="form-group">
            <label className="form-label">Qualification</label>
            <input
              type="text"
              className="form-control"
              name="qualification"
              value={education.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">College Name</label>
            <input
              type="text"
              className="form-control"
              name="collegeName"
              value={education.collegeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">University</label>
            <input
              type="text"
              className="form-control"
              name="university"
              value={education.university}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passingYear"
              value={education.passingYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Percentage</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="percentage"
              value={education.percentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Certificate</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              ref={fileInputRef}

            />
          </div>

          <button
            type="submit"
            className={`btn ${editId ? "btn-warning" : "btn-success"
              } me-2`}
          >
            {editId ? "Update" : "Save"}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </form>

        <div className="mt-5">

          <h3>Education Details</h3>

          <table className="table table-bordered table-striped mt-3">

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
                <th>Certificate</th>
                <th>Operation</th>
              </tr>
            </thead>

            <tbody>

              {educationList.length > 0 ? (

                educationList.map((item) => (

                  <tr key={item.educationId}>

                    <td>{item.customerId}</td>

                    <td>
                      {item.firstName} {item.lastName}
                    </td>

                    <td>{item.email}</td>

                    <td>{item.qualification}</td>

                    <td>{item.university}</td>

                    <td>{item.college}</td>

                    <td>{item.passingYear}</td>

                    <td>{item.percentage}%</td>

                    <td>
                      {item.certificate ? (
                        <a
                          href={`https://localhost:7116/Certificates/${item.certificate}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Certificate
                        </a>
                      ) : (
                        "No Certificate"
                      )}
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(item.educationId)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="10" className="text-center">
                    No Records Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Education;