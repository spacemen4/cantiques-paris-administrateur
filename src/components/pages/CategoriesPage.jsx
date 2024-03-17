import React, { useState, useEffect } from "react";
import { Box, Input, Button, useToast, Flex, Select } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance
import { MdDeleteForever } from "react-icons/md";

const CategoriesPage = () => {
    const [categoryName, setCategoryName] = useState(""); // State for the new category name
    const [categoryColor, setCategoryColor] = useState(""); // State for the category color
    const [existingCategories, setExistingCategories] = useState([]); // State for existing categories
    const toast = useToast(); // Toast for displaying success or error messages

    // Function to fetch existing categories from the database
    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase.from("categories").select("*");
            if (error) {
                throw error;
            }
            setExistingCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    };

    // Load existing categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

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
            // Update the list of existing categories
            fetchCategories();
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

    const handleDeleteCategory = async (categoryId) => {
        try {
            // Send a DELETE request to remove the category from the 'categories' table
            const { error } = await supabase.from("categories").delete().eq("id", categoryId);
            if (error) {
                throw error;
            }
            // Display a success message
            toast({
                title: "Category deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Update the list of existing categories
            fetchCategories();
        } catch (error) {
            // Display an error message if the request fails
            console.error("Error deleting category:", error.message);
            toast({
                title: "Error",
                description: "Failed to delete category",
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
                    {/* Add more color options */}
                </Select>
                <Button colorScheme="blue" onClick={handleSubmit}>Create Category</Button>
            </Flex>
            {/* Display existing categories */}
            {existingCategories.map((category) => (
                <Box
                    key={category.id}
                    bg={category.color}
                    color="white"
                    p={2}
                    borderRadius="md"
                    mb={2}
                    display="flex"
                    justifyContent="space-between"
                >
                    {category.name}
                    <MdDeleteForever
                        onClick={() => handleDeleteCategory(category.id)}
                        cursor="pointer"
                        size={20}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default CategoriesPage;
