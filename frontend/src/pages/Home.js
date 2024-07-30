import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import React from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

const Profiles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.name) {
      setUserName(userInfo.name);
    } else if (location.state && location.state.name) {
      setUserName(location.state.name);
    }
  }, [location.state]);

  const goToProfessionalPage = () => {
    navigate("/professional");
  };
  const goToPersonal = () => {
    navigate("/personal");
  };

  return (
    <div className="mainBody">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 homeBodyLeft">
            <Box>
              <Text fontWeight="semibold" fontSize={"4xl"} fontFamily="cursive">
                Hello {userName},
              </Text>
              <Text
                fontWeight="bold"
                fontSize={"6xl"}
                bgGradient={"linear(to-r ,cyan.400, blue.500,purple.600)"}
                bgClip="text"
                fontFamily="Arial, Helvetica, sans-serif;"
              >
                If you respect time, time will respect you
              </Text>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="20px"
                fontWeight="extrabold"
                fontFamily="Lucida Handwriting"
              >
                Set your goals and chase it
              </Text>
            </Box>
          </div>
          <div className="col-md-5 homeBodyRight">
            <div className="homeCardImage1" style={{ marginBottom: 20 }}>
              <div className="homeCardText" onClick={goToProfessionalPage}>
                <h1>Professional</h1>
                <h3 style={{ fontWeight: 300 }}>Work Space</h3>
              </div>
            </div>
            <div className="homeCardImage">
              <div className="border-home">
                <div className="homeCardText " onClick={goToPersonal}>
                  <h1>Private</h1>
                  <h3 style={{ fontWeight: 300 }}>Work Space</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
