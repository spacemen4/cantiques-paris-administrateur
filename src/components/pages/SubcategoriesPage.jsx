import React, { useState, useEffect } from "react";
import {
  Box, Input, Select, Button, useToast, FormControl, FormLabel, FormHelperText,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { supabase } from "../../../supabase";
import Header from "../Header";
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md"; // Add this import

const SubcategoriesPage = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategoryPath, setSubCategoryPath] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('id, name, image_url, category_id, categories (name)')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubcategories(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories :', error.message);
      toast({
        title: "Erreur",
        description: "Échec de la récupération des sous-catégories",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };



  const fetchCategories = async () => {
    try {
      // Récupérer les catégories depuis la table 'categories'
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      // Mettre à jour l'état avec les catégories récupérées
      setCategories(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    const fileExtension = imageFile.name.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const { data: fileData, error: fileError } = await supabase.storage.from("subcategory-images").upload(`images/${uniqueFileName}`, imageFile);

    if (fileError) {
      throw fileError;
    }

    // Construire l'URL directement
    const imageUrl = `https://tzfuvfxjjcywdrgivqzq.supabase.co/storage/v1/object/public/subcategory-images/images/${uniqueFileName}`;
    setImageUrl(imageUrl);
    return imageUrl;
  };

  // In handleSubmit, pass the path variable directly to finalizeCreation
  const handleSubmit = async () => {
    try {
      const uploadedImageUrl = await uploadImage();
      // Convert the subCategoryName to lowercase and then URL encode it
      const path = encodeURIComponent(subCategoryName.toLowerCase());
      setSubCategoryPath(path); // Although this is set here, it's used directly in the finalizeCreation call
      finalizeCreation(uploadedImageUrl, path); // Pass the URL-encoded path directly here
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error.message);
      toast({
        title: "Erreur",
        description: "Échec du téléchargement de l'image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };  

// Adjust finalizeCreation to accept path as an argument
const finalizeCreation = async (uploadedImageUrl, path) => {
  try {
    const { data, error } = await supabase
      .from("subcategories")
      .insert({
        name: subCategoryName,
        category_id: selectedCategory,
        image_url: uploadedImageUrl,
        path: path, // Use the path argument directly
      });

    if (error) {
      throw error;
    }

    toast({
      title: "Sous-catégorie créée",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset form state
    setSubCategoryName("");
    setSelectedCategory("");
    setImageFile(null);
    setImageUrl("");
    setSubCategoryPath("");
  } catch (error) {
    console.error("Erreur lors de la création de la sous-catégorie :", error.message);
    toast({
      title: "Erreur",
      description: "Échec de la création de la sous-catégorie",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("subcategories").delete().eq('id', id);
      if (error) {
        throw error;
      }
      // Supprimer la sous-catégorie supprimée de l'état
      setSubcategories(subcategories.filter(subcat => subcat.id !== id));
      toast({
        title: "Sous-catégorie supprimée",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la sous-catégorie :", error.message);
      toast({
        title: "Erreur",
        description: "Échec de la suppression de la sous-catégorie",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Box padding="10px">
        <Select
          placeholder="Sélectionnez une catégorie"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          mb={4}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Entrez le nom de la sous-catégorie que vous souhaitez créer"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          mb={4}
        />
        <FormControl mb={4}>
          <FormLabel>Télécharger une image</FormLabel>
          <Input type="file" onChange={handleFileChange} />
          <FormHelperText>Téléchargez une image pour la sous-catégorie.</FormHelperText>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>Créer la sous-catégorie</Button>
      </Box>
      <Box mt={10}>
        {subcategories.map((subcat) => (
          <Box key={subcat.id} p={5} shadow="md" borderWidth="1px" mb={4}>
            <Box display="flex" alignItems="center">
              <Box flexShrink={0}>
                <img src={subcat.image_url} alt={`Image pour ${subcat.name}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              </Box>
              <Box ml={4}>
                <Box fontWeight="bold" letterSpacing="wide" fontSize="xl" textTransform="uppercase">
                  {subcat.name}
                </Box>
                <Box>Catégorie : {subcat.categories.name}</Box>
                <Box>ID de la catégorie : {subcat.category_id}</Box>
              </Box>
              <Button ml={4} colorScheme="red" onClick={() => handleDelete(subcat.id)}>
                <MdDeleteForever />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

    </>
  );
};

export default SubcategoriesPage;
