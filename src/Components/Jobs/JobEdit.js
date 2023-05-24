import React, { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;
export default function JobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    job_title: "",
    company: "",
    email: "",
    location: "",
    posted_date: new Date().toLocaleDateString(),
    job_type: "",
    description: "",
    native_language: "",
    is_favorite: false,
    requirements: "",
    salary: "",
  });
  //* Languages
  const [select, setSelect] = useState("");
  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Chinese", label: "Chinese" },
    { value: "Bengali", label: "Bengali" },
    { value: "Hindi", label: "Hindi" },
    { value: "Korean", label: "Korean" },
    { value: "Arabic", label: "Arabic" },
    { value: "Japanese", label: "Japanese" },
    { value: "Creole", label: "Creole" },
    { value: "Filipino", label: "Filipino" },
    { value: "Urdu", label: "Urdu" },
  ];

  const jobType = [
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    // { value: "Contract", label: "Contract" },
    // { value: "Freelance", label: "Freelance" }
  ];
  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setSelect(selected);
    setEdit({ ...edit, native_language: selected });
  };
  const handleTypeChange = (e) => {
    const selected = e.target.value;
    setSelect(selected);
    setEdit({ ...edit, job_type: selected });
  };

  //* Update Job
  const updateJob = (updatedJob) => {
    axios
      .put(`${API}/jobs/${id}`, updatedJob)
      .then(
        (response) => {
          navigate(`/jobs/${id}`);
        },
        (error) => console.log(error)
      )
      .catch((err) => console.catch(err));
  };
  // Text  Change
  const handleTextChange = (e) => {
    setEdit({ ...edit, [e.target.id]: e.target.value });
  };
  // check change
  const handleCheckChange = () => {
    setEdit({ ...edit, is_favorite: !edit.is_favorite });
  };
  useEffect(() => {
    axios.get(`${API}/jobs/${id}`).then(
      (response) => setEdit(response.data),
      (error) => navigate(`/error`)
    );
  }, [id, navigate]);
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(edit);
  };

  return (
    <div className="jobForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_title">Job Title:</label>
        <input
          type="text"
          id="job_title"
          value={edit.job_title}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={edit.company}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={edit.email}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={edit.location}
          onChange={handleTextChange}
          required
        />

        <label>Job Type: </label>
        <select
          id={edit.job_type}
          value={edit.job_type}
          onChange={handleTypeChange}
          required
        >
          <option value="">Select a language</option>
          {jobType.map((job_type) => (
            <option value={job_type.value} key={job_type.value}>
              {job_type.label}
            </option>
          ))}
        </select>
        <label htmlFor="description">Description:</label>
        <textarea
          style={{ resize: "none" }}
          id="description"
          value={edit.description}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          type="checkbox"
          id="is_favorite"
          checked={edit.is_favorite}
          // value={edit.is_favorite}
          onChange={handleCheckChange}
          required
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={edit.salary}
          onChange={handleTextChange}
          required
        />

        <label>Languages: </label>
        <select
          id={edit.native_language}
          value={edit.native_language}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select a language</option>
          {languages.map((language) => (
            <option value={language.value} key={language.value}>
              {language.label}
            </option>
          ))}
        </select>

        <button onClick={() => navigate(`/jobs/${id}`)}>Back</button>
        <button onClick={handleSubmit} type="submit">
          Done
        </button>
      </form>
    </div>
  );
}
