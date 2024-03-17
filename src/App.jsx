import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirection
import { ChakraProvider, Heading } from "@chakra-ui/react";
import HeaderTop from "./components/HeaderTop";
import Header from "./components/Header";
import ArtChoices from "./components/pages/ArtChoices";
import IntérieurPage from "./components/pages/IntérieurPage";
import BijouxPage from "./components/pages/BijouxPage";
import ItemForSale from "./components/ItemForSale";
import FooterComponent from "./components/FooterComponent";
import FooterBottom from "./components/FooterBottom";
import CollectionPreview from "./components/CollectionPreview";
import CollectionPreviewStyled from "./components/CollectionPreviewStyled";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <HeaderTop />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/art" />} /> {/* Redirect root to /art */}
          <Route path="/art" element={<ArtChoices />} />
          <Route path="/interieur" element={<IntérieurPage />} />
          <Route path="/bijoux" element={<BijouxPage />} />
        </Routes>
        <Heading>Collections populaires</Heading>
        <CollectionPreview/>
        <CollectionPreviewStyled/>
        <ItemForSale />
        <FooterComponent />
        <FooterBottom />
      </Router>
    </ChakraProvider>
  );
};

export default App;
