import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Box,
  Text,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { url } from "urlLoader";
import { useDispatch } from "react-redux";
import { listTenants } from "redux/tenant/action";

function ModaleDeleteTenant({ isOpen, onClose, tenant }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const method = "DELETE";
      const endpoint = `${url}/api/v1/tenant/${tenant?._id}`;

      const res = await fetch(endpoint, {
        method,
      });

      if (res.ok) {
        toast({
          title: tenant ? "Organisation mise à jour" : "Organisation créée",
          description: "Les modifications ont été enregistrées avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        dispatch(listTenants());
      } else {
        const errorData = await res.json();
        toast({
          title: "Erreur",
          description: errorData.message || "Erreur inconnue",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      //   scrollBehavior="inside"
      size="lg"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent>
        {isOpen && (
          <Box
            position="absolute" // ou "fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            zIndex="popover"
            w="520px"
            p={6}
          >
            <Heading fontSize="lg" mb={4}>
              Suppression du tenant : {tenant?.name}
            </Heading>
            <Text mb={4}>Êtes-vous sûr de vouloir supprimer ce tenant ?</Text>
            <Flex justify="flex-end" gap={3}>
              <Button onClick={onClose}>Annuler</Button>
              <Button
                colorScheme="red"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Supprimer
              </Button>
            </Flex>
          </Box>
        )}
         
      </ModalContent> 
    </Modal>
  );
}

export default ModaleDeleteTenant;
