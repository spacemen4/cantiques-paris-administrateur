// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import CategoriesPage from "./components/pages/CategoriesPage";
import SubcategoriesPage from "./components/pages/SubcategoriesPage";
import ItemsPage from "./components/pages/ItemsPage";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/categories" />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/subcategories" element={<SubcategoriesPage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
