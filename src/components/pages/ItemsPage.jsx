import React, { useState, useEffect } from "react";
import {
  Box, Input, Select, Button, useToast, FormControl, FormLabel, FormHelperText, Checkbox, CheckboxGroup, Heading,
} from "@chakra-ui/react";
import { supabase } from "../../../supabase";
import Header from "../Header";
import { v4 as uuidv4 } from 'uuid';
import ItemsList from "./ItemsList";

const ItemsPage = () => {
  const [title, setTitle] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [currentOffer, setCurrentOffer] = useState("");

  const [estimatedGalleryValue, setEstimatedGalleryValue] = useState("");
  const [selectedBy, setSelectedBy] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [legalInformation, setLegalInformation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // Nouvel état pour le fichier image
  const [imageUrl, setImageUrl] = useState(""); // Nouvel état pour l'URL de l'image
  const [brand, setBrand] = useState(""); // Nouvel état pour la marque
  const [weight, setWeight] = useState(""); // Nouvel état pour le poids
  const [dimensions, setDimensions] = useState(""); // Nouvel état pour les dimensions
  const [pierre, setPierre] = useState(""); // Nouvel état pour la pierre
  const [metal, setMetal] = useState(""); // Nouvel état pour le métal
  const [genre, setGenre] = useState(""); // Nouvel état pour le genre
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase.from("categories").select("*");
      if (categoriesError) {
        throw categoriesError;
      }
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error.message);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", categoryId); // Filtrer les sous-catégories par l'ID de catégorie sélectionné
      if (subcategoriesError) {
        throw subcategoriesError;
      }
      setSubcategories(subcategoriesData || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des sous-catégories :", error.message);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    const uniqueFileName = `${uuidv4()}`;
    const { data: fileData, error: fileError } = await supabase.storage
      .from("items-images")
      .upload(`images/${uniqueFileName}`, imageFile);

    if (fileError) {
      throw fileError;
    }

    // Construire l'URL directement
    const imageUrl = `https://tzfuvfxjjcywdrgivqzq.supabase.co/storage/v1/object/public/items-images/images/${uniqueFileName}`;
    setImageUrl(imageUrl); // Définir l'état imageUrl ici
    return imageUrl;
  };


  const handleSubmit = async () => {
    try {
      const uploadedImageUrl = await uploadImage();
      // Après le téléchargement réussi de l'image, continuer avec la création de l'article
      createItem(uploadedImageUrl); // Passer uploadedImageUrl à createItem
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error.message);
      toast({
        title: "Erreur",
        description: "Échec du téléchargement de l'image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const createItem = async (uploadedImageUrl) => {
    try {
      const itemId = uuidv4();
      const currentOfferValue = currentOffer !== "" ? parseInt(currentOffer) : null;

      const { data, error } = await supabase.from("items").insert({
        id: itemId,
        title: title,
        lot_number: lotNumber,
        closing_time: closingTime,
        current_offer: currentOfferValue,

        estimated_gallery_value: estimatedGalleryValue,
        selected_by: selectedBy,

        payment_methods: paymentMethods,
        item_description: itemDescription,
        legal_information: legalInformation,
        category_id: selectedCategory,
        subcategory_id: selectedSubcategory,
        image_url: uploadedImageUrl,
        brand: brand,
        weight: weight,
        dimensions: dimensions,
        pierre: pierre,
        metal: metal,
        genre: genre,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Article créé",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Effacer les champs du formulaire et réinitialiser l'état de l'image
      clearFormFields();
      setImageUrl("");
    } catch (error) {
      console.error("Erreur lors de la création de l'article :", error.message);
      console.log("Détails de l'erreur :", error.details); // Journaliser les détails de l'erreur dans la console
      toast({
        title: "Erreur",
        description: "Échec de la création de l'article",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const clearFormFields = () => {
    setTitle("");
    setLotNumber("");
    setClosingTime("");
    setCurrentOffer("");

    setEstimatedGalleryValue("");
    setSelectedBy("");
    setPaymentMethods([]);
    setItemDescription("");
    setLegalInformation("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setBrand("");
    setWeight("");
    setDimensions("");
    setPierre("");
    setMetal("");
    setGenre("");
  };

  const availablePaymentMethods = ["PayPal", "Mastercard", "Carte", "Espèce"];
  return (
    <>
      <Header />
      <Box padding="10px">
        <Input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Numéro de lot"
          value={lotNumber}
          onChange={(e) => setLotNumber(e.target.value)}
          mb={4}
          required
        />
        <Input
          type="datetime-local"
          placeholder="Heure de clôture"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          mb={4}
          required
        />
        {/* Sélection de la catégorie et de la sous-catégorie */}
        <Select
          placeholder="Sélectionner une catégorie"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            fetchSubcategories(e.target.value);
          }}
          mb={4}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Sélectionner une sous-catégorie"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          mb={4}
          required
        >
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </Select>



        <Input
          placeholder="Offre actuelle"
          type="number"
          value={currentOffer}
          onChange={(e) => setCurrentOffer(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Valeur estimée en galerie"
          value={estimatedGalleryValue}
          onChange={(e) => setEstimatedGalleryValue(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Sélectionné par"
          value={selectedBy}
          onChange={(e) => setSelectedBy(e.target.value)}
          mb={4}
          required
        />
        <Heading>Méthode de paiement</Heading>
        <CheckboxGroup value={paymentMethods} onChange={setPaymentMethods} mb={4} required>
          {availablePaymentMethods.map((method) => (
            <Checkbox key={method} value={method}>
              {method}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Input
          placeholder="Description de l'article"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Informations légales"
          value={legalInformation}
          onChange={(e) => setLegalInformation(e.target.value)}
          mb={4}
          required
        />
        <Select
          placeholder="Sélectionner la marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          mb={4}
        >
          <option value="Cartier">Cartier</option>
          <option value="Tiffany & Co.">Tiffany & Co.</option>
          <option value="Bvlgari">Bvlgari</option>
          <option value="Chopard">Chopard</option>
          <option value="Harry Winston">Harry Winston</option>
          <option value="Van Cleef & Arpels">Van Cleef & Arpels</option>
          <option value="Piaget">Piaget</option>
          <option value="Graff">Graff</option>
          <option value="David Yurman">David Yurman</option>
          <option value="Mikimoto">Mikimoto</option>
          <option value="Boucheron">Boucheron</option>
          <option value="Messika">Messika</option>
          <option value="De Beers">De Beers</option>
          <option value="Chaumet">Chaumet</option>
          <option value="Pomellato">Pomellato</option>
          <option value="Piaget">Piaget</option>
          <option value="Gucci">Gucci</option>
          <option value="Damiani">Damiani</option>
          {/* Ajoutez d'autres marques ici selon vos besoins */}
        </Select>
        <Input
          placeholder="Poids"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          mb={4}
        />
        <Input
          placeholder="Dimensions"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          mb={4}
        />
        <Select
          placeholder="Sélectionner la pierre"
          value={pierre}
          onChange={(e) => setPierre(e.target.value)}
          mb={4}
        >
          <option value="Diamant">Diamant</option>
          <option value="Émeraude">Émeraude</option>
          <option value="Rubis">Rubis</option>
          <option value="Saphir">Saphir</option>
          <option value="Opale">Opale</option>
          <option value="Topaze">Topaze</option>
          <option value="Améthyste">Améthyste</option>
          <option value="Turquoise">Turquoise</option>
          <option value="Perle">Perle</option>
          <option value="Citrine">Citrine</option>
          <option value="Aigue-marine">Aigue-marine</option>
          <option value="Quartz rose">Quartz rose</option>
          <option value="Onyx">Onyx</option>
          <option value="Jade">Jade</option>
          <option value="Lapis-lazuli">Lapis-lazuli</option>
          <option value="Agate">Agate</option>
          <option value="Cornaline">Cornaline</option>
          {/* Ajoutez d'autres pierres ici selon vos besoins */}
        </Select>
        <Select
          placeholder="Sélectionner le métal"
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
          mb={4}
          required
        >
          <option value="Or">Or</option>
          <option value="Argent">Argent</option>
          <option value="Bronze">Bronze</option>
          <option value="Cuivre">Cuivre</option>
          <option value="Platine">Platine</option>
          <option value="Fer">Fer</option>
          <option value="Aluminium">Aluminium</option>
          <option value="Acier">Acier</option>
          <option value="Titane">Titane</option>
          <option value="Zinc">Zinc</option>
          <option value="Nickel">Nickel</option>
          {/* Ajoutez d'autres métaux ici selon vos besoins */}
        </Select>

        <Select
          placeholder="Sélectionner le genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          mb={4}
        >
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Unisexe">Unisexe</option>
        </Select>
        {/* Téléchargement de fichiers */}
        <FormControl mb={4} required>
          <FormLabel>Télécharger une image</FormLabel>
          <Input type="file" onChange={handleFileChange} required />
          <FormHelperText>Téléchargez une image pour l'article.</FormHelperText>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
          Créer l'article
        </Button>

        {/* Toast pour afficher les messages de succès ou d'erreur */}
        {/* Vous pouvez implémenter le toast ici */}
        <ItemsList />

      </Box>
    </>
  );
};

export default ItemsPage;

