import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Dashboard.css";
import Header from "./Header";

const Dashboard = () => {
  const [pastes, setPastes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  //   console.log(token);

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    const fetchPastes = async () => {
      // Fetch pastes by user ID
      try {
        const res = await axios.get(`/api/paste/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        setPastes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPastes();
  }, [token]);

  const handleToggleContent = (id) => {
    setPastes((prevPastes) => {
      return prevPastes.map((paste) => {
        if (paste._id === id) {
          return { ...paste, showContent: !paste.showContent };
        }
        return paste;
      });
    });
  };

  const handleOpenInNewTab = (id) => {
    window.open(`/${id}`, "_blank");
  };

  return (
    <div className="dashboard-container">
      <Header canSave={false} />
      <h2 className="dashboard-title">Dashboard</h2>
      {/* Render each paste */}
      {pastes.map((paste) => (
        <div
          key={paste._id}
          className="paste-container"
        >
          <div className="paste-header">
            <h3 className="paste-title">
              {paste.title ? paste.title : paste._id}
            </h3>
            <button
              className="paste-button"
              onClick={() =>
                handleOpenInNewTab(paste.title ? paste.title : paste._id)
              }
            >
              Open in new tab
            </button>
          </div>
          {/* Toggle content visibility with a dropdown */}
          <div className="paste-content">
            <button
              className="paste-button"
              onClick={() => handleToggleContent(paste._id)}
            >
              {paste.showContent ? "Hide Content" : "Show Content"}
            </button>
            {paste.showContent && <p>{paste.content}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
