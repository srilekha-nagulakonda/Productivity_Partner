import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";

const HomePage = ({ token }) => {
  const toast = useToast();
  const [priority, setPriority] = useState("medium");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add a task.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/postTask",
        {
          name,
          description,
          priority,
          dueDate,
          userNumber: userInfo.userNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setName("");
        setDescription("");
        setPriority("medium");
        setDueDate("");
        toast({
          title: "Assignment Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("Failed to add task:", response.data);
        toast({
          title: "Failed to add task",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Failed to add task",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

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
