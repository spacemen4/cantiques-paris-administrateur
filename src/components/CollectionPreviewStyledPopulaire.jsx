import React from 'react';
import { Grid } from '@chakra-ui/react';
import CollectionCard from './CollectionCard'; // Make sure the path is correct for your project structure

const CollectionPreviewStyledPopulaire = () => {
  const dummyCollections = [
    {
      title: 'Collection d’artistes contemporains exclusifs',
      images: [
        { src: './images/collections/collection1.jpg', alt: 'Image 1' },
        { src: './images/collections/collection2.jpg', alt: 'Image 2' },
        { src: './images/collections/collection3.jpg', alt: 'Image 3' },
        { src: './images/collections/collection4.jpg', alt: 'Image 4' },
        { src: './images/collections/collection5.jpg', alt: 'Image 5', counter: 633 },
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

export default CollectionPreviewStyledPopulaire;
