// CategoriesPage.js
import React, { useState } from "react";
import { Box, Input, Button, useToast, Flex, Select } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState(""); // State for the new category name
  const [categoryColor, setCategoryColor] = useState(""); // State for the category color
  const toast = useToast(); // Toast for displaying success or error messages

  const handleSubmit = async () => {
    try {
      // Send a POST request to create a new category in the 'categories' table
      const { data, error } = await supabase.from("categories").insert({ name: categoryName, color: categoryColor });
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
      // Clear the input fields
      setCategoryName("");
      setCategoryColor("");
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
      <Flex align="center" mb={4}>
        <Select
          placeholder="Select category color"
          value={categoryColor}
          onChange={(e) => setCategoryColor(e.target.value)}
          mr={2}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          {/* Add more color options as needed */}
        </Select>
        <Button colorScheme="blue" onClick={handleSubmit}>Create Category</Button>
      </Flex>
    </Box>
  );
};

export default CategoriesPage;
