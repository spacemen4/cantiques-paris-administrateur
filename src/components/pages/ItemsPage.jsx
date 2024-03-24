import React, { useState, useEffect } from "react";
import {
  Box, Input, Select, Button, useToast, FormControl, FormLabel, FormHelperText, Checkbox, CheckboxGroup, Heading,
} from "@chakra-ui/react";
import { supabase } from "../../../supabase";
import Header from "../Header";
import { v4 as uuidv4 } from 'uuid';
import ItemsList from "./ItemsList";

const ItemsPage = () => {
  const [title, setTitle] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [currentOffer, setCurrentOffer] = useState("");

  const [estimatedGalleryValue, setEstimatedGalleryValue] = useState("");
  const [selectedBy, setSelectedBy] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [legalInformation, setLegalInformation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL
  const [brand, setBrand] = useState(""); // New state for brand
  const [weight, setWeight] = useState(""); // New state for weight
  const [dimensions, setDimensions] = useState(""); // New state for dimensions
  const [pierre, setPierre] = useState(""); // New state for pierre
  const [metal, setMetal] = useState(""); // New state for metal
  const [genre, setGenre] = useState(""); // New state for genre
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase.from("categories").select("*");
      if (categoriesError) {
        throw categoriesError;
      }
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", categoryId); // Filter subcategories by the selected category ID
      if (subcategoriesError) {
        throw subcategoriesError;
      }
      setSubcategories(subcategoriesData || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    const uniqueFileName = `${uuidv4()}`;
    const { data: fileData, error: fileError } = await supabase.storage
      .from("items-images")
      .upload(`images/${uniqueFileName}`, imageFile);

    if (fileError) {
      throw fileError;
    }

    // Construct the URL directly
    const imageUrl = `https://tzfuvfxjjcywdrgivqzq.supabase.co/storage/v1/object/public/items-images/images/${uniqueFileName}`;
    setImageUrl(imageUrl); // Set the imageUrl state here
    return imageUrl;
  };


  const handleSubmit = async () => {
    try {
      const uploadedImageUrl = await uploadImage();
      // After successful image upload, continue with item creation
      createItem(uploadedImageUrl); // Pass uploadedImageUrl to createItem
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


  const createItem = async (uploadedImageUrl) => {
    try {
        const itemId = uuidv4();
        const currentOfferValue = currentOffer !== "" ? parseInt(currentOffer) : null;

        const { data, error } = await supabase.from("items").insert({
            id: itemId,
            title: title,
            lot_number: lotNumber,
            closing_time: closingTime,
            current_offer: currentOfferValue,

            estimated_gallery_value: estimatedGalleryValue,
            selected_by: selectedBy,

            payment_methods: paymentMethods,
            item_description: itemDescription,
            legal_information: legalInformation,
            category_id: selectedCategory,
            subcategory_id: selectedSubcategory,
            image_url: uploadedImageUrl,
            brand: brand,
            weight: weight,
            dimensions: dimensions,
            pierre: pierre,
            metal: metal,
            genre: genre,
        });

        if (error) {
            throw error;
        }

        toast({
            title: "Item created",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Clear form fields and reset image state
        clearFormFields();
        setImageUrl("");
    } catch (error) {
        console.error("Error creating item:", error.message);
        console.log("Error details:", error.details); // Log error details to console
        toast({
            title: "Error",
            description: "Echec de la création de l'item car tous les champs sont requis",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
};

  const clearFormFields = () => {
    setTitle("");
    setLotNumber("");
    setClosingTime("");
    setCurrentOffer("");

    setEstimatedGalleryValue("");
    setSelectedBy("");
    setPaymentMethods([]);
    setItemDescription("");
    setLegalInformation("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setBrand("");
    setWeight("");
    setDimensions("");
    setPierre("");
    setMetal("");
    setGenre("");
  };

  const availablePaymentMethods = ["PayPal", "Mastercard", "Card", "Espèce"];
  return (
    <>
      <Header />
      <Box padding="10px">
        <Input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Numéro de lot"
          value={lotNumber}
          onChange={(e) => setLotNumber(e.target.value)}
          mb={4}
          required
        />
        <Input
          type="datetime-local"
          placeholder="Heure de clôture"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          mb={4}
          required
        />
        {/* Sélection de la catégorie et de la sous-catégorie */}
        <Select
          placeholder="Sélectionner une catégorie"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            fetchSubcategories(e.target.value);
          }}
          mb={4}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Sélectionner une sous-catégorie"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          mb={4}
          required
        >
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </Select>



        <Input
          placeholder="Offre actuelle"
          type="number"
          value={currentOffer}
          onChange={(e) => setCurrentOffer(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Valeur estimée en galerie"
          value={estimatedGalleryValue}
          onChange={(e) => setEstimatedGalleryValue(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Sélectionné par"
          value={selectedBy}
          onChange={(e) => setSelectedBy(e.target.value)}
          mb={4}
          required
        />
        <Heading>Méthode de paiement</Heading>
        <CheckboxGroup value={paymentMethods} onChange={setPaymentMethods} mb={4} required>
          {availablePaymentMethods.map((method) => (
            <Checkbox key={method} value={method}>
              {method}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Input
          placeholder="Description de l'article"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Informations légales"
          value={legalInformation}
          onChange={(e) => setLegalInformation(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Poids"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Dimensions"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Pierre"
          value={pierre}
          onChange={(e) => setPierre(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Métal"
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          mb={4}
        />
        {/* Téléchargement de fichiers */}
        <FormControl mb={4} required>
          <FormLabel>Télécharger une image</FormLabel>
          <Input type="file" onChange={handleFileChange} required />
          <FormHelperText>Téléchargez une image pour l'article.</FormHelperText>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
          Créer l'article
        </Button>

        {/* Toast pour afficher les messages de succès ou d'erreur */}
        {/* Vous pouvez implémenter le toast ici */}
        <ItemsList/>

      </Box>
    </>
  );
};

export default ItemsPage;

