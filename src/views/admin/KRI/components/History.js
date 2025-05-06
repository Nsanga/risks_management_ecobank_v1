import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Textarea,
  Button,
  Flex,
  HStack,
  VStack,
  Text,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CheckCircleIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddHistoryKRI } from "redux/historyKri/action";
import { listHistoriesKRI } from "redux/historyKri/action";
import ActionForm from "./ActionForm";

const History = ({ kriData, setDataHostorie, dateFormatee, profilesOptions, historiesKRI }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shouldSave, setShouldSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    period: "",
    value: "",
    comments: "",
  });

  // Gestionnaire de changement pour les inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const compareValues = (enteredValue, threshold) => {
    if (!threshold) return false;

    // Si le seuil commence par ">", on extrait le nombre et on compare
    if (threshold.startsWith(">")) {
      const thresholdValue = parseFloat(threshold.substring(1));
      const enteredNum = parseFloat(enteredValue);
      return (
        !isNaN(enteredNum) &&
        !isNaN(thresholdValue) &&
        enteredNum > thresholdValue
      );
    }

    // Si c'est une simple valeur numérique
    const thresholdValue = parseFloat(threshold);
    const enteredNum = parseFloat(enteredValue);
    return (
      !isNaN(enteredNum) &&
      !isNaN(thresholdValue) &&
      enteredNum > thresholdValue
    );
  };

  const handleSave = async () => {
    if (compareValues(formData.value, kriData.escaladeKeyIndicator)) {
      onOpen(); // Affiche la modal de confirmation
      setShouldSave(true); // Marque qu'on veut sauvegarder après confirmation
    } else {
      await performSave(); // Sauvegarde directement si la valeur est OK
    }
  };

  const performSave = async () => {
    console.log("formData:", formData);
    setIsLoading(true);
    try {
      await dispatch(AddHistoryKRI({ ...formData, period: dateFormatee, idKeyIndicator: kriData._id, idEntity: kriData.entityReference }));
      dispatch(listHistoriesKRI(kriData._id));
      setFormData({
        period: "",
        value: "",
        comments: "",
      });
      setShouldSave(false);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSave = async () => {
    onClose();
    if (shouldSave) {
      await performSave();
    }
  };

  const getValueColor = (value, thresholds) => {
    const { escaladeKeyIndicator, seuilKeyIndicator, toleranceKeyIndicator } =
      thresholds;

    // Fonction pour comparer une valeur avec un seuil (qui peut être ">x", "<x" ou juste un nombre)
    const compareWithThreshold = (val, threshold) => {
      if (!threshold) return false;

      if (threshold.startsWith(">")) {
        const thresholdValue = parseFloat(threshold.substring(1));
        const numVal = parseFloat(val);
        return (
          !isNaN(numVal) && !isNaN(thresholdValue) && numVal > thresholdValue
        );
      }

      if (threshold.startsWith("<")) {
        const thresholdValue = parseFloat(threshold.substring(1));
        const numVal = parseFloat(val);
        return (
          !isNaN(numVal) && !isNaN(thresholdValue) && numVal < thresholdValue
        );
      }

      const thresholdValue = parseFloat(threshold);
      const numVal = parseFloat(val);
      return (
        !isNaN(numVal) && !isNaN(thresholdValue) && numVal === thresholdValue
      );
    };

    // Vérification dans l'ordre de priorité (R > A > G)
    if (compareWithThreshold(value, escaladeKeyIndicator)) {
      return "red.400"; // Rouge pour le seuil d'escalade (R)
    }

    if (compareWithThreshold(value, seuilKeyIndicator)) {
      return "orange.300"; // Orange pour le seuil d'alerte (A)
    }

    if (compareWithThreshold(value, toleranceKeyIndicator)) {
      return "green.400"; // Vert pour le seuil de tolérance (G)
    }

    return "gray.600"; // Couleur par défaut si aucun seuil n'est atteint
  };

  useEffect(() => {
    setDataHostorie(historiesKRI);
  }, [historiesKRI]);

  console.log("historiesKRI:", historiesKRI);
  return (
    <Box className="container" fontSize="12px" p={4}>
      {/* TABLE PRINCIPALE */}
      <Table variant="simple" mb={6} size="sm">
        <Thead bg="blue.100">
          <Tr fontSize="10px">
            <Th textTransform="none">Status</Th>
            <Th textTransform="none">Trend</Th>
            <Th textTransform="none"></Th>
            <Th textTransform="none"></Th>
            <Th textTransform="none">Average</Th>
            <Th textTransform="none">R</Th>
            <Th textTransform="none">A</Th>
            <Th textTransform="none">Target</Th>
            <Th textTransform="none">A</Th>
            <Th textTransform="none">R</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <CheckCircleIcon color="green.400" />
            </Td>
            <Td>
              <ArrowForwardIcon />
            </Td>
            <Td>0.00</Td>
            <Td>0.00</Td>
            <Td>0.00</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td color="green.600">{kriData.toleranceKeyIndicator}</Td>
            <Td color="orange.500">{kriData.seuilKeyIndicator}</Td>
            <Td color="red.500">{kriData.escaladeKeyIndicator}</Td>
          </Tr>
        </Tbody>
      </Table>

      {/* PANEL DES DÉTAILS */}
      <Flex gap={8} flexWrap="wrap">
        {/* Liste des périodes */}
        <Box flex="1">
          <Table variant="simple" size="sm">
            <Thead bg="gray.100">
              <Tr>
                <Th textTransform="none">Status</Th>
                <Th textTransform="none">Period</Th>
                <Th textTransform="none">Time</Th>
                <Th textTransform="none">Threshold Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {historiesKRI?.map((history, index) => (
                <Tr key={index}>
                  <Td>
                    <CheckCircleIcon
                      color={getValueColor(history.value, {
                        escaladeKeyIndicator: kriData.escaladeKeyIndicator,
                        seuilKeyIndicator: kriData.seuilKeyIndicator,
                        toleranceKeyIndicator: kriData.toleranceKeyIndicator,
                      })}
                    />
                  </Td>
                  <Td>{history.period}</Td>
                  <Td>{history.time}</Td>
                  <Td>{history.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Formulaire de modification */}
        <Box flex="1" bg="gray.50" p={4} borderRadius="md" boxShadow="md">
          <VStack align="start" spacing={3}>
            <HStack spacing={2}>
              <Text mb="0" whiteSpace="nowrap">
                Period :
              </Text>
              <Input
                size="sm"
                name="period"
                value={dateFormatee}
              // onChange={handleInputChange}
              />
            </HStack>

            <HStack spacing={2}>
              <Text mb="0" whiteSpace="nowrap">
                Value :
              </Text>
              <Input
                type="number"
                size="sm"
                placeholder="Enter value..."
                name="value"
                value={formData.value}
                onChange={handleInputChange}
              />
            </HStack>

            <Box w="100%">
              <HStack spacing={4} mb={2}>
                <Text fontWeight="bold" w="30px">
                  R :
                </Text>
                <Input
                  bg="red.400"
                  color="white"
                  size="sm"
                  value={kriData.escaladeKeyIndicator}
                  readOnly
                />
              </HStack>

              <HStack spacing={4} mb={2}>
                <Text fontWeight="bold" w="30px">
                  A :
                </Text>
                <Input
                  bg="orange.300"
                  size="sm"
                  value={kriData.seuilKeyIndicator}
                  readOnly
                />
              </HStack>

              <HStack spacing={4}>
                <Text fontWeight="bold" w="30px">
                  G :
                </Text>
                <Input
                  bg="green.400"
                  size="sm"
                  value={kriData.toleranceKeyIndicator}
                  readOnly
                />
              </HStack>
            </Box>

            <Box w="100%">
              <Text>Comments :</Text>
              <Textarea
                size="sm"
                placeholder="Write a comment..."
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
              />
            </Box>

            <HStack>
              {/* <Button fontSize="sm" colorScheme="blue" variant="outline">
                Document
              </Button>
              <Button fontSize="sm" colorScheme="blue" variant="outline">
                Amend
              </Button> */}
              <Button
                fontSize="sm"
                colorScheme="blue"
                variant="outline"
                onClick={handleSave}
              >
                {isLoading ? 'Save in progress ...' : 'Save'}
              </Button>
              {/* <Button fontSize="sm" colorScheme="blue" variant="outline">
                Cancel
              </Button> */}
            </HStack>
          </VStack>
        </Box>
      </Flex>
      {/* Modal d'action */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionForm onClose={onClose} kriData={kriData} profilesOptions={profilesOptions} formDataHistory={formData} dateFormatee={dateFormatee} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default History;
