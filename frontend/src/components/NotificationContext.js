// NotificationContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const toast = useToast();
  const [hours, setHours] = useState(() => {
    const savedHours = localStorage.getItem("notificationHours");
    return savedHours ? parseInt(savedHours, 10) : 0;
  });
  const [minutes, setMinutes] = useState(() => {
    const savedMinutes = localStorage.getItem("notificationMinutes");
    return savedMinutes ? parseInt(savedMinutes, 10) : 0;
  });
  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem("notificationSeconds");
    return savedSeconds ? parseInt(savedSeconds, 10) : 0;
  });
  const [timerId, setTimerId] = useState(null);

  const quotes = [
    "Believe in yourself and all that you are.",
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
  ];

  const calculateInterval = () => {
    return (
      (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) *
      1000
    ); // Convert to milliseconds
  };

  const startNotifications = () => {
    const intervalTime = calculateInterval();

    if (timerId || intervalTime === 0) return; // Prevent multiple timers or zero interval

    const id = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      toast({
        title: randomQuote,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }, intervalTime);

    setTimerId(id);
  };

  const stopNotifications = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value.toString());
  };

  useEffect(() => {
    saveToLocalStorage("notificationHours", hours);
  }, [hours]);

  useEffect(() => {
    saveToLocalStorage("notificationMinutes", minutes);
  }, [minutes]);

  useEffect(() => {
    saveToLocalStorage("notificationSeconds", seconds);
  }, [seconds]);

  useEffect(() => {
    if (calculateInterval() > 0) {
      startNotifications();
    }
    return () => stopNotifications(); // Cleanup on component unmount
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        startNotifications,
        stopNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
