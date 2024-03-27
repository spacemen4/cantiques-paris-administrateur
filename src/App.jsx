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
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse e-mail',
                  password_label: 'Votre mot de passe',
                  email_input_placeholder: 'Votre adresse e-mail',
                  password_input_placeholder: 'Votre mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion en cours...',
                  social_provider_text: "🚀 S'inscrire au panneau administrateur de Cantiques Paris",
                  link_text: 'Vous avez déjà un compte? Connectez-vous',
                },
                sign_up: {
                  email_label: 'Adresse e-mail',
                  password_label: 'Créer un mot de passe',
                  email_input_placeholder: 'Votre adresse e-mail',
                  password_input_placeholder: 'Votre mot de passe',
                  button_label: 'S\'inscrire',
                  loading_button_label: 'Inscription en cours...',
                  link_text: 'Vous n\'avez pas de compte? Inscrivez-vous',
                },
                magic_link: {
                  email_input_placeholder: 'Votre adresse e-mail',
                  button_label: 'Envoyer un e-mail avec un lien magique',
                  loading_button_label: 'Envoi du lien magique en cours...',
                  link_text: 'Envoyer un e-mail avec un lien magique',
                  confirmation_text: 'Consultez votre e-mail pour le lien magique',
                },
                forgotten_password: {
                  email_label: 'Adresse e-mail',
                  password_label: 'Votre mot de passe',
                  email_input_placeholder: 'Votre adresse e-mail',
                  button_label: 'Envoyer des instructions de réinitialisation de mot de passe',
                  loading_button_label: 'Envoi des instructions de réinitialisation...',
                  link_text: 'Mot de passe oublié?',
                  confirmation_text: 'Consultez votre e-mail pour le lien de réinitialisation de mot de passe',
                },
                update_password: {
                  password_label: 'Nouveau mot de passe',
                  password_input_placeholder: 'Votre nouveau mot de passe',
                  button_label: 'Mettre à jour le mot de passe',
                  loading_button_label: 'Mise à jour du mot de passe...',
                  confirmation_text: 'Votre mot de passe a été mis à jour',
                },
                verify_otp: {
                  email_input_placeholder: 'Votre adresse e-mail',
                  phone_input_label: 'Numéro de téléphone',
                  phone_input_placeholder: 'Votre numéro de téléphone',
                  token_input_label: 'Jeton',
                  token_input_placeholder: 'Votre jeton OTP',
                  button_label: 'Vérifier le jeton',
                  loading_button_label: "Vérification du jeton...",
                },
              },
            }}
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
