import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'cyan', 'pink', 'teal', 'gray'];

const Carousel = () => {
  const [offset, setOffset] = useState(0);

  const boxWidth = 600; // The width of each box
  const boxMarginX = 16; // Assuming a margin of 2rem (16px per rem) on each side for simplicity
  const totalBoxWidth = boxWidth + 2 * boxMarginX; // Total space occupied by each box including margin

  const handlePrev = () => {
    setOffset((currentOffset) => Math.min(currentOffset + totalBoxWidth, 0));
  };

  const handleNext = () => {
    // Ensure we move the carousel by the total width of each box, including margins
    setOffset((currentOffset) => Math.max(currentOffset - totalBoxWidth, -(totalBoxWidth * (colors.length - 1))));
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
      <Flex transform={`translateX(${offset}px)`} transition="transform 0.2s ease-in-out">
        {colors.map((color, index) => (
          <Box key={index} w="600px" h="300px" bg={color} mx="2" />
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
