import React, { useState } from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import CollectionPreview from './CollectionPreview'; // Import CollectionPreview component

const CollectionsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pages = 3; // Assuming you have 3 pages of collections

  const nextCollection = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pages); // Loop back to the first page
  };

  return (
    <Box position="relative" w="full" overflow="hidden">
      <Flex direction="row" w="full" overflowX="auto">
        {/* Render the CollectionPreviews off-screen to the right */}
        <Box transform={`translateX(-${currentIndex * 100}%)`} transition="transform 0.3s ease-in-out">
          <CollectionPreview /> {/* Render the first page of collections */}
          <CollectionPreview /> {/* Render the second page of collections */}
          <CollectionPreview /> {/* Render the third page of collections */}
          {/* Add more <CollectionPreview /> as needed */}
        </Box>
      </Flex>
      <IconButton
        aria-label="Next Collections"
        icon={<ChevronRightIcon />}
        onClick={nextCollection}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
      />
    </Box>
  );
};

export default CollectionsCarousel;
