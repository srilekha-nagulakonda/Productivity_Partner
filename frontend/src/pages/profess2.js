// src/pages/HomePage.js
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const toast = useToast();
  const [priority, setPriority] = useState("medium");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/tasks", {
        name,
        description,
        priority,
        dueDate,
      });

      if (response.status === 201) {
        setName("");
        setDescription("");
        setPriority("medium");
        setDueDate("");
        // alert("Task added successfully");
        toast({
          title: "Assignment Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("Failed to add task:", response.data);
        alert("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };
  const navigate = useNavigate();
  const goToHighProfePage = () => {
    navigate("/highPriority");
  };
  const goToMediumProfePage = () => {
    navigate("/mediumPriority");
  };

  return (
    <div className="ProfesBody">
      <Navbar />
      <div className="quote">Space your appointments wisely</div>
      <div className="containerProfessional">
        <h1 className="Professionalh1">Add Task</h1>
        <form className="Professionalform" onSubmit={handleSubmit}>
          <div className="columnContainer">
            <div className="leftColumn">
              <input
                type="text"
                className="inputProfessional"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
              <textarea
                className="inputProfessional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="rightColumn">
              <input
                type="date"
                className="inputProfessional"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <select
                value={priority}
                className="selectProfessional"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>
          </div>
          <button className="professionalbtn" type="submit">
            Add Task
          </button>
        </form>
      </div>
      <div className="quote secondquote">Invest your time, Don't spend it</div>
      <div className="viewHeading">Examine The Assignments</div>
      <div className="viewTasks">
        <div className="blog" onClick={goToHighProfePage}>
          Top Priority Assignments
        </div>
        <div className="blog" onClick={goToMediumProfePage}>
          Medium Priority Assignments
        </div>
      </div>
    </div>
  );
};

export default HomePage;
