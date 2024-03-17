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
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Pink</option>
                    <option value="cyan">Cyan</option>
                    <option value="teal">Teal</option>
                    <option value="lime">Lime</option>
                    <option value="violet">Violet</option>
                    <option value="indigo">Indigo</option>
                    <option value="amber">Amber</option>
                    <option value="brown">Brown</option>
                    <option value="gray">Gray</option>
                    <option value="black">Black</option>
                    <option value="maroon">Maroon</option>
                    <option value="navy">Navy</option>
                    <option value="olive">Olive</option>
                    <option value="silver">Silver</option>
                    <option value="white">White</option>
                </Select>
                <Button colorScheme="blue" onClick={handleSubmit}>Create Category</Button>
            </Flex>
        </Box>
    );
};

export default CategoriesPage;
