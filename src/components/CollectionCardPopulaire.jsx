import React from 'react';
import { Box, Heading, Image, Text, Link, Button, Grid, GridItem, Badge, Flex } from '@chakra-ui/react';

const CollectionCardPopulaire = ({ title, images, date, itemCount, itemLink }) => {
  const gridTemplateRows = "repeat(2, auto)";
  const gridTemplateColumns = "repeat(5, 1fr)";

  const getColumnSpan = (index) => {
    if (index === 0 || index === 4) return 2;
    return 1;
  };

  const getRowSpan = (index) => {
    if (index === 0) return 2;
    return 1;
  };
  const imageBackground = "blue.50";

  return (
    <Box borderRadius="lg" overflow="hidden">
      <Box bg={imageBackground}>
        <Grid templateRows={gridTemplateRows} templateColumns={gridTemplateColumns} gap={2}>
          {images.map((image, index) => (
            <GridItem key={index} colSpan={getColumnSpan(index)} rowSpan={getRowSpan(index)} position="relative">
              <Image src={image.src} alt={image.alt} objectFit="cover" width="100%" height="100%" />
              {image.counter && (
                <Badge
                  position="absolute"
                  bottom="50px"
                  right={index === 4 ? "-100px" : "0"} 
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

export default CollectionCardPopulaire;
