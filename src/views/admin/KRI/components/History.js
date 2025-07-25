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
import { updateHistoryKRI } from "redux/historyKri/action";

const History = ({
  kriData,
  setDataHostorie,
  valuePeriod,
  valueRemindOne,
  profilesOptions,
  historiesKRI,
  onCancel,
  average,
  isHistory,
}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shouldSave, setShouldSave] = useState(false);
  const [amend, setAmend] = useState(false);
  const toast = useToast();

  const currentTime = new Date()
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", ":"); // Format garanti HH:mm (ex: "09:05" ou "14:30")

  const [formData, setFormData] = useState({
    period: valuePeriod,
    value: "",
    comment: "",
    time: currentTime,
  });
  console.log("historiesKRI:", historiesKRI)
  const loading = useSelector(state => state.HistoryKRIReducer.loading);
  const { actionKRI } = useSelector(state => state.ActionKRIReducer);

  // Récupère le dernier élément de l'historique
  const lastHistory = historiesKRI?.length > 0 ? historiesKRI[historiesKRI.length - 1] : null;

  // Vérifie si la période du dernier élément correspond à la date du jour
  const isCurrentPeriod = lastHistory?.period < valueRemindOne;

  // Conditions d'activation/désactivation des boutons
  const canAmend = !isHistory && !amend && historiesKRI.length > 0;
  const canSave = (!isHistory && amend) || (!isHistory && historiesKRI.length === 0);

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

  const handleAmend = () => {
    setAmend(true);
    // Préremplir avec les valeurs du dernier historique si disponible
    if (lastHistory) {
      setFormData({
        period: lastHistory.period,
        value: lastHistory.value,
        comment: lastHistory.comment,
        time: currentTime,
      });
    }
  };

  const saveHistory = async (actionType = "create") => {
    try {
      const idKeyIndicator = kriData._id;

      const payload = {
        ...formData,
        period: valuePeriod,
        idKeyIndicator,
        idEntity: kriData.entityReference,
        time: currentTime,
        author: localStorage.getItem("username"),
      };

      let saveResponse;

      if (actionType === "update" && lastHistory?._id) {
        console.log("Updating history:", lastHistory._id, payload);
        saveResponse = await dispatch(updateHistoryKRI(lastHistory._id, payload));
      } else {
        console.log("Creating new history:", payload);
        saveResponse = await dispatch(AddHistoryKRI(payload));
      }

      if (saveResponse && !saveResponse.error) {
        await dispatch(listHistoriesKRI(idKeyIndicator));
      }

      setFormData({ period: "", value: "", comment: "" });
      setShouldSave(false);
    } catch (error) {
      console.error(`❌ Error during ${actionType}HistoryKRI:`, error);
    }
  };

  const handleSave = async () => {
    if (!formData.value) {
      return toast({
        title: "Erreur",
        description: "Value is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    const valueEscalated = compareValues(formData.value, kriData.escaladeKeyIndicator);

    if (valueEscalated) {
      setFormData(prev => ({
        ...prev,
        period: valuePeriod,
        time: currentTime,
      }));
      onOpen();     // Affiche la modal de confirmation
      setShouldSave(true); // Marque qu'on veut sauvegarder après confirmation
    } else {
      lastHistory ? await saveHistory("update") : await saveHistory("create");
      setAmend(false);
    }

    console.log("valuePeriod::", valuePeriod);
  };

  const handleCancel = () => {
    onCancel();
    setAmend(false);
  }

  const getValueColor = (value, thresholds) => {
    const { escaladeKeyIndicator, seuilKeyIndicator, toleranceKeyIndicator } =
      thresholds;

    // Fonction pour comparer une valeur avec un seuil (supporte >x, <x, <=x>y, etc.)
    const compareWithThreshold = (val, threshold) => {
      if (!threshold || typeof val === "undefined") return false;

      const numVal = parseFloat(val);
      if (isNaN(numVal)) return false;

      // Cas 1: Intervalle (ex: "<=5>0" signifie "0 < valeur ≤ 5")
      if (/<=?[0-9.]+>?[0-9.]+/g.test(threshold)) {
        const parts = threshold.split(/>|</).filter(Boolean);
        const upperBound = parseFloat(parts[0].replace("=", ""));
        const lowerBound = parseFloat(parts[1]);

        return (
          (threshold.includes("<=")
            ? numVal <= upperBound
            : numVal < upperBound) &&
          (threshold.includes(">") ? numVal > lowerBound : numVal >= lowerBound)
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
                  value={formData.period}
                  disabled={true}
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
                  placeholder="Enter value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  disabled={!canSave}
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
                  disabled={!canSave}
                />
              </Box>
            </VStack>
          </Box>
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="flex-end"
          marginTop={8}
          gap={4}
        >
          <Button
            fontSize="12px"
            colorScheme="blue"
            onClick={handleAmend}
            disabled={loading || !canAmend}
          >
            Amend
          </Button>

          <Button
            fontSize="12px"
            colorScheme="green"
            onClick={handleSave}
            disabled={loading || !canSave}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            // onClick={onClose}
            colorScheme="red"
            type="reset"
            fontSize="12px"
            onClick={handleCancel}
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
          <ModalHeader>{lastHistory ? "Modifier l'action" : "Ajouter une action"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionForm
              onClose={onClose}
              kriData={kriData}
              profilesOptions={profilesOptions}
              formDataHistory={formData}
              setFormDataHistory={setFormData}
              setAmend={setAmend}
              lastHistory={lastHistory}
              actionKRI={actionKRI}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default History;
