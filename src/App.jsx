import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import CategoriesPage from "./components/pages/CategoriesPage";
import SubcategoriesPage from "./components/pages/SubcategoriesPage";
import ItemsPage from "./components/pages/ItemsPage";
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from "./../supabase"; // Adjust the path as needed

const ProtectedRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Supabase auth object:', supabase.auth);
    const session = supabase.auth.session();
  
    setLoggedIn(!!session);
  
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
  
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  

  if (!loggedIn) {
    // User not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  // User is logged in, allow access to the route
  return children;
};

const App = () => {
  return (
    <ChakraProvider>
      <Router>
      <Header />
        <Routes>

          <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
          <Route path="/subcategories" element={<ProtectedRoute><SubcategoriesPage /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><ItemsPage /></ProtectedRoute>} />
          <Route path="/" element={<Auth supabaseClient={supabase} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
