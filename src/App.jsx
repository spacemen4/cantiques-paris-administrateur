import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import ArtChoices from "./components/ArtChoices";
import CollectionCard from "./components/CollectionCard";
import ItemForSale from "./components/ItemForSale";
import HeaderTop from "./components/HeaderTop";
import FooterComponent from "./components/FooterComponent";
import FooterBottom from "./components/FooterBottom";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <HeaderTop/>
        <Header />
        <ArtChoices/>
        <CollectionCard/>
        <ItemForSale/>
        <FooterComponent/>
        <FooterBottom/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
