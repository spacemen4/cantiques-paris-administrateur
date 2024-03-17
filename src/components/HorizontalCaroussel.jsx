import React, { useState, useEffect, useRef } from 'react';
import { Grid, GridItem, IconButton, Box, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']; // Example items

const HorizontalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gridRef = useRef(null);

  const visibleItems = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }) || 1;
  const itemWidth = `${100 / visibleItems}%`;

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
          <GridItem key={index} backgroundColor="gray.200" textAlign="center" lineHeight="40px">
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

export default HorizontalCarousel;
