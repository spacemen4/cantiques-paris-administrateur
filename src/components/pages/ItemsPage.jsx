import React, { useState, useEffect } from "react";
import {
  Box, Input, Select, Button, useToast, FormControl, FormLabel, FormHelperText,
} from "@chakra-ui/react";
import { supabase } from "../../../supabase";
import Header from "../Header";
import { v4 as uuidv4 } from 'uuid';

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
  const [shippingToFrance, setShippingToFrance] = useState("");
  const [shippingToPortugal, setShippingToPortugal] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [location, setLocation] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [sellerRatings, setSellerRatings] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [artistBiography, setArtistBiography] = useState("");
  const [artworkTechnique, setArtworkTechnique] = useState("");
  const [artworkSignature, setArtworkSignature] = useState("");
  const [artworkYear, setArtworkYear] = useState("");
  const [artworkCondition, setArtworkCondition] = useState("");
  const [artworkDimensions, setArtworkDimensions] = useState("");
  const [artworkOrigin, setArtworkOrigin] = useState("");
  const [artworkPeriod, setArtworkPeriod] = useState("");
  const [legalInformation, setLegalInformation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    try {
      const fileExtension = imageFile.name.split('.').pop();
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;
      const { data: fileData, error: fileError } = await supabase.storage.from("items-images").upload(`images/${uniqueFileName}`, imageFile);

      if (fileError) {
        throw fileError;
      }

      const imageUrl = `https://tzfuvfxjjcywdrgivqzq.supabase.co/storage/v1/object/public/items-images/images/${uniqueFileName}`;
      setImageUrl(imageUrl);
      return imageUrl;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const uploadedImageUrl = await uploadImage();
      // After successful image upload, continue with item creation
      createItem(uploadedImageUrl);
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
      const { data, error } = await supabase.from("items").insert({
        title,
        lot_number: lotNumber,
        closing_time: closingTime,
        current_offer: currentOffer,
        no_reserve_price: noReservePrice,
        estimated_gallery_value: estimatedGalleryValue,
        selected_by: selectedBy,
        buyer_protection_fee: buyerProtectionFee,
        payment_methods: paymentMethods,
        shipping_to_france: shippingToFrance,
        shipping_to_portugal: shippingToPortugal,
        seller_name: sellerName,
        location,
        member_since: memberSince,
        seller_ratings: sellerRatings,
        item_description: itemDescription,
        artist_biography: artistBiography,
        artwork_technique: artworkTechnique,
        artwork_signature: artworkSignature,
        artwork_year: artworkYear,
        artwork_condition: artworkCondition,
        artwork_dimensions: artworkDimensions,
        artwork_origin: artworkOrigin,
        artwork_period: artworkPeriod,
        legal_information: legalInformation,
        image_url: uploadedImageUrl, // Store the uploaded image URL in the database
        category_id: selectedCategory,
        subcategory_id: selectedSubcategory,
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
    setShippingToFrance("");
    setShippingToPortugal("");
    setSellerName("");
    setLocation("");
    setMemberSince("");
    setSellerRatings("");
    setItemDescription("");
    setArtistBiography("");
    setArtworkTechnique("");
    setArtworkSignature("");
    setArtworkYear("");
    setArtworkCondition("");
    setArtworkDimensions("");
    setArtworkOrigin("");
    setArtworkPeriod("");
    setLegalInformation("");
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  return (
    <>
      <Header />
      <Box>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Lot Number"
          value={lotNumber}
          onChange={(e) => setLotNumber(e.target.value)}
          mb={4}
        />
        <Input
          type="datetime-local"
          placeholder="Closing Time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          mb={4}
        />
        {/* Add other input fields for item details */}

        {/* Category and Subcategory selection */}
        <Select
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            fetchSubcategories(e.target.value);
          }}
          mb={4}
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
        >
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </Select>

        {/* File upload */}
        <FormControl mb={4}>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleFileChange} />
          <FormHelperText>Upload an image for the item.</FormHelperText>
        </FormControl>

        {/* Button to submit the form */}
        <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
          Create Item
        </Button>

{/* Toast for displaying success or error messages */}
        {/* You can implement the toast here */}
  
      </Box>
    </>
  );
};

export default ItemsPage;
