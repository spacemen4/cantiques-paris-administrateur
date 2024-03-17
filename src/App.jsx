import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, Heading } from "@chakra-ui/react"; // Import Heading from Chakra UI
import Header from "./components/Header";
import CategoriesPage from "./components/pages/CategoriesPage";
import SubcategoriesPage from "./components/pages/SubcategoriesPage";
import ItemsPage from "./components/pages/ItemsPage";
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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: "80%" }}>


          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                label: {
                  fontWeight: "bold",
                  fontSize: "30px",
                  textAlign: "center",
                },
                button: { fontWeight: "bold", fontSize: "20px" },
                input: { fontWeight: "bold", fontSize: "20px" },
                // other styles
              },
            }}
            providers={[""]}

          />
        </div>
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
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
