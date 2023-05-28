import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./jobDetails.css";
import Contact from "../../Features/Contact";
import Recommended from "./Recommended";
//* --------Map---------------
// import { addressConverter } from "../../Features/helper";
import MapContainer from "../../Features/MapContainer";
//* -------------------------------------------
const API = process.env.REACT_APP_API_URL;

export default function JobDetails({ handleAddressSubmit }) {
  const [jobs, setJobs] = useState([]);
  // Recommended Jobs
  const [recommended, setRecommended] = useState([]);
  // const [filteredJobs, setFilteredJobs]= useState([]);
  const [jobSkills, setJobSkills] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/jobs/${id}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);
  //* Fetching for jobs that have things in common -------
  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        setRecommended(res.data);
      })
      .catch((error) => console.warn(error));
  }, []);

  //* filter Recommended Jobs
  const filtered = recommended.filter((rec) => {
    return rec.skills === jobs.skills && rec.id !== jobs.id;
  });
  // setRecommended(filtered);

  // //* ----------------
  // Delete
  const deleteJob = () => {
    axios
      .delete(`${API}/jobs/${id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(
        () => {
          navigate(`/jobs`);
        },
        (error) => console.log(error)
      )
      .catch((error) => console.warn(error));
  };
  // Date format
  let dateMade = new Date(jobs.posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  return (
    <>
      <div className="page-container">
        {/*  */}
        {/* //!LEFT ----- */}
        <div className="top job-details-body">
          <p className="date">
            <em>Posted Date:</em> {middle}, {year}
          </p>
          <h2 className="job-title">{jobs.job_title}</h2>

          <p className="company">
            <strong>Company:</strong> {jobs.company}
          </p>
          <p className="email">
            <strong>Email:</strong> {jobs.email}
          </p>
          <p className="location">
            <strong>Location:</strong> {jobs.location}
          </p>
          <p className="job-type">
            <strong>Job Type:</strong> {jobs.job_type}
          </p>
          <p className="salary">
            <strong>Salary:</strong> $ {jobs.salary}/hr
          </p>
          <p className="description">
            <strong>Description</strong>
          </p>
          <p className="description">{jobs.description}</p>
          <p className="native-language">
            <strong>Native Language:</strong> {jobs.native_language}
          </p>
          <p className="skills">
            <strong>Skills:</strong> {jobs.skills}
          </p>
          <p className="requirements">
            <strong>Requirements:</strong> {jobs.requirements}
          </p>
          {/* //!BUTTONS -----  */}
          {localStorage.getItem("user_id") === String(jobs.user_id) ? (
            <div className="buttons-container">
              <button className="button" type="submit" onClick={deleteJob}>
                Delete
              </button>
              <button
                className="button"
                onClick={() => navigate(`/jobs/${id}/edit`)}
                type="submit"
              >
                Edit
              </button>
              <button
                className="button"
                onClick={() => navigate(`/jobs`)}
                type="submit"
              >
                Back
              </button>
            </div>
          ) : null}
        </div>
        {/* //!MIDDLE ----- */}
        <div className="middle map-container">
          <MapContainer
            handleAddressSubmit={handleAddressSubmit}
            location={jobs.location}
          />
        </div>
      </div>
      {/* //! BOTTOM ---Contact / Recs*/}
      <div className="bottom ">
        <Contact />
        {filtered.map((rec) => {
          return <Recommended key={rec.id} rec={rec} />;
        })}
      </div>
    </>
  );
}
