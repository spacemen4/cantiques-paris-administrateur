import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleButtonClick = (route) => {
    history.push(route);
  };

  return (
    <Flex as="header" width="100%" align="center" justify="center" p="4">
      <Flex gap="2" align="center">
        <Button variant="ghost" colorScheme="pink" onClick={() => handleButtonClick("/art")}>
          Art
        </Button>
        <Button variant="ghost" colorScheme="blue" onClick={() => handleButtonClick("/interieur")}>
          Intérieur
        </Button>
        <Button variant="ghost" colorScheme="purple" onClick={() => handleButtonClick("/bijoux")}>
          Bijoux
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
