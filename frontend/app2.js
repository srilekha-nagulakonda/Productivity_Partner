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

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/highPriority" element={<High />} />
          <Route path="/mediumPriority" element={<Medium />} />
          <Route path="/notification" element={<Reminder />} />
        </Routes>
      </NotificationProvider>
    </div>
  );
}

export default App;
