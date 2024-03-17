import React from 'react';
import { Box, Heading, Image, Text, Link, Button, Grid, GridItem, Badge, Flex } from '@chakra-ui/react';

const CollectionCard = ({ title, images, date, itemCount, itemLink }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
        {/* Map through the images and display them in a grid */}
        {images.map((image, index) => (
          <GridItem key={index} colSpan={1} position="relative">
            <Image src={image.src} alt={image.alt} objectFit="cover" width="100%" height="100%" />
            {/* If the image has a counter, display it */}
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

const CollectionPreview = () => {
  const dummyCollections = [
    {
      title: 'Collection d’artistes contemporains exclusifs',
      images: [
        { src: './images/collections/collection1.jpg', alt: 'Image 1'},
        { src: './images/collections/collection2.jpg', alt: 'Image 2' },
        { src: './images/collections/collection3.jpg', alt: 'Image 3' },
        { src: './images/collections/collection2.jpg', alt: 'Image 2' },
        { src: './images/collections/collection3.jpg', alt: 'Image 3' },
        { src: './images/collections/collection3.jpg', alt: 'Image 3', counter: '424' },
        // Add more images if needed
      ],
      date: '23 et 24 mars',
      itemCount: '116',
      itemLink: '#',
    },
    // ... more collections
  ];

  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
      {dummyCollections.map((collection, index) => (
        <CollectionCard key={index} {...collection} />
      ))}
    </Grid>
  );
};

export default CollectionPreview;
