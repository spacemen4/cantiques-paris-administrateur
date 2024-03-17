import React from 'react';
import { Box, Heading, Image, Text, Link, Button, Grid, GridItem, Badge, Flex } from '@chakra-ui/react';

const CollectionCard = ({ title, images, date, itemCount, itemLink }) => {
  const gridTemplateRows = "repeat(2, auto)"; // This will allow for two rows with automatic height
  const gridTemplateColumns = "repeat(5, 1fr)"; // Assume there will be five columns in total

  // Function to determine column span based on the image's position
  const getColumnSpan = (index) => {
    if (index === 0 || index === 4) return 2; // First and last image span two columns
    return 1; // Other images span one column
  };

  // Function to determine row span based on the image's position
  const getRowSpan = (index) => {
    if (index === 0) return 2; // First image spans two rows
    return 1; // Other images span one row
  };
  const imageBackground = "blue.50";

  return (
    <Box  borderRadius="lg" overflow="hidden">
      <Box bg={imageBackground}> {/* Apply the background color here */}
        <Grid templateRows={gridTemplateRows} templateColumns={gridTemplateColumns} gap={2}>
          {images.map((image, index) => (
            <GridItem key={index} colSpan={getColumnSpan(index)} rowSpan={getRowSpan(index)} position="relative">
              <Image src={image.src} alt={image.alt} objectFit="cover" width="100%" height="100%" />
              {image.counter && (
                <Badge
                  position="absolute"
                  bottom="0"
                  right="0"
                  m={2}
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  +{image.counter}
                </Badge>
              )}
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Box p={4}>
        {date && (
          <Text color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
            {date}
          </Text>
        )}
        <Heading size="md" mt={1} lineHeight="tight" noOfLines={1}>
          {title}
        </Heading>
        <Text color="gray.600" fontSize="sm">
          {itemCount && `Découvrez les ${itemCount} objets`}
        </Text>
      </Box>
      <Flex justifyContent="flex-end" p={4}>
        <Link href={itemLink} isExternal>
          <Button size="sm" colorScheme="blue">
            Voir plus
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default CollectionCard;
