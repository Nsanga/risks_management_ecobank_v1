import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { listEntityRiskControls } from "redux/entityRiskControl/action";
import { AddControlHistory } from "redux/controlHistory/action";
import ActionModal from "./ActionModal";

const RiskControlAssessment = ({
  selectedFrequency,
  currentAssoCiate,
  selectedRisk,
  selectedEntityDescription,
}) => {
  const userName = localStorage.getItem("username") || "";
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const controlHistories = useSelector((state) => state.ControlHistoryReducer.controlHistories);
  
  const [formData, setFormData] = useState({
    performance: "Not Assessed",
    assessedBy: userName,
    assessedOn: "",
    dueOn: "",
    closeDate: "",
    notes: "",
    attested: false,
  });

  const [monitoring, setMonitoring] = useState("");
  const [actionData, setActionData] = useState({
    description: "",
    delais: "",
    proprietaire: "",
    entite: "",
    evolution: "",
  });

  useEffect(() => {
    const methodology = currentAssoCiate?.monitoringMethodology || selectedRisk?.monitoringMethodology;
    setMonitoring(methodology || "");

    const historyControl = currentAssoCiate?.historyControl || selectedRisk?.historyControl || [];
    if (historyControl.length > 0) {
      const latestHistory = historyControl[0];
      setFormData({
        performance: latestHistory.performance || "Not Assessed",
        assessedBy: latestHistory.assessedBy || userName,
        assessedOn: latestHistory.assessedOn || "",
        dueOn: latestHistory.dueOn || "",
        closeDate: latestHistory.closeDate || "",
        notes: latestHistory.notes || "",
        attested: latestHistory.attested || false,
      });
    }
    dispatch(listEntityRiskControls(selectedEntityDescription));
  }, [dispatch, currentAssoCiate, selectedRisk, selectedEntityDescription, userName]);

  const handleSave = async () => {
    // Vérification de la condition sur la performance
    if (formData.performance !== "Satisfaisant") {
      // Si la performance n'est pas "Satisfaisant", ouvrir la modal
      onOpen();
      return; // Arrêter l'exécution de la fonction pour ne pas enregistrer
    }

    // Sinon, procéder à l'enregistrement des données
    const controlId = currentAssoCiate?.activeRisk ? currentAssoCiate._id : selectedRisk?._id;
    await dispatch(
      AddControlHistory({
        ...formData,
        idControl: controlId,
        frequency: selectedFrequency,
      })
    );
    dispatch(listEntityRiskControls(selectedEntityDescription));
  };

  return (
    <Box fontSize="12px">
      <Flex gap={4} alignItems="start">
        <Box bg="white" width="70%">
          <Table variant="simple" width="100%" fontSize="10px">
            <Thead bg="gray.200">
              <Tr>
                <Th>Ref</Th>
                <Th>Ass On</Th>
                <Th>Due On</Th>
                <Th>Closed date</Th>
                <Th>Perf</Th>
                <Th>Att</Th>
              </Tr>
            </Thead>
            <Tbody>
              {controlHistories.length > 0 ? (
                controlHistories.slice(-5).map((controlHistory) => (
                  <Tr key={controlHistory._id}>
                    <Td>{controlHistory.reference}</Td>
                    <Td>{controlHistory.assessedOn}</Td>
                    <Td>{controlHistory.dueOn}</Td>
                    <Td>{controlHistory.closeDate}</Td>
                    <Td>{controlHistory.performance}</Td>
                    <Td>
                      <Checkbox isChecked={controlHistory.attested} isReadOnly />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center">Aucun historique disponible</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          <FormControl mt={4}>
            <FormLabel fontSize="sm">Méthodologie du test :</FormLabel>
            <Textarea fontSize="sm" textAlign="justify" value={monitoring} readOnly />
          </FormControl>
        </Box>

        <Box bg="white" width="30%">
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Performance</FormLabel>
                <Select
                  fontSize="sm"
                  value={formData.performance}
                  onChange={(e) =>
                    setFormData({ ...formData, performance: e.target.value })
                  }
                >
                  <option>Amélioration nécessaire</option>
                  <option>Non testé</option>
                  <option>Satisfaisant</option>
                  <option>Non satisfaisant </option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Assessed By</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  placeholder="Enter assessed name"
                  value={formData.assessedBy}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Assessed On</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  placeholder="Enter assessed date"
                  value={formData.assessedOn}
                  onChange={(e) =>
                    setFormData({ ...formData, assessedOn: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Due On</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.dueOn}
                  onChange={(e) =>
                    setFormData({ ...formData, dueOn: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel fontSize="sm">Closed date</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) =>
                    setFormData({ ...formData, closeDate: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel fontSize="sm">Résultats du test</FormLabel>
                <Textarea
                  fontSize="sm"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
      </Flex>

      <Flex justifyContent="center" gap={4} mt={6}>
        <Button fontSize="sm" colorScheme="blue" variant="outline">Amend Assess</Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">UnAttest Assess</Button>
        <Button fontSize="sm" colorScheme="green" variant="outline" onClick={handleSave}>Save</Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">Attest Assess</Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">Cancel</Button>
      </Flex>

      <ActionModal isOpen={isOpen} onClose={onClose} actionData={actionData} setActionData={setActionData} />
    </Box>
  );
};

export default RiskControlAssessment;
