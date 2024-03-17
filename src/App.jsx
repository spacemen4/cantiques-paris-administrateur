import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
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
          <Heading textAlign="center" fontWeight="bold">
            <Icon as={CiMedicalCross} color="red" boxSize="32px" /> Mon Super
            PAD <Icon as={FcLockPortrait} color="red" boxSize="32px" />
          </Heading>

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
                  email_label: "Votre adresse mail",
                  password_label: "Un mot de passe à au moins 8 caractères",
                  email_input_placeholder: "Votre adresse mail",
                  password_input_placeholder: "Votre mot de passe",
                  button_label: "Connectez-vous",
                  loading_button_label: "S'inscrire ...",
                  social_provider_text: "",
                  link_text: "Vous avez déjà un compte ? Connectez-vous",
                },
                sign_up: {
                  email_label: "Votre adresse mail",
                  password_label: "Un mot de passe à au moins 8 caractères",
                  email_input_placeholder: "Votre adresse mail",
                  password_input_placeholder: "Votre mot de passe",
                  button_label: "Créez un compte",
                  loading_button_label: "S'inscrire ...",
                  social_provider_text: "Créez votre compte",
                  link_text: "Vous n'avez pas de compte ? S'inscrire",
                  confirmation_text:
                    "Vérifiez votre e-mail pour le lien de confirmation",
                },
                magic_link: {
                  email_label: "Votre adresse mail",
                  email_input_placeholder: "Votre adresse mail",
                  button_label: "Envoi d'un lien magique",
                  loading_button_label: "Envoi d'un lien magique ...",
                  link_text: "Vous n'avez pas de compte ? S'inscrire",
                  confirmation_text:
                    "Vérifiez votre e-mail pour le lien magique",
                },
                forgotten_password: {
                  email_label: "Votre adresse mail",
                  password_label: "Un mot de passe à au moins 8 caractères",
                  email_input_placeholder: "Votre adresse mail",
                  password_input_placeholder: "Votre mot de passe",
                  button_label: "Envoi d'un nouveau mot de passe",
                  loading_button_label:
                    "Envoi en cours des instructions pour un nouveau mot de passe...",
                  link_text: "Vous avez oublié votre mot de passe ?",
                  confirmation_text:
                    "Vérifiez votre e-mail pour le lien de confirmation d'un nouveau mot de passe",
                },
                update_password: {
                  password_label: "Nouveau mot de passe",
                  password_input_placeholder: "Votre nouveau mot de passe",
                  button_label: "Mettre à jour votre mot de passe",
                  loading_button_label: "Mise à jour de votre mot de passe ...",
                  confirmation_text: "Votre mot de passe a été mis à jour",
                },
                verify_otp: {
                  email_input_label: "Adresse Email",
                  email_input_placeholder: "Votre adresse mail",
                  phone_input_label: "Numéro de téléphone",
                  phone_input_placeholder: "Votre numéro de téléphone",
                  token_input_label: "Votre jeton",
                  token_input_placeholder: "Votre jeton OTP",
                  button_label: "Verifiez votre jeton",
                  loading_button_label: "Entrain de s'inscrire ...",
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
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App; // Make sure to export the App component
