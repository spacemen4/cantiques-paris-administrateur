import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex as="header" width="100%" align="center" justify="center" p="4">
      <Flex gap="2" align="center">
        <Link to="/art">
          {/* Assuming "Art" might be vibrant and expressive */}
          <Button variant="ghost" colorScheme="pink">Art</Button>
        </Link>
        <Link to="/interieur">
          {/* "Intérieur" could be associated with calmness and comfort */}
          <Button variant="ghost" colorScheme="blue">Intérieur</Button>
        </Link>
        <Link to="/bijoux">
          {/* "Bijoux" suggests luxury and refinement */}
          <Button variant="ghost" colorScheme="purple">Bijoux</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
