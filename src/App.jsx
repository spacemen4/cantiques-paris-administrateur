import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider, Alert, AlertIcon } from "@chakra-ui/react";
import Header from "./components/Header";
import CategoriesPage from "./components/pages/CategoriesPage";
import SubcategoriesPage from "./components/pages/SubcategoriesPage";
import ItemsPage from "./components/pages/ItemsPage";
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from "./../supabase"; // Adjust the path as needed

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user || null);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading indicator while checking the authentication status
  }

  if (!user) {
    console.log('No user, redirecting...');
    return <Navigate to="/" />;
  }

  console.log('User found, displaying children...');
  return (
    <>
      <Header />
      <Alert status="success">
        <AlertIcon />
        You are logged in!
      </Alert>
      {children}
    </>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
          <Route path="/subcategories" element={<ProtectedRoute><SubcategoriesPage /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><ItemsPage /></ProtectedRoute>} />
          <Route path="/" element={<Auth supabaseClient={supabase} />} />
          <Route path="*" element={<Navigate to="/categories" />} /> {/* Redirect to categories by default */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
