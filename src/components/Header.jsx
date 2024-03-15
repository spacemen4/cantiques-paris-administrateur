import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const Header = () => {
  return (
    <Flex as="header" width="100%" align="center" justify="center" p="4">
      {/* Inner Flex container to group buttons and apply defined spacing */}
      <Flex gap="2" align="center"> {/* Adjust the gap value as needed for your design */}
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/buy">
          <Button variant="ghost">Buy</Button>
        </Link>
        <Link to="/sell">
          <Button variant="ghost">Sell</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
