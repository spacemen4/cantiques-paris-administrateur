import React, { useState } from 'react';
import { Box, Flex, IconButton, Badge, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const data = [
  { category: 'DESIGN · VINTAGE', description: 'Design et vintage · Sans prix de réserve', count: 2819 },
  { category: 'INTÉRIEURS • DESIGN', description: 'Collection Intérieurs classiques exclusifs', count: 552 },
  { category: 'INTÉRIEURS • DESIGN', description: 'Collection Intérieurs contemporains exclusifs', count: 392 },
  { category: 'INTÉRIEURS · ANTIQUITÉS', description: 'Intérieurs classiques · Sans prix de réserve', count: 4676 },
  { category: 'INTÉRIEURS • DESIGN • ART', description: 'Collection Salle à manger traditionnelle', count: 484 },
  { category: 'INTÉRIEURS • DESIGN • ART', description: 'Collection Chambre de rêve', count: 285 },
  { category: 'INTÉRIEURS • DESIGN • ART', description: 'Collection Salon contemporain', count: 335 }
];

const carouselColors = ['#E2E8F0', '#CBD5E0', '#A0AEC0', '#718096', '#4A5568', '#2D3748', '#1A202C'];

const Carousel = () => {
  const [offset, setOffset] = useState(0);

  const originalHeight = 300;
  const originalWidth = Math.round(originalHeight * 1.618);
  const reductionFactor = 0.90;
  const boxHeight = Math.round(originalHeight * reductionFactor);
  const boxWidth = Math.round(originalWidth * reductionFactor);
  const boxMarginX = 16;
  const totalBoxWidth = boxWidth + 2 * boxMarginX;

  const handlePrev = () => {
    setOffset((currentOffset) => Math.min(currentOffset + totalBoxWidth, 0));
  };

  const handleNext = () => {
    setOffset((currentOffset) => Math.max(currentOffset - totalBoxWidth, -(totalBoxWidth * (data.length - 1))));
  };

  return (
    <Flex direction="column" align="center" justify="center" w="full" overflow="hidden" position="relative">
      <Flex w="full" justify="space-between" px="4" mb="2">
        {data.map((item, index) => (
          <Text key={index} fontWeight="bold" color="gray.700">
            {item.category.toUpperCase()}
          </Text>
        ))}
      </Flex>
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
          {data.map((item, index) => (
            <Box key={index} w={`${boxWidth}px`} h={`${boxHeight}px`} bg={carouselColors[index % carouselColors.length]} mx="2" p="4" position="relative">
              <Badge
                variant="solid"
                colorScheme="teal"
                position="absolute"
                top="0"
                right="0"
                mt="2"
                mr="2"
              >
                +{item.count}
              </Badge>
              <Box position="absolute" bottom="4" left="4" color="white" fontWeight="bold" fontSize="lg">
                {item.description}
              </Box>
            </Box>
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
      <Flex w="full" justify="space-between" px="4" mt="2">
        {data.map((item, index) => (
          <Text key={index} fontWeight="bold" color="gray.700">
            DÉCOUVREZ LES {item.count} OBJETS
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default Carousel;
