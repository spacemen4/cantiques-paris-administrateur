import React from 'react';
import { Box, Heading, Image, Text, Link, Button, Flex } from '@chakra-ui/react';

const CollectionCard = ({ title, images, date, itemCount, itemLink }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" height="100%">
      <Box position="relative" width="100%" height="200px">
        <Image src={images[0].src} alt={images[0].alt} objectFit="cover" width="100%" height="100%" />
        {images[0].counter && (
          <Flex position="absolute" bottom="0" right="0" m={2} align="center">
            <Box bg="red.500" color="white" borderRadius="full" px={3} py={1} mr={2}>
              +{images[0].counter}
            </Box>
            <Text color="white" fontSize="sm">items</Text>
          </Flex>
        )}
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
          {itemCount && `Discover ${itemCount} items`}
        </Text>
      </Box>
      <Flex justifyContent="flex-end" p={4}>
        <Link href={itemLink} isExternal>
          <Button size="sm" colorScheme="blue">
            View more
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default CollectionCard;
