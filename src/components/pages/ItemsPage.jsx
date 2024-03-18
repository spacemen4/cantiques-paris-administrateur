import React, { useState, useEffect } from "react";
import {
  Box, Input, Select, Button, useToast, FormControl, FormLabel, FormHelperText, Checkbox, CheckboxGroup, Heading,
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
  const [itemDescription, setItemDescription] = useState("");
  const [artistBiography, setArtistBiography] = useState("");
  const [artworkTechnique, setArtworkTechnique] = useState("");
  const [artworkSignature, setArtworkSignature] = useState("");
  const [artworkYear, setArtworkYear] = useState("");
  const [artworkCondition, setArtworkCondition] = useState("");
  const [artworkDimensions, setArtworkDimensions] = useState("");
  const [artworkOrigin, setArtworkOrigin] = useState("");
  const [artworkPeriod, setArtworkPeriod] = useState("");
  const [sellerRatings, setSellerRatings] = useState(null);
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
      const sellerRatingsValue = sellerRatings !== "" ? parseInt(sellerRatings) : null;

      const { data, error } = await supabase.from("items").insert({
        id: itemId,
        title: title,
        lot_number: lotNumber,
        closing_time: closingTime,
        current_offer: currentOfferValue,
        no_reserve_price: noReservePrice,
        estimated_gallery_value: estimatedGalleryValue,
        selected_by: selectedBy,
        buyer_protection_fee: buyerProtectionFee,
        payment_methods: paymentMethods,
        shipping_to_france: shippingToFrance,
        shipping_to_portugal: shippingToPortugal,
        seller_name: sellerName,
        location: location,
        member_since: memberSince,
        seller_ratings: sellerRatingsValue,
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
        image_url: uploadedImageUrl,
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

  const availablePaymentMethods = ["PayPal", "Mastercard", "Card", "Espece"];
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
        <Select
          placeholder="No Reserve Price"
          value={noReservePrice}
          onChange={(e) => setNoReservePrice(e.target.value)}
          mb={4}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Select>
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

       

        <Input
          placeholder="Current Offer"
          type="number"
          value={currentOffer}
          onChange={(e) => setCurrentOffer(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Estimated Gallery Value"
          value={estimatedGalleryValue}
          onChange={(e) => setEstimatedGalleryValue(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Selected By"
          value={selectedBy}
          onChange={(e) => setSelectedBy(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Buyer Protection Fee"
          value={buyerProtectionFee}
          onChange={(e) => setBuyerProtectionFee(e.target.value)}
          mb={4}
        />
        <Heading>Méthode de paiement</Heading>
<CheckboxGroup value={paymentMethods} onChange={setPaymentMethods}>
  {availablePaymentMethods.map((method) => (
    <Checkbox key={method} value={method}>
      {method}
    </Checkbox>
  ))}
</CheckboxGroup>
        <Input
          placeholder="Shipping to France"
          value={shippingToFrance}
          onChange={(e) => setShippingToFrance(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Shipping to Portugal"
          value={shippingToPortugal}
          onChange={(e) => setShippingToPortugal(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Seller Name"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          mb={4}
        />
        <Input
          type="date"
          placeholder="Member Since"
          value={memberSince}
          onChange={(e) => setMemberSince(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Seller Ratings"
          type="number"
          value={sellerRatings}
          onChange={(e) => setSellerRatings(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Artist Biography"
          value={artistBiography}
          onChange={(e) => setArtistBiography(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Artwork Technique"
          value={artworkTechnique}
          onChange={(e) => setArtworkTechnique(e.target.value)}
          mb={4}
        />
<Input
  placeholder="Artwork Signature"
  value={artworkSignature}
  onChange={(e) => setArtworkSignature(e.target.value)}
  mb={4}
/>
<Input
  type="number"
  placeholder="Artwork Year"
  value={artworkYear}
  onChange={(e) => setArtworkYear(e.target.value)}
  mb={4}
/>
        <Input
          placeholder="Artwork Condition"
          value={artworkCondition}
          onChange={(e) => setArtworkCondition(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Artwork Dimensions"
          value={artworkDimensions}
          onChange={(e) => setArtworkDimensions(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Artwork Origin"
          value={artworkOrigin}
          onChange={(e) => setArtworkOrigin(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Artwork Period"
          value={artworkPeriod}
          onChange={(e) => setArtworkPeriod(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Legal Information"
          value={legalInformation}
          onChange={(e) => setLegalInformation(e.target.value)}
          mb={4}
        />
         {/* File upload */}
         <FormControl mb={4}>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleFileChange} />
          <FormHelperText>Upload an image for the item.</FormHelperText>
        </FormControl>
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
