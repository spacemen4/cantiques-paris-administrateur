import React from 'react';
import {
  Flex,
  Box,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';

const HeaderTop = () => {
  return (
    <Flex bg="white" color="blue.600" align="center" p="2" justify="center" wrap="wrap">
      {/* Logo and category dropdown */}
      <Flex align="center" mr={{ base: 2, sm: 4 }}>
        <Text fontSize="2xl" fontWeight="bold" mr="4">
          Cantiques-Paris
        </Text>
        <Button rightIcon={<ChevronDownIcon />} colorScheme="blue" variant="ghost">
          Catégories
        </Button>
      </Flex>

      {/* Search input */}
      <InputGroup maxW="md">
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
        <Input type="text" placeholder="Rechercher une marque, un modèle, un artiste..." />
      </InputGroup>

      {/* Right-side buttons */}
      <Flex align="center">
        <Button colorScheme="blue" variant="ghost" leftIcon={<SmallAddIcon />} mr="4">
          Vendre
        </Button>
        <Button colorScheme="blue" variant="ghost" mr="4">
          Aide
        </Button>
        <IconButton
          aria-label="Favorites"
          icon={<FaHeart />}
          size="lg"
          variant="ghost"
          isRound={true}
          mr="4"
        />
        <Button colorScheme="blue">
          Connectez-vous
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeaderTop;
