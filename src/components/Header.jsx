import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <Flex as="header" width="100%" align="center" justify="center" p="4">
      <Flex gap="2" align="center">
        <Button variant="ghost" colorScheme="pink" onClick={() => handleButtonClick("/categories")}>
          Catégories
        </Button>
        <Button variant="ghost" colorScheme="blue" onClick={() => handleButtonClick("/subcategories")}>
          SubCatégories
        </Button>
        <Button variant="ghost" colorScheme="purple" onClick={() => handleButtonClick("/items")}>
          Items
        </Button>
        {/* Add button for AddColumnForm */}
        <Button variant="ghost" colorScheme="green" onClick={() => handleButtonClick("/add-column")}>
          Add Column
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
