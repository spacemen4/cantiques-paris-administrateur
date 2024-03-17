import React from 'react';
import { Box, Heading, Image, Text, Link, Button, Grid, GridItem, Badge, Flex } from '@chakra-ui/react';

const CollectionCardPopulaire = ({ title, images, date, itemCount, itemLink }) => {
  const gridTemplateRows = "repeat(1, auto)"; // Adjusted to match the other component
  const gridTemplateColumns = "3fr 1fr";

  return (
    <Box borderRadius="lg" overflow="hidden">
      <Box>
        <Grid templateRows={gridTemplateRows} templateColumns={gridTemplateColumns} gap={2}>
          <GridItem colSpan={1} rowSpan={3} position="relative"> {/* Adjusted rowSpan to match the other component */}
            <Image src={images[0].src} alt={images[0].alt} objectFit="cover" width="100%" height="100%" />
          </GridItem>
          {images.slice(1, 4).map((image, index) => (
            <GridItem key={index + 1} colSpan={1} rowSpan={1} position="relative">
              <Image src={image.src} alt={image.alt} objectFit="cover" width="100%" height="100%" />
              {image.counter && (
                <Badge
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  px={2}
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

export default CollectionCardPopulaire;
