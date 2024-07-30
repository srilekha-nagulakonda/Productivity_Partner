import React from "react";
import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
  Image,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaLinkedin, FaGithub } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <div>
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
      ;
    </div>
  );
};

export default Navbar;
