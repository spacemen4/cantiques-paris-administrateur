// CategoriesPage.js
import React, { useState, useEffect } from "react";
import { Box, Input, Button, useToast, Flex, Text, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Importez l'instance client Supabase
import { MdDeleteForever } from "react-icons/md";
import Header from "./../Header";

const CategoriesPage = () => {
    const [categoryName, setCategoryName] = useState(""); // État pour le nouveau nom de catégorie
    const [categoryColor, setCategoryColor] = useState(""); // État pour la couleur de la catégorie
    const [existingCategories, setExistingCategories] = useState([]); // État pour les catégories existantes
    const [deleteCategoryId, setDeleteCategoryId] = useState(null); // État pour la catégorie à supprimer
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // État pour contrôler la modal de suppression
    const toast = useToast(); // Toast pour afficher les messages de succès ou d'erreur

    // Fonction pour récupérer les catégories existantes depuis la base de données
    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase.from("categories").select("*");
            if (error) {
                throw error;
            }
            setExistingCategories(data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error.message);
        }
    };

    // Chargez les catégories existantes lors du montage du composant
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        try {
            // Envoyez une requête POST pour créer une nouvelle catégorie dans la table 'categories'
            const path = categoryName.toLowerCase(); // Calculez le chemin en minuscules
            const { data, error } = await supabase.from("categories").insert({ name: categoryName, color: categoryColor, path });
            if (error) {
                throw error;
            }
            // Affichez un message de succès
            toast({
                title: "Catégorie créée",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Effacez les champs de saisie
            setCategoryName("");
            setCategoryColor("");
            // Mettez à jour la liste des catégories existantes
            fetchCategories();
        } catch (error) {
            // Affichez un message d'erreur si la requête échoue
            console.error("Erreur lors de la création de la catégorie :", error.message);
            toast({
                title: "Erreur",
                description: "Échec de la création de la catégorie",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            // Envoyez une requête DELETE pour supprimer la catégorie de la table 'categories'
            const { error } = await supabase.from("categories").delete().eq("id", categoryId);
            if (error) {
                throw error;
            }
            // Affichez un message de succès
            toast({
                title: "Catégorie supprimée",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Mettez à jour la liste des catégories existantes
            fetchCategories();
        } catch (error) {
            // Affichez un message d'erreur si la requête échoue
            console.error("Erreur lors de la suppression de la catégorie :", error.message);
            toast({
                title: "Erreur",
                description: "Échec de la suppression de la catégorie",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Fonction pour gérer l'ouverture de la modal de confirmation de suppression
    const handleOpenDeleteModal = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setIsDeleteModalOpen(true);
    };

    // Fonction pour gérer la fermeture de la modal de confirmation de suppression
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteCategoryId(null);
    };

    // Fonction pour confirmer la suppression d'une catégorie
    const handleConfirmDelete = () => {
        handleDeleteCategory(deleteCategoryId);
        setIsDeleteModalOpen(false);
    };

    return (
        <><Header />
            <Box padding="10px">
                <Input
                    placeholder="Entrez le nom de la catégorie"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    mb={4}
                />
                <Flex align="center" mb={4}>
                    <Select
                        placeholder="Sélectionnez la couleur de la catégorie"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        mr={2}
                    >
                        <option value="red">Rouge</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="yellow">Jaune</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Violet</option>
                        <option value="pink">Rose</option>
                        <option value="cyan">Cyan</option>
                        <option value="teal">Turquoise</option>
                        <option value="lime">Citron vert</option>
                        <option value="violet">Violet</option>
                        <option value="indigo">Indigo</option>
                        <option value="amber">Ambre</option>
                        <option value="brown">Brun</option>
                        <option value="gray">Gris</option>
                        <option value="black">Noir</option>
                        <option value="maroon">Marron</option>
                        <option value="navy">Bleu marine</option>
                        <option value="olive">Olive</option>
                        <option value="silver">Argent</option>
                        <option value="white">Blanc</option>
                    </Select>
                    
                </Flex>
                <Button colorScheme="blue" onClick={handleSubmit} m={2}>Créer la catégorie</Button>
                {/* Afficher les catégories existantes */}
                <Text>Liste des catégories existantes (cliquez sur <MdDeleteForever style={{ display: 'inline' }}/> pour supprimer)</Text>
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
                            size={20} />
                    </Box>
                ))}
                {/* Modal de confirmation de suppression */}
                <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Supprimer la catégorie</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Êtes-vous sûr de vouloir supprimer cette catégorie ?
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
                                Supprimer
                            </Button>
                            <Button onClick={handleCloseDeleteModal}>Annuler</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default CategoriesPage;
