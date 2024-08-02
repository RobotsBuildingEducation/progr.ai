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
  Input,
} from "@chakra-ui/react";
import {
  convertMinutesToReadableFormat,
  formatIntervalText,
} from "../../../utility/settings";

const SelfPacedModal = ({ isOpen, onClose, interval, setInterval }) => {
  const [inputValue, setInputValue] = useState(interval);
  const { days, hours, minutes } = convertMinutesToReadableFormat(interval);

  const handleSliderChange = (val) => {
    setInterval(val);
    setInputValue(val);
  };

  const debounceTimeout = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      if (!isNaN(value) && value >= 10 && value <= 4320) {
        setInterval(parseInt(value, 10));
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Self-Paced Feature</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Set the interval for answering questions:</Text>
          <Slider
            aria-label="slider-ex-1"
            value={interval}
            min={10}
            max={4320}
            step={10}
            onChange={handleSliderChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt={2}>
            Interval: {formatIntervalText(days, hours, minutes)}
          </Text>
          <Input
            mt={4}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min={10}
            max={4320}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelfPacedModal;
