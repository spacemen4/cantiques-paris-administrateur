// SubcategoriesPage.js
import React, { useState, useEffect } from "react";
import { Box, Input, Select, Button, useToast } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance

const SubcategoriesPage = () => {
  const [subCategoryName, setSubCategoryName] = useState(""); // State for the new subcategory name
  const [selectedCategory, setSelectedCategory] = useState(""); // State for the selected category
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
      // Send a POST request to create a new subcategory in the 'subcategories' table
      const { data, error } = await supabase
        .from("subcategories")
        .insert({ name: subCategoryName, category_id: selectedCategory });
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
      // Clear the input field
      setSubCategoryName("");
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
      <Button colorScheme="blue" onClick={handleSubmit}>Create Subcategory</Button>
    </Box>
  );
};

export default SubcategoriesPage;
