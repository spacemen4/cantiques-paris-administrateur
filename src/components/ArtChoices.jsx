import React from "react";
import { Flex, Box, Image, Text, Heading } from "@chakra-ui/react";

const SubChoiceCard = ({ imageSrc, title }) => {
  return (
    // The size of the box is increased and background color is set to pink
    <Box w="300px" h="300px" bg="pink.100" borderRadius="lg" overflow="hidden" position="relative">
      <Image src={imageSrc} alt={title} objectFit="cover" boxSize="100%" />
      <Box position="absolute" bottom="0" left="0" right="0" p="4" bg="rgba(0, 0, 0, 0.5)">
        <Text color="white" fontWeight="bold" fontSize="lg">{title}</Text>
      </Box>
    </Box>
  );
};

const ArtChoices = () => {
  return (
    <Flex direction="column" align="center" p="4">
      <Heading mb="6" color="pink.500">Art</Heading>
      <Flex wrap="wrap" justify="center" gap="4">
        {/* SubChoiceCard components with updated paths and titles */}
        <SubChoiceCard imageSrc="./images/affichesposter.jpg" title="Affiches et posters" />
        <SubChoiceCard imageSrc="./images/tableau.jpg" title="Art classique" />
        <SubChoiceCard imageSrc="./images/artmodern.jpg" title="Art moderne et contemporain" />
        <SubChoiceCard imageSrc="./images/gravures.jpg" title="Gravures et éditions limitées" />
        <SubChoiceCard imageSrc="./images/photographie.jpg" title="Photographie" />
      </Flex>
    </Flex>
  );
};

export default ArtChoices;
