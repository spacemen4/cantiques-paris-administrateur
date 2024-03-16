import React from 'react';
import {
  Box, SimpleGrid, List, ListItem, Link, Select, Stack, Container, Flex, Spacer, Icon,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

// Updated Data component
const footerData = [
  {
    title: 'À propos de Catawiki',
    links: [
      { name: 'À propos de Catawiki', url: '#' },
      { name: 'Nos experts', url: '#' },
      { name: 'Offres d\'emploi', url: '#' },
      { name: 'Presse', url: '#' },
      { name: 'Partenariat avec Catawiki', url: '#' },
      { name: 'Portail du collectionneur', url: '#' },
    ],
  },
  {
    title: 'Acheter',
    links: [
      { name: 'Comment acheter ?', url: '#' },
      { name: 'Protection des acheteurs', url: '#' },
      { name: 'Catawiki Stories', url: '#' },
      { name: 'Conditions pour les acheteurs', url: '#' },
    ],
  },
  {
    title: 'Vendre',
    links: [
      { name: 'Comment vendre ?', url: '#' },
      { name: 'Conseils pour les vendeurs', url: '#' },
      { name: 'Consignes pour la soumission de lots', url: '#' },
      { name: 'Conditions pour les vendeurs', url: '#' },
      { name: 'Partenaires', url: '#' },
    ],
  },
  {
    title: 'Mon Catawiki',
    links: [
      { name: 'Connectez-vous', url: '#' },
      { name: 'Inscrivez-vous', url: '#' },
      { name: 'Centre d\'aide', url: '#' },
    ],
  },
];

// FooterItem component for each column
const FooterItem = ({ title, links }) => (
  <Box>
    <Box fontWeight="bold" mb={2}>{title}</Box>
    <List spacing={2}>
      {links.map((link, index) => (
        <ListItem key={index}>
          <Link href={link.url}>{link.name}</Link>
        </ListItem>
      ))}
    </List>
  </Box>
);

// Design component
const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" color="gray.700" py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {footerData.map((column, index) => (
            <FooterItem key={index} title={column.title} links={column.links} />
          ))}
        </SimpleGrid>

        <Flex align="center" mt={10}>
          <Select w={40} defaultValue="Français">
            {/* Replace with actual language options */}
            <option>Français</option>
            <option>English</option>
            {/* Add other languages here */}
          </Select>
          <Spacer />
          <Stack direction="row" spacing={6}>
            <Link href="https://www.facebook.com" isExternal>
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
            <Link href="https://www.instagram.com" isExternal>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
