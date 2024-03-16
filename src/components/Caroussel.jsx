import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'cyan', 'pink', 'teal', 'gray']; // Array of colors for the boxes

const Carousel = () => {
  const [offset, setOffset] = useState(0);

  const handlePrev = () => {
    setOffset((currentOffset) => Math.min(currentOffset + 1, 0));
  };

  const handleNext = () => {
    setOffset((currentOffset) => Math.max(currentOffset - 1, -(colors.length - 1)));
  };

  return (
    <Flex align="center" justify="center" w="full" overflow="hidden" position="relative">
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
        onClick={handlePrev}
        position="absolute"
        left={0}
        zIndex={2}
      />
      <Flex transform={`translateX(${offset * 100}%)`} transition="transform 0.2s ease-in-out">
        {colors.map((color, index) => (
          <Box key={index} w="100px" h="100px" bg={color} mx="2" />
        ))}
      </Flex>
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        onClick={handleNext}
        position="absolute"
        right={0}
        zIndex={2}
      />
    </Flex>
  );
};

export default Carousel;
