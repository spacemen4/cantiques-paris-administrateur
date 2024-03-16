import React from "react";
import { Flex, Box, Image, Text, Heading } from "@chakra-ui/react";

const SubChoiceCard = ({ imageSrc, title }) => {
  return (
    <Box w="300px" h="300px" bg="pink.100" borderRadius="lg" overflow="hidden" position="relative">
      <Image src={imageSrc} alt={title} objectFit="cover" boxSize="100%" />
      <Box position="absolute" bottom="0" left="0" right="0" p="4" bg="rgba(0, 0, 0, 0.5)">
        <Text color="white" fontWeight="bold" fontSize="lg">{title}</Text>
      </Box>
    </Box>
  );
};

const BijouxPage = () => {
  return (
    <Flex direction="column" align="center" p="4">
      <Heading mb="6" color="pink.500">Bijoux</Heading>
      <Flex wrap="wrap" justify="center" gap="4">
        <SubChoiceCard 
          imageSrc="./public/images/BijouxPage/bijoux.jpg" 
          title="Bijoux" 
        />
        <SubChoiceCard 
          imageSrc="./public/images/BijouxPage/diamant.jpg" 
          title="Diamants" 
        />
        <SubChoiceCard 
          imageSrc="./public/images/BijouxPage/pierresprecieuses.jpg" 
          title="Pierres précieuses" 
        />
      </Flex>
    </Flex>
  );
};

export default BijouxPage;
