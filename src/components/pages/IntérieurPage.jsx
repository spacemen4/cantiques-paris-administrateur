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

const categories = [
  { title: "Antiquités", imageSrc: "/images/InterieurPage/antiquites.jpg" },
  { title: "Argenterie et Orfèvrerie", imageSrc: "/images/InterieurPage/argenterie.jpg" },
  { title: "Art de la table", imageSrc: "/images/InterieurPage/artdelatable.jpg" },
  { title: "Art nouveau et Art déco", imageSrc: "/images/InterieurPage/artnouveauartdeco.jpg" },
  { title: "Design & Marques Iconiques", imageSrc: "/images/InterieurPage/designetmarqueiconique.jpg" },
  { title: "Horloges", imageSrc: "/images/InterieurPage/horloge.jpg" },
  { title: "Idées Maison", imageSrc: "/images/InterieurPage/ideemaison.jpg" },
  { title: "Luminaires", imageSrc: "/images/InterieurPage/luminaires.jpg" },
  { title: "Objets décoratifs", imageSrc: "/images/InterieurPage/objetdecoratifs.jpg" },
  { title: "Plantes et jardins", imageSrc: "/images/InterieurPage/plantesetjardins.jpg" },
  { title: "Tapis", imageSrc: "/images/InterieurPage/tapis.jpg" },
  { title: "Vintage et industriel", imageSrc: "/images/InterieurPage/vintagesindustriels.jpg" }
];

const InterieurPage = () => {
  return (
    <Flex direction="column" align="center" p="4">
      <Heading mb="6" color="pink.500">Intérieur</Heading>
      <Flex wrap="wrap" justify="center" gap="4">
        {categories.map((category) => (
          <SubChoiceCard 
            key={category.title}
            imageSrc={category.imageSrc} 
            title={category.title} 
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default InterieurPage;
