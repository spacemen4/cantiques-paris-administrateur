import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import CategoriesPage from "./components/pages/CategoriesPage";
import SubcategoriesPage from "./components/pages/SubcategoriesPage";
import ItemsPage from "./components/pages/ItemsPage";

// Import the necessary components and theme
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
 

// Create a Supabase client instance
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_PUBLIC_KEY');

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          {/* Protected routes */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/subcategories" element={<SubcategoriesPage />} />
          <Route path="/items" element={<ItemsPage />} />

          {/* Auth routes */}
          <Route path="/auth/*" element={<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />} />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/categories" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
