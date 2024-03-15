import React from 'react';
import { Box, Heading, Image, Text, Flex, Link, Button, SimpleGrid } from '@chakra-ui/react';

const CollectionCard = ({ title, images, date, itemCount, itemLink }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex direction="row" overflowX="scroll">
        {/* Dummy images */}
        {images.map((image, index) => (
          <Box key={index} position="relative" minW="sm">
            <Image src={image.src} alt={image.alt} objectFit="cover" width="100%" height="200px" />
            {image.counter && (
              <Text position="absolute" bottom="2" right="2" bg="whiteAlpha.800" p="1">
                +{image.counter}
              </Text>
            )}
          </Box>
        ))}
      </Flex>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {date && (
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              mr="2"
            >
              {date}
            </Box>
          )}
        </Box>

        <Heading size="md" mt="1" lineHeight="tight" isTruncated>
          {title}
        </Heading>

        <Box>
          {itemCount && (
            <Text color="gray.600" fontSize="sm">
              Découvrez les {itemCount} objets
            </Text>
          )}
        </Box>
      </Box>
      <Flex justifyContent="flex-end" p="4">
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
        { src: './images/collections/collection1.jpg', alt: 'Image 1', counter: '424' },
        { src: './images/collections/collection2.jpg', alt: 'Image 2' },
        { src: './images/collections/collection3.jpg', alt: 'Image 3' },
      ],
      date: '23 et 24 mars',
      itemCount: '116',
      itemLink: '#',
    },
    // ... more collections
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {dummyCollections.map((collection, index) => (
        <CollectionCard key={index} {...collection} />
      ))}
    </SimpleGrid>
  );
};

export default CollectionPreview;
