import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import { ThemeSupa } from "@supabase/auth-ui-shared";
import CategoriesPage from "./components/pages/CategoriesPage";
import SubcategoriesPage from "./components/pages/SubcategoriesPage";
import ItemsPage from "./components/pages/ItemsPage";
import AddColumnForm from "./components/pages/AddColumnForm"; // Import AddColumnForm component
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from "./../supabase"; // Adjust the path as needed

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });

    // No need to unsubscribe if the function is not provided
  }, []);

  if (!session) {
    // Render authentication UI if no session
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Authentication UI */}
      </div>
    );
  }

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/subcategories" element={<SubcategoriesPage />} />
          <Route path="/items" element={<ItemsPage />} />
          {/* Route for AddColumnForm component */}
          <Route path="/add-column" element={<AddColumnForm />} />
          {/* Default route */}
          <Route path="*" element={<CategoriesPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
