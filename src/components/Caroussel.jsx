import React, { useState } from 'react';
import { Box, Flex, IconButton, Image, Badge, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const imageData = [
  '/images/collections/collection1.jpg',
  '/images/collections/collection2.jpg',
  '/images/collections/collection3.jpg',
  'public/images/collections/collection4.jpg',
  'public/images/collections/collection5.jpg',
  'public/images/collections/collection6.jpg',
  'public/images/collections/collection7.jpg',
];


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
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="full"
      bg="white" // Set the background to white
      overflow="hidden"
      position="relative"
      p={4} // Add some padding around the carousel
    >
      <Flex align="center" justify="center" w="full" overflow="hidden" position="relative">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
          position="absolute"
          left={0}
          zIndex={2}
          backgroundColor="transparent" // Ensure the button has a transparent background
        />
        <Flex transform={`translateX(${offset}px)`} transition="transform 0.2s ease-in-out">
          {data.map((item, index) => (
            <Box
              key={index}
              w={`${boxWidth}px`}
              h={`${boxHeight}px`}
              mx={2}
              p={4}
              position="relative"
              overflow="hidden"
              bg="white" // Set each box background to white
              boxShadow="md" // Optional: add a shadow for better visibility
            >
              <Image src={imageData[index]} alt={item.description} boxSize="100%" objectFit="cover" />
              <Badge
                variant="solid"
                colorScheme="teal"
                position="absolute"
                bottom="4"
                right="4"
                borderRadius="full" // Makes the badge circular or rounded
              >
                {new Date().toLocaleDateString('fr-FR')} // This will display the date in a French format
              </Badge>
              <Text position="absolute" bottom="4" left="4" color="white" fontWeight="bold" fontSize="lg">
                {item.description}
              </Text>
              <Badge
                variant="subtle"
                colorScheme="gray"
                position="absolute"
                top="0"
                left="0"
                mt="2"
                ml="2"
                borderRadius="full"
              >
                Découvrez les {item.count} objets
              </Badge>
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
          backgroundColor="transparent"
        />
      </Flex>
    </Flex>
  );
};

export default Carousel;
