import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { Box, Image, Button, Badge, useToast } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const toast = useToast();

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

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("items").delete().eq('id', id);
      if (error) {
        throw error;
      }
      // Remove the deleted item from the state
      setItems(items.filter(item => item.id !== id));
      toast({
        title: "Item deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting item:", error.message);
      toast({
        title: "Error",
        description: "Failed to delete item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      {items.map((item) => (
        <Box key={item.id} border="1px solid" p={4} mb={4}>
          <Box display="flex" alignItems="center" mb={4}>
            <Image src={item.image_url} alt={`Image for ${item.title}`} width="100px" height="100px" objectFit="cover" mr={4} />
            <Box>
              <Badge colorScheme="blue" mb={2}>Title: {item.title}</Badge>
              <Badge colorScheme="green" mb={2}>Lot Number: {item.lot_number}</Badge>
              <Badge colorScheme="purple" mb={2}>Closing Time: {item.closing_time}</Badge>
              <Badge colorScheme="pink" mb={2}>Current Offer: {item.current_offer}</Badge>
              <Badge colorScheme="yellow" mb={2}>No Reserve Price: {item.no_reserve_price ? "Yes" : "No"}</Badge>
              <Badge colorScheme="cyan" mb={2}>Estimated Gallery Value: {item.estimated_gallery_value}</Badge>
              <Badge colorScheme="orange" mb={2}>Selected By: {item.selected_by}</Badge>
              <Badge colorScheme="teal" mb={2}>Buyer Protection Fee: {item.buyer_protection_fee}</Badge>
              <Badge colorScheme="red" mb={2}>Payment Methods: {item.payment_methods.join(", ")}</Badge>
              <Badge colorScheme="gray" mb={2}>Shipping to France: {item.shipping_to_france}</Badge>
              <Badge colorScheme="indigo" mb={2}>Shipping to Portugal: {item.shipping_to_portugal}</Badge>
              <Badge colorScheme="cyan" mb={2}>Seller Name: {item.seller_name}</Badge>
              <Badge colorScheme="teal" mb={2}>Location: {item.location}</Badge>
              <Badge colorScheme="yellow" mb={2}>Member Since: {item.member_since}</Badge>
              <Badge colorScheme="green" mb={2}>Seller Ratings: {item.seller_ratings}</Badge>
              <Badge colorScheme="blue" mb={2}>Item Description: {item.item_description}</Badge>
              <Badge colorScheme="purple" mb={2}>Artist Biography: {item.artist_biography}</Badge>
              <Badge colorScheme="pink" mb={2}>Artwork Technique: {item.artwork_technique}</Badge>
              <Badge colorScheme="gray" mb={2}>Artwork Signature: {item.artwork_signature}</Badge>
              <Badge colorScheme="indigo" mb={2}>Artwork Year: {item.artwork_year}</Badge>
              <Badge colorScheme="cyan" mb={2}>Artwork Condition: {item.artwork_condition}</Badge>
              <Badge colorScheme="teal" mb={2}>Artwork Dimensions: {item.artwork_dimensions}</Badge>
              <Badge colorScheme="yellow" mb={2}>Artwork Origin: {item.artwork_origin}</Badge>
              <Badge colorScheme="green" mb={2}>Artwork Period: {item.artwork_period}</Badge>
              <Badge colorScheme="blue" mb={2}>Legal Information: {item.legal_information}</Badge>
              {/* Add other item details here */}
            </Box>
          </Box>
          <Button colorScheme="red" onClick={() => handleDelete(item.id)}>
            <MdDeleteForever /> Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ItemsList;
