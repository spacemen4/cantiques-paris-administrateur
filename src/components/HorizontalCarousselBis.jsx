import React, { useState, useEffect, useRef } from 'react';
import { Grid, GridItem, IconButton, Box, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CollectionPreview from './CollectionPreview'; // Ensure this path is correct

const HorizontalCarouselBis = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gridRef = useRef(null);

  const visibleItems = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }) || 1;
  const itemWidth = `${100 / visibleItems}%`;

  // Define how many times you want to repeat the CollectionPreview component
  const repeatCount = 5;
  // Create an array with `repeatCount` instances of CollectionPreview components
  const items = Array.from({ length: repeatCount }, (_, index) => (
    <CollectionPreview key={index} />
  ));

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < items.length - visibleItems ? prevIndex + 1 : prevIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  useEffect(() => {
    if (gridRef.current) {
      const itemWidthPercentage = 100 / visibleItems;
      gridRef.current.scrollLeft = currentIndex * itemWidthPercentage;
    }
  }, [currentIndex, visibleItems]);

  return (
    <Box position="relative" width="100%">
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous"
        onClick={handlePrev}
        isDisabled={currentIndex === 0}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
      />
      <Grid
        ref={gridRef}
        templateColumns={`repeat(${items.length}, ${itemWidth})`}
        gap={4}
        alignItems="center"
        overflowX="hidden"
        scrollSnapType="x mandatory"
      >
        {items.map((item, index) => (
          <GridItem key={index} width="full">
            {item}
          </GridItem>
        ))}
      </Grid>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next"
        onClick={handleNext}
        isDisabled={currentIndex === items.length - visibleItems}
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
      />
    </Box>
  );
};

export default HorizontalCarouselBis;
