import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
  Text,
  Box,
  Stack,
  Card,
  Button,
  CardFooter,
  CardBody,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaLinkedin,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";
import { useColorMode } from "@chakra-ui/color-mode";
import "bootstrap/dist/css/bootstrap.min.css";

const Profiles = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
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
      <VStack p={5}>
        <Flex w="100%" alignItems="center">
          <Image src="/logo1.png" alt="logo" height={10} />
          <Heading
            ml="1"
            fontWeight="semibold"
            color="cyan.400"
            size="md"
            fontFamily="Georgia"
            className="homeHeading1"
            pt="4px"
          >
            PRODUCTIVITY
          </Heading>
          <Spacer />
          <IconButton icon={<FaGithub />} ml={2} isRound="true" />
          <IconButton icon={<FaLinkedin />} ml={2} isRound="true" />
          <IconButton
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound="true"
            ml="8"
            onClick={toggleColorMode}
          />
        </Flex>
      </VStack>
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
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              minH="200px" // Set minimum card height
              margin={5}
            >
              <Image
                className="rightImg"
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://img.freepik.com/free-photo/brunette-businesswoman-posing_23-2148142728.jpg?size=626&ext=jpg&ga=GA1.1.366805866.1719309107&semt=ais_user"
                alt="Caffe Latte"
              />
              <Stack flex="1" justifyContent="space-between">
                <CardBody p={2}>
                  <Heading size="md">The perfect latte</Heading>
                  <Text py="1">
                    Caffè latte is a coffee beverage of Italian origin made with
                    espresso and steamed milk.
                  </Text>
                </CardBody>
                <CardFooter p={2}>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={goToProfessionalPage}
                  >
                    Buy Latte
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <div class="homeCardImage">
              <div class="homeCardText" onClick={goToPersonal}>
                <h1>Private</h1>
                <h3 style={{ fontWeight: 300 }}>Work Space</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
