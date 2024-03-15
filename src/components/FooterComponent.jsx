import React from 'react';
import { Flex, Button, Text, Spacer } from '@chakra-ui/react';

const FooterComponent = () => {
  return (
    <Flex bg="white" color="blue.600" align="center" p="2" justify="center" wrap="wrap">
    {/* Logo and category dropdown */}
    <Flex align="center" mr={{ base: 2, sm: 4 }}>
    <Flex
      as="footer"
      width="full"
      align="center"
      justifyContent="center"
      p="4"
      bg="gray.100"
      color="blue.600"
    >
      <Button colorScheme="blue" mr="4">
        Connectez-vous
      </Button>
      <Button colorScheme="blue" mr="4">
        Inscrivez-vous
      </Button>
      <Spacer />
      <Text>
        Chaque semaine, découvrez plus de 65,000 objets d'exception, sélectionnés par 240+ experts
      </Text>
    </Flex>
    </Flex>
    </Flex>
  );
};

export default FooterComponent;
