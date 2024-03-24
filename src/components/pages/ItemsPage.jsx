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
  const [noReservePrice, setNoReservePrice] = useState(false);
  const [estimatedGalleryValue, setEstimatedGalleryValue] = useState("");
  const [selectedBy, setSelectedBy] = useState("");
  const [buyerProtectionFee, setBuyerProtectionFee] = useState("");
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
        closing_time:       closingTime,
        current_offer: currentOfferValue,
        no_reserve_price: noReservePrice,
        estimated_gallery_value: estimatedGalleryValue,
        selected_by: selectedBy,
        buyer_protection_fee: buyerProtectionFee,
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
      toast({
        title: "Error",
        description: "Failed to create item",
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
    setNoReservePrice(false);
    setEstimatedGalleryValue("");
    setSelectedBy("");
    setBuyerProtectionFee("");
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

  const availablePaymentMethods = ["PayPal", "Mastercard", "Card", "Espece"];
  return (
    <>
      <Header />
      <Box padding="10px">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Lot Number"
          value={lotNumber}
          onChange={(e) => setLotNumber(e.target.value)}
          mb={4}
          required
        />
        <Input
          type="datetime-local"
          placeholder="Closing Time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          mb={4}
          required
        />
        {/* Category and Subcategory selection */}
        <Select
          placeholder="Select Category"
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
          placeholder="Select Subcategory"
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
          placeholder="Current Offer"
          type="number"
          value={currentOffer}
          onChange={(e) => setCurrentOffer(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Estimated Gallery Value"
          value={estimatedGalleryValue}
          onChange={(e) => setEstimatedGalleryValue(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Selected By"
          value={selectedBy}
          onChange={(e) => setSelectedBy(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Buyer Protection Fee"
          value={buyerProtectionFee}
          onChange={(e) => setBuyerProtectionFee(e.target.value)}
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
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Legal Information"
          value={legalInformation}
          onChange={(e) => setLegalInformation(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Weight"
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
          placeholder="Metal"
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
        {/* File upload */}
        <FormControl mb={4} required>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleFileChange} required />
          <FormHelperText>Upload an image for the item.</FormHelperText>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
          Create Item
        </Button>

        {/* Toast for displaying success or error messages */}
        {/* You can implement the toast here */}
        <ItemsList/>

      </Box>
    </>
  );
};

export default ItemsPage;

