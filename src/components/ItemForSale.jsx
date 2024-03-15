import React from 'react';
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  IconButton,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const SaleItemCard = ({ imageUrl, title, price, daysLeft, likes }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={cardBg}>
      <Image src={imageUrl} alt={title} />

      <Box p="6">
        <Flex alignItems="center">
          <IconButton
            aria-label={`Like ${title}`}
            icon={<FaHeart />}
            size="sm"
            colorScheme="blue"
            variant="ghost"
            isRound={true}
          />
          <Badge ml="2" fontSize="0.8em" colorScheme="blue">
            {likes}
          </Badge>
          <Spacer />
          <Badge colorScheme="teal">OFFRE ACTUELLE</Badge>
        </Flex>

        <Flex align="baseline" mt="2">
          <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wide">
            {title}
          </Text>
        </Flex>

        <Flex mt="2" justifyContent="space-between" align="center">
          <Text fontWeight="semibold" fontSize="lg">
            {price} €
          </Text>
          <Badge colorScheme="orange" fontSize="0.8em">
            Il reste {daysLeft} jour
          </Badge>
        </Flex>
      </Box>
    </Box>
  );
};

const ItemForSale = () => {
  // Replace the dummy data with real data
  const itemData = {
    imageUrl: 'path_to_image.jpg', // Replace with your image path
    title: 'Andy Warhol (after) - Revolver - Big Size XXL',
    price: '112',
    daysLeft: '1',
    likes: '12',
  };

  return <SaleItemCard {...itemData} />;
};

export default ItemForSale;
