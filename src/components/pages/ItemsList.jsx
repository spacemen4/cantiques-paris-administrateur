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
          {/* Add other item details you want to display */}
        </Box>
      ))}
    </Box>
  );
};

export default ItemsList;
