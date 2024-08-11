import React from "react";
import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
  Image,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosAlarm } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  const handleReminderClick = () => {
    navigate("/notification");
  };

  return (
    <VStack p={5} w="100%">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Image src="/logo1.png" alt="logo" height={10} />
          <Heading
            ml="1"
            fontWeight="semibold"
            color="cyan.400"
            size={{ base: "sm", md: "md" }}
            fontFamily="Georgia"
            className="homeHeading1"
            pt="4px"
          >
            PRODUCTIVITY
          </Heading>
        </Flex>
        <Flex>
          <IconButton
            icon={<FaGithub />}
            ml={2}
            isRound={true}
            aria-label="GitHub"
          />
          <IconButton
            icon={<FaLinkedin />}
            ml={2}
            isRound={true}
            aria-label="LinkedIn"
          />
          <IconButton
            icon={<IoIosAlarm />}
            ml={2}
            isRound={true}
            aria-label="Alarm"
            onClick={handleReminderClick}
          />
        </Flex>
      </Flex>
    </VStack>
  );
};

export default Navbar;
