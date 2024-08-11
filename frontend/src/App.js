import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/profiles";
import Home from "./pages/Home";
import Professional from "./pages/Professional";
import Personal from "./pages/Personal";
import High from "./pages/HighProf";
import Reminder from "./components/remainder";
import Medium from "./pages/MediumProfes";
import { NotificationProvider } from "./components/NotificationContext";
import React, { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <div className="App">
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Auth setToken={setToken} />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="/home" element={<Home token={token} />} />
          <Route
            path="/professional"
            element={<Professional token={token} />}
          />
          <Route path="/personal" element={<Personal token={token} />} />
          <Route path="/highPriority" element={<High token={token} />} />
          <Route path="/mediumPriority" element={<Medium token={token} />} />
          <Route path="/notification" element={<Reminder token={token} />} />
        </Routes>
      </NotificationProvider>
    </div>
  );
}

export default App;
