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
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddHistoryKRI } from "redux/historyKri/action";
import { listHistoriesKRI } from "redux/historyKri/action";
import ActionForm from "./ActionForm";

const History = ({ kriData, setDataHostorie, dateFormatee, profilesOptions, historiesKRI, onCancel }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shouldSave, setShouldSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const total = historiesKRI.reduce(
    (sum, item) => sum + parseFloat(item.value),
    0
  );
  const average = total / historiesKRI.length;

  const [formData, setFormData] = useState({
    period: "",
    value: "",
    comment: "",
    time: ""
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
    if (!formData.value) {
      toast({
        title: "Erreur",
        description: "Value is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (compareValues(formData.value, kriData.escaladeKeyIndicator)) {
      onOpen(); // Affiche la modal de confirmation
      setShouldSave(true); // Marque qu'on veut sauvegarder après confirmation
    } else {
      await performSave(); // Sauvegarde directement si la valeur est OK
    }
  };

  const performSave = async () => {
    setIsLoading(true);
    try {
      const currentTime = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(':', ':'); // Format garanti HH:mm (ex: "09:05" ou "14:30")
      const idKeyIndicator = kriData._id; // Référence stable

      // 1. Sauvegarde de l'historique
      const saveResponse = await dispatch(
        AddHistoryKRI({
          ...formData,
          period: dateFormatee,
          idKeyIndicator,
          idEntity: kriData.entityReference,
          time: currentTime,
        })
      );
      console.log("Save response:", saveResponse); // Debug

      // 2. Réinitialisation du formulaire
      setFormData({ period: "", value: "", comment: "" });

      // 3. Rechargement de la liste (seulement si sauvegarde réussie)
      if (saveResponse && !saveResponse.error) {
        await dispatch(listHistoriesKRI(idKeyIndicator));
      }

      setShouldSave(false);
    } catch (error) {
      console.error("PerformSave error:", error); // Log complet
    } finally {
      setIsLoading(false);
    }
  };

  const getValueColor = (value, thresholds) => {
    const { escaladeKeyIndicator, seuilKeyIndicator, toleranceKeyIndicator } = thresholds;

    // Fonction pour comparer une valeur avec un seuil (supporte >x, <x, <=x>y, etc.)
    const compareWithThreshold = (val, threshold) => {
      if (!threshold || typeof val === 'undefined') return false;

      const numVal = parseFloat(val);
      if (isNaN(numVal)) return false;

      // Cas 1: Intervalle (ex: "<=5>0" signifie "0 < valeur ≤ 5")
      if (/<=?[0-9.]+>?[0-9.]+/g.test(threshold)) {
        const parts = threshold.split(/>|</).filter(Boolean);
        const upperBound = parseFloat(parts[0].replace('=', ''));
        const lowerBound = parseFloat(parts[1]);

        return (
          (threshold.includes('<=') ? numVal <= upperBound : numVal < upperBound) &&
          (threshold.includes('>') ? numVal > lowerBound : numVal >= lowerBound)
        );
      }

      // Cas 2: Opérateur simple (>, <, =)
      if (threshold.startsWith(">=")) {
        const thresholdValue = parseFloat(threshold.substring(2));
        return !isNaN(thresholdValue) && numVal >= thresholdValue;
      }
      if (threshold.startsWith("<=")) {
        const thresholdValue = parseFloat(threshold.substring(2));
        return !isNaN(thresholdValue) && numVal <= thresholdValue;
      }
      if (threshold.startsWith(">")) {
        const thresholdValue = parseFloat(threshold.substring(1));
        return !isNaN(thresholdValue) && numVal > thresholdValue;
      }
      if (threshold.startsWith("<")) {
        const thresholdValue = parseFloat(threshold.substring(1));
        return !isNaN(thresholdValue) && numVal < thresholdValue;
      }

      // Cas 3: Valeur exacte
      const thresholdValue = parseFloat(threshold);
      return !isNaN(thresholdValue) && numVal === thresholdValue;
    };

    // Vérification par ordre de priorité (R > A > G)
    if (compareWithThreshold(value, escaladeKeyIndicator)) return "red.400";
    if (compareWithThreshold(value, seuilKeyIndicator)) return "orange.300";
    if (compareWithThreshold(value, toleranceKeyIndicator)) return "green.400";

    return "gray.600"; // Par défaut
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
              <CheckCircleIcon
                color={getValueColor(average, {
                  escaladeKeyIndicator: kriData.escaladeKeyIndicator,
                  seuilKeyIndicator: kriData.seuilKeyIndicator,
                  toleranceKeyIndicator: kriData.toleranceKeyIndicator,
                })}
              />
              {/* <CheckCircleIcon color="green.400" /> */}
            </Td>
            <Td>
              <ArrowForwardIcon />
            </Td>
            <Td>0.00</Td>
            <Td>0.00</Td>
            <Td>{average ? average : 0.0}</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td color="green.600">{kriData.toleranceKeyIndicator}</Td>
            <Td color="orange.500">{kriData.seuilKeyIndicator}</Td>
            <Td color="red.500">{kriData.escaladeKeyIndicator}</Td>
          </Tr>
        </Tbody>
      </Table>

      {/* PANEL DES DÉTAILS */}
      <Box>
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
                {
                  historiesKRI
                    ?.sort((a, b) => new Date(b.period + ' ' + b.time) - new Date(a.period + ' ' + a.time)) // Tri par date+time
                    ?.slice(0, 5) // Prendre les 5 premiers
                    ?.map((history, index) => (
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
                    ))
                }
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
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </Box>


            </VStack>
          </Box>
        </Flex>
        <Flex flexDirection="row" justifyContent="flex-end" marginTop={8} gap={4}>
          <Button
            fontSize="12px"
            colorScheme="blue"
            onClick={handleSave}
          >
            {isLoading ? 'Save in progress ...' : 'Save'}
          </Button>
          <Button
            // onClick={onClose}
            colorScheme="red"
            type="reset"
            fontSize="12px"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Flex>
      </Box>
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
            <ActionForm
              onClose={onClose}
              kriData={kriData}
              profilesOptions={profilesOptions}
              formDataHistory={formData}
              dateFormatee={dateFormatee}
              setFormDataHistory={setFormData} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default History;
