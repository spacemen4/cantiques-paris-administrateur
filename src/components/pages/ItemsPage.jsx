// ItemsPage.js
import React, { useState, useEffect } from "react";
import { Box, Input, Textarea, Select, Button, useToast } from "@chakra-ui/react";
import { supabase } from "../../../supabase"; // Import the Supabase client instance

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
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch categories from the 'categories' table
      const { data: categoriesData, error: categoriesError } = await supabase.from("categories").select("*");
      if (categoriesError) {
        throw categoriesError;
      }
      // Update the state with fetched categories
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      // Fetch subcategories for the selected category from the 'subcategories' table
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", categoryId);
      if (subcategoriesError) {
        throw subcategoriesError;
      }
      // Update the state with fetched subcategories
      setSubcategories(subcategoriesData || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      // Send a POST request to create a new item in the 'items' table
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
        category_id: selectedCategory,
        subcategory_id: selectedSubcategory,
      });
      if (error) {
        throw error;
      }
      // Display a success message
      toast({
        title: "Item created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Clear the input fields
      clearFormFields();
    } catch (error) {
      // Display an error message if the request fails
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
    <Box>
      {/* Input fields for item details */}
      {/* Handle category and subcategory selection */}
      {/* Button to submit the form */}
      {/* Toast for displaying success or error messages */}
    </Box>
  );
};

export default ItemsPage;
