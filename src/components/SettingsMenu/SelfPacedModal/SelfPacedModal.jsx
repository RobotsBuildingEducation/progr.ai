import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import {
  convertMinutesToReadableFormat,
  formatIntervalText,
} from "../../../utility/settings";
import { getUserData, updateUserData } from "../../../utility/nosql";

const SelfPacedModal = ({ isOpen, onClose, interval, setInterval, userId }) => {
  const [inputValue, setInputValue] = useState(interval);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { days, hours, minutes } = convertMinutesToReadableFormat(interval);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(userId);
      setStreak(userData.streak || 0);
      setStartTime(new Date(userData.startTime));
      setEndTime(new Date(userData.endTime));
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSliderChange = (val) => {
    setInterval(val);
    setInputValue(val);
  };

  const debounceTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleSave = async () => {
    const currentTime = new Date();
    const newEndTime = new Date(currentTime.getTime() + interval * 60000);
    setStartTime(currentTime);
    setEndTime(newEndTime);

    await updateUserData(userId, interval, streak, currentTime, newEndTime);
  };

  const getMarkLabel = (interval) => {
    if (interval <= 1440) {
      return "Grind";
    } else if (interval <= 2880) {
      return "Motivated";
    } else if (interval <= 4320) {
      return "Casual";
    } else {
      return "";
    }
  };

  const getMarkColor = (interval) => {
    if (interval <= 1440) {
      return "orange.500";
    } else if (interval <= 2880) {
      return "green.500";
    } else if (interval <= 4320) {
      return "blue.500";
    } else {
      return "gray.500";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Self-pace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize="xs">
            Choose how much time can elapse to grow your streak.
          </Text>
          <Slider
            aria-label="slider-ex-1"
            value={interval}
            min={30}
            max={4320}
            step={30}
            onChange={handleSliderChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt={2}>{formatIntervalText(days, hours, minutes)}</Text>
          <Text mt={2} color={getMarkColor(interval)}>
            <b>Mode: {getMarkLabel(interval)}</b>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelfPacedModal;
