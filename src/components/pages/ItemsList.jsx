import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { Box, Text } from "@chakra-ui/react";

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data: itemsData, error } = await supabase.from("items").select("*");
      if (error) {
        throw error;
      }
      setItems(itemsData || []);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  return (
    <Box>
      {items.map((item) => (
        <Box key={item.id} border="1px solid" p={4} mb={4}>
          <Text>Title: {item.title}</Text>
          <Text>Lot Number: {item.lot_number}</Text>
          <Text>Closing Time: {item.closing_time}</Text>
          <Text>Current Offer: {item.current_offer}</Text>
          <Text>No Reserve Price: {item.no_reserve_price ? "Yes" : "No"}</Text>
          <Text>Estimated Gallery Value: {item.estimated_gallery_value}</Text>
          <Text>Selected By: {item.selected_by}</Text>
          <Text>Buyer Protection Fee: {item.buyer_protection_fee}</Text>
          <Text>Payment Methods: {item.payment_methods.join(", ")}</Text>
          <Text>Shipping to France: {item.shipping_to_france}</Text>
          <Text>Shipping to Portugal: {item.shipping_to_portugal}</Text>
          <Text>Seller Name: {item.seller_name}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Member Since: {item.member_since}</Text>
          <Text>Seller Ratings: {item.seller_ratings}</Text>
          <Text>Item Description: {item.item_description}</Text>
          <Text>Artist Biography: {item.artist_biography}</Text>
          <Text>Artwork Technique: {item.artwork_technique}</Text>
          <Text>Artwork Signature: {item.artwork_signature}</Text>
          <Text>Artwork Year: {item.artwork_year}</Text>
          <Text>Artwork Condition: {item.artwork_condition}</Text>
          <Text>Artwork Dimensions: {item.artwork_dimensions}</Text>
          <Text>Artwork Origin: {item.artwork_origin}</Text>
          <Text>Artwork Period: {item.artwork_period}</Text>
          <Text>Legal Information: {item.legal_information}</Text>
          {/* Add other item details here */}
        </Box>
      ))}
    </Box>
  );
};

export default ItemsList;
