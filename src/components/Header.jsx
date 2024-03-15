// Header.js

import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const Header = () => {
  return (
    <Flex as="header" align="center" justify="space-between" p="4">
      <Link to="/"> {/* Assuming you have defined routes for Home, Buy, and Sell */}
        <Button variant="ghost">Home</Button>
      </Link>
      <Link to="/buy">
        <Button variant="ghost">Buy</Button>
      </Link>
      <Link to="/sell">
        <Button variant="ghost">Sell</Button>
      </Link>
    </Flex>
  );
};

export default Header;
