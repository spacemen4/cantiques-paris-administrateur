import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HeaderTop from "./components/HeaderTop";
import Header from "./components/Header";
import ArtChoices from "./components/pages/ArtChoices";
import IntérieurPage from "./components/pages/IntérieurPage"; // Import the IntérieurPage component
import BijouxPage from "./components/pages/BijouxPage"; // Import the BijouxPage component
import CollectionCard from "./components/CollectionCard";
import ItemForSale from "./components/ItemForSale";
import FooterComponent from "./components/FooterComponent";
import FooterBottom from "./components/FooterBottom";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <HeaderTop />
        <Header />
        <Routes>
          <Route path="/art" element={<ArtChoices />} />
          <Route path="/intérieur" element={<IntérieurPage />} /> {/* Route for Intérieur page */}
          <Route path="/bijoux" element={<BijouxPage />} /> {/* Route for Bijoux page */}
        </Routes>
        <CollectionCard />
        <ItemForSale />
        <FooterComponent />
        <FooterBottom />
      </Router>
    </ChakraProvider>
  );
};

export default App;
