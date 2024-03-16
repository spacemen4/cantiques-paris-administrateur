import React, { useState } from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import CollectionCard from './CollectionCard'; // Assuming CollectionCard is in the same directory

const CollectionsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const collectionsPerPage = 10;
  const totalCollections = 30; // Replace with the actual number of collections you have

  const nextCollection = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + collectionsPerPage, totalCollections - collectionsPerPage));
  };

  return (
    <Box overflow="hidden">
      <Flex>
        {/* Render the collection previews */}
        <CollectionCard startIndex={currentIndex} />
        {/* ... add more CollectionCard components as needed */}
      </Flex>
      <IconButton
        aria-label="Next Collections"
        icon={<ChevronRightIcon />}
        onClick={nextCollection}
        isDisabled={currentIndex >= totalCollections - collectionsPerPage}
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
