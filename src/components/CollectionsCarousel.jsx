import React, { useState } from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import CollectionPreview from './CollectionPreview'; // Import CollectionPreview component

const CollectionsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = 3; // Assuming you have 3 pages of collections

  const nextCollection = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages); // Loop back to the first page
  };

  // Calculate the width for each CollectionPreview based on the number of pages
  const collectionPreviewWidth = `calc(100% / ${totalPages})`;

  return (
    <Box position="relative" w="full" overflow="hidden">
      <Flex direction="row" w="full">
        {/* Use a single Box to wrap the CollectionPreviews and set its width to n-times 100%, where n is the total number of pages */}
        <Box w={`${totalPages * 100}%`} display="flex" flexDirection="row" transform={`translateX(-${currentIndex * 100 / totalPages}%)`} transition="transform 0.3s ease-in-out">
          {/* Set each CollectionPreview to take up the full width of a single page */}
          <Box w={collectionPreviewWidth} flexShrink={0}><CollectionPreview /></Box>
          <Box w={collectionPreviewWidth} flexShrink={0}><CollectionPreview /></Box>
          <Box w={collectionPreviewWidth} flexShrink={0}><CollectionPreview /></Box>
          {/* Add more <Box> wrappers as needed for additional CollectionPreviews */}
        </Box>
      </Flex>
      {currentIndex < totalPages - 1 && (
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
      )}
    </Box>
  );
};

export default CollectionsCarousel;
