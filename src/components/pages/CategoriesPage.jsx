// CategoriesPage.js
import React, { useState } from "react";
import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState(""); // State for the new category name
  const toast = useToast(); // Toast for displaying success or error messages

  const handleSubmit = async () => {
    try {
      // Send a POST request to create a new category in the 'categories' table
      const { data, error } = await supabase.from("categories").insert({ name: categoryName });
      if (error) {
        throw error;
      }
      // Display a success message
      toast({
        title: "Category created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Clear the input field
      setCategoryName("");
    } catch (error) {
      // Display an error message if the request fails
      console.error("Error creating category:", error.message);
      toast({
        title: "Error",
        description: "Failed to create category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Input
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleSubmit}>Create Category</Button>
    </Box>
  );
};

export default CategoriesPage;
