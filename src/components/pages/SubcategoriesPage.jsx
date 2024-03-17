// SubcategoriesPage.js
import React, { useState, useEffect } from "react";
import { Box, Input, Select, Button, useToast, Flex, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance

const SubcategoriesPage = () => {
  const [subCategoryName, setSubCategoryName] = useState(""); // State for the new subcategory name
  const [selectedCategory, setSelectedCategory] = useState(""); // State for the selected category
  const [imageFile, setImageFile] = useState(null); // State for storing the selected image file
  const [categories, setCategories] = useState([]); // State for storing categories
  const toast = useToast(); // Toast for displaying success or error messages

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

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

  const handleSubmit = async () => {
    try {
      // Upload the image to the bucket
      const { data: fileData, error: fileError } = await supabase.storage.from("subcategory-images").upload(subCategoryName, imageFile);
      if (fileError) {
        throw fileError;
      }
      const imageUrl = fileData.Key; // Get the URL of the uploaded image

      // Send a POST request to create a new subcategory in the 'subcategories' table
      const { data, error } = await supabase
        .from("subcategories")
        .insert({ name: subCategoryName, category_id: selectedCategory, image_url: imageUrl });
      if (error) {
        throw error;
      }
      // Display a success message
      toast({
        title: "Subcategory created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Clear the input fields
      setSubCategoryName("");
      setSelectedCategory("");
      setImageFile(null);
    } catch (error) {
      // Display an error message if the request fails
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
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
      <Button colorScheme="blue" onClick={handleSubmit}>Create Subcategory</Button>
    </Box>
  );
};

export default SubcategoriesPage;
