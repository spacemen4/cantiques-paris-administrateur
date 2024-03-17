import React, { useState, useEffect } from "react";
import {
  Box, Input, Select, Button, useToast, FormControl, FormLabel, FormHelperText,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { supabase } from "../../../supabase";
import Header from "../Header";
import { v4 as uuidv4 } from 'uuid';

const SubcategoriesPage = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
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
        .select('name, image_url, category_id, categories (name)')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error.message);
      toast({
        title: "Error",
        description: "Failed to fetch subcategories",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const fetchCategories = async () => {
    try {
      // Fetch categories from the 'categories' table
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      // Update the state with fetched categories
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
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

    // Construct the URL directly
    const imageUrl = `https://tzfuvfxjjcywdrgivqzq.supabase.co/storage/v1/object/public/subcategory-images/images/${uniqueFileName}`;
    setImageUrl(imageUrl);
    return imageUrl;
  };

  const handleSubmit = async () => {
    try {
      const uploadedImageUrl = await uploadImage();
      // Call finalizeCreation directly after successful image upload
      finalizeCreation(uploadedImageUrl); // Pass the uploaded image URL to finalizeCreation
    } catch (error) {
      console.error("Error uploading image:", error.message);
      toast({
        title: "Error",
        description: "Failed to upload image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const finalizeCreation = async (uploadedImageUrl) => {
    try {
      // Use the uploaded image URL for subcategory creation
      const { data, error } = await supabase
        .from("subcategories")
        .insert({
          name: subCategoryName,
          category_id: selectedCategory,
          image_url: uploadedImageUrl // Use the uploaded image URL here
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Subcategory created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset the form state
      setSubCategoryName("");
      setSelectedCategory("");
      setImageFile(null);
      setImageUrl(""); // Reset the image URL state
    } catch (error) {
      console.error("Error creating subcategory:", error.message);
      toast({
        title: "Error",
        description: "Failed to create subcategory",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Box>
        <Input
          placeholder="Enter subcategory name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          mb={4}
        />
        <Select
          placeholder="Select category"
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
        <FormControl mb={4}>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleFileChange} />
          <FormHelperText>Upload an image for the subcategory.</FormHelperText>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>Upload Image</Button>
      </Box>
      <Box mt={10}>
        {subcategories.map((subcat) => (
          <Box key={subcat.id} p={5} shadow="md" borderWidth="1px" mb={4}>
            <Box display="flex" alignItems="center">
              <Box flexShrink={0}>
                <img src={subcat.image_url} alt={`Image for ${subcat.name}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              </Box>
              <Box ml={4}>
                <Box fontWeight="bold" letterSpacing="wide" fontSize="xl" textTransform="uppercase">
                  {subcat.name}
                </Box>
                <Box>Category: {subcat.categories.name}</Box>
                <Box>Category ID: {subcat.category_id}</Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

    </>
  );
};

export default SubcategoriesPage;
