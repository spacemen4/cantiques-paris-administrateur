import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { supabase } from "../../../supabase";
import Header from "../Header";

const AddColumnForm = () => {
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState("");
  const toast = useToast();

  const handleAddColumn = async () => {
    try {
      // Perform validation of input values if necessary

      // Make the database alteration
      const { error } = await supabase.from("items").alter({
        addColumn: { [columnName]: columnType },
      });

      if (error) {
        throw error;
      }

      // Display success message
      toast({
        title: "Column Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form fields
      setColumnName("");
      setColumnType("");
    } catch (error) {
      console.error("Error adding column:", error.message);
      toast({
        title: "Error",
        description: "Failed to add column",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Box padding="10px">
        <FormControl mb={4}>
          <FormLabel>Column Name</FormLabel>
          <Input
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="Enter column name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Column Type</FormLabel>
          <Input
            value={columnType}
            onChange={(e) => setColumnType(e.target.value)}
            placeholder="Enter column type"
          />
          <FormHelperText>
            Please enter the data type for the new column (e.g., text, integer, boolean).
          </FormHelperText>
        </FormControl>
        <Button colorScheme="blue" onClick={handleAddColumn} mb={4}>
          Add Column
        </Button>
      </Box>
    </>
  );
};

export default AddColumnForm;
