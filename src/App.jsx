import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
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
  const handleUserSignedIn = () => {
    // Redirect the user to the protected route after successful login
    return <Navigate to="/categories" />;
  };

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/subcategories" element={<SubcategoriesPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route
            path="/"
            element={
              <Auth
                supabaseClient={supabase}
                onUserSignedIn={handleUserSignedIn} // Handle redirection after successful login
                redirectTo="/categories" // Redirect to categories page after login if no path is specified
              />
            }
          />
          <Route path="*" element={<Navigate to="/categories" />} /> {/* Redirect to categories by default */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
