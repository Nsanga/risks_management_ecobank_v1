import React from "react";
import { Box, Text, Link, Flex } from "@chakra-ui/react";

// Protection : vérifie que le texte existe
const truncateWords = (text = "", limit = 20) => {
  if (!text) return "";  // handle null/undefined cases
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const KriCard = ({ refId, description }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"        // Ajout de la bordure
      borderRadius="lg"        // Coins arrondis
      boxShadow="sm"           // Ombre légère
      bg="white"               // Fond blanc
      mb={3}                   // Marge inférieure
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Box mb={2}>
        <Flex alignItems="center">
          <Text fontWeight="bold" mr={2}>KRI Ref :</Text>
          <Link color="blue.500" fontWeight="bold">
            {refId || "N/A"}
          </Link>
        </Flex>
      </Box>

      <Box mb={2}>
        <Flex alignItems="center">
          <Text fontWeight="bold" mr={2}>Descri :</Text>
          <Text>{truncateWords(description)}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

const App = () => {
  const fakeRefId = "12345"; // Référence fictive
  const fakeDescription = "Cette description est un exemple fictif qui va être tronquée pour les tests afin de vérifier si la fonction de troncation fonctionne correctement et que le texte est bien affiché à l'écran.";

  return <KriCard refId={fakeRefId} description={fakeDescription} />;
};

export default App;
