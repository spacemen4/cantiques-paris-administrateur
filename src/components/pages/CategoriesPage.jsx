// CategoriesPage.js
import React, { useState, useEffect } from "react";
import { Box, Input, Button, useToast, Flex, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance
import { MdDeleteForever } from "react-icons/md";
import Header from "./../Header";

const CategoriesPage = () => {
    const [categoryName, setCategoryName] = useState(""); // State for the new category name
    const [categoryColor, setCategoryColor] = useState(""); // State for the category color
    const [existingCategories, setExistingCategories] = useState([]); // State for existing categories
    const [deleteCategoryId, setDeleteCategoryId] = useState(null); // State for the category to delete
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for controlling the delete modal
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
            const path = categoryName.toLowerCase(); // Calculate the lowercase path
            const { data, error } = await supabase.from("categories").insert({ name: categoryName, color: categoryColor, path });
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

    // Function to handle opening the delete confirmation modal
    const handleOpenDeleteModal = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setIsDeleteModalOpen(true);
    };

    // Function to handle closing the delete confirmation modal
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteCategoryId(null);
    };

    // Function to handle confirming deletion of a category
    const handleConfirmDelete = () => {
        handleDeleteCategory(deleteCategoryId);
        setIsDeleteModalOpen(false);
    };

    return (
        <><Header/>
        <Box padding="10px">
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
                    maxWidth="fit-content"
                    maxHeight="fit-content"
                >
                    {category.name}
                    <MdDeleteForever
                        onClick={() => handleOpenDeleteModal(category.id)}
                        cursor="pointer"
                        size={20}
                    />
                </Box>
            ))}
            {/* Delete confirmation modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this category?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                        <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        </>
    );
};

export default CategoriesPage;
