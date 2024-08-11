import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNotification } from "../components/NotificationContext";

const NotificationComponent = () => {
  const {
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    startNotifications,
    stopNotifications,
  } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    stopNotifications(); // Clear existing notifications
    startNotifications(); // Start new notifications
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={5}>
      <Box
        p={5}
        bg="white"
        borderRadius="md"
        boxShadow="md"
        w="100%"
        maxW="500px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="interval" isRequired>
              <FormLabel>Set notification interval (HH:MM:SS)</FormLabel>
              <Flex>
                <Input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min="0"
                  placeholder="Hours"
                  mr={2}
                />
                :
                <Input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  min="0"
                  max="59"
                  placeholder="Minutes"
                  mx={2}
                />
                :
                <Input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  min="0"
                  max="59"
                  placeholder="Seconds"
                  ml={2}
                />
              </Flex>
            </FormControl>
            <Flex justifyContent="space-between" w="100%">
              <Button
                type="submit"
                colorScheme="teal"
                flex="1"
                mr={2}
                _hover={{ bg: "teal.600" }}
              >
                Set Interval
              </Button>
              <Button
                onClick={stopNotifications}
                colorScheme="red"
                flex="1"
                ml={2}
                _hover={{ bg: "red.600" }}
              >
                Stop Notifications
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default NotificationComponent;
