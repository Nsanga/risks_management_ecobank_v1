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
import { AddAction } from "redux/actions/action";
import { listControlActions } from "redux/actions/action";

const RiskControlAssessment = ({
  selectedFrequency,
  selectedControl,
  selectedEntityDescription,
}) => {
  const userName = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profiles = useSelector(state => state.ProfileReducer.profiles);
  const entities = useSelector(state => state.EntityReducer.entities);
  const actions = useSelector(state => state.ActionReducer.actions);

  const profileOptions = profiles
    ?.filter(profile => profile.activeUser)
    ?.map((profile, index) => {
      // Vérification de la présence de name et surname
      const name = profile.name ? profile.name : "";
      const surname = profile.surname ? profile.surname : "";

      return {
        key: `${profile._id}-${index}`, // Unicité assurée
        value: `${name} ${surname}`.trim(),
        label: `${name} ${surname}`.trim(), // Concaténation des valeurs et suppression des espaces inutiles
      };
    });

  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`,
    value: entity._id,
    label: `ENT${entity.referenceId} CAM - ${entity.description}`,
    description: entity.description,
    fullEntity: entity,
  }));

  const [formData, setFormData] = useState({
    performance: "Not Assessed",
    assessedBy: userName,
    assessedOn: new Date().toISOString().split('T')[0],
    dueOn: "",
    closeDate: "",
    note: "",
    attested: false,
  });

  // Ajoutez cet useEffect pour calculer automatiquement closeDate
  useEffect(() => {
    if (formData.dueOn) {
      const dueDate = new Date(formData.dueOn);
      const closeDate = new Date(dueDate);
      closeDate.setMonth(closeDate.getMonth() + 1);

      // Formattez la date au format YYYY-MM-DD
      const formattedcloseDate = closeDate.toISOString().split('T')[0];

      setFormData(prev => ({
        ...prev,
        closeDate: formattedcloseDate
      }));
    }
  }, [formData.dueOn]);

  const [monitoring, setMonitoring] = useState("");
  const [actionData, setActionData] = useState({
    descriptionAction: "",
    delaisAction: "",
    proprioAction: "",
    idEntity: null,
    evolutionAction: "",
  });

  useEffect(() => {
    const methodology = selectedControl?.monitoringMethodology;
    setMonitoring(methodology || "");

    const historyControl = selectedControl?.historyControl || [];
    if (historyControl.length > 0) {
      const latestHistory = historyControl[historyControl.length - 1]; // Dernier élément
      setFormData(prev => ({
        ...prev,
        performance: latestHistory.performance || "Not Assessed",
        assessedBy: latestHistory.assessedBy || userName,
        assessedOn: latestHistory.assessedOn || new Date().toISOString().split('T')[0],
        dueOn: latestHistory.dueOn || "",
        closeDate: latestHistory.closeDate || "",
        note: latestHistory.note || "",
        attested: latestHistory.attested || false,
      }));
    }
    console.log("actions:", actions)
  }, [dispatch, selectedControl, selectedEntityDescription, userName]);

  const controlId = selectedControl._id;

  const handleSave = async () => {
    // Vérification de la condition sur la performance
    if (formData.performance === "Unsatisfactory") {
      // Si la performance n'est pas "Satisfaisant", ouvrir la modal
      onOpen();
      return; // Arrêter l'exécution de la fonction pour ne pas enregistrer
    } else {
      // Sinon, procéder à l'enregistrement des données
      await dispatch(
        AddControlHistory({
          ...formData,
          idControl: controlId,
          frequency: selectedFrequency,
        })
      );
      dispatch(listControlActions({ idControl: controlId }));
    }
  };

  const handleSaveAction = async () => {
    const postData = {
      ...actionData,
      idControl: controlId,
    }
    console.log("postData:", postData)
    await dispatch((AddAction(postData)));
    await dispatch(
      AddControlHistory({
        ...formData,
        idControl: controlId,
        frequency: selectedFrequency,
      })
    );
    dispatch(listEntityRiskControls(selectedEntityDescription));
    onClose();
  }

  return (
    <Box fontSize="12px">
      <Flex flexDirection="column" gap={4} alignItems="start">
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
            {selectedControl.historyControl.length > 0 ? (
              selectedControl.historyControl.slice(-5).map((controlHistory) => (
                <Tr
                  key={controlHistory._id}
                  onClick={() => {
                    setFormData({
                      performance: controlHistory.performance || "Not Assessed",
                      assessedBy: controlHistory.assessedBy || userName,
                      assessedOn: controlHistory.assessedOn || new Date().toISOString().split('T')[0],
                      dueOn: controlHistory.dueOn || "",
                      closeDate: controlHistory.closeDate || "",
                      note: controlHistory.note || "",
                      attested: controlHistory.attested || false,
                    });
                  }}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
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

        <Flex alignItems="start" justifyContent="space-between" gap={2} width="100%">
          <Box width="50%">
            <FormControl>
              <FormLabel fontSize="sm">Méthodologie du test :</FormLabel>
              <Textarea fontSize="sm" textAlign="justify" value={monitoring} readOnly />
            </FormControl>
            <Flex alignItems="start" justifyContent="space-between" gap={2} marginTop={4}>
              <FormControl>
                <FormLabel fontSize="sm">Performance</FormLabel>
                <Select
                  fontSize="sm"
                  value={formData.performance}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      performance: e.target.value
                    }));
                  }}
                >
                  <option value="Not Assessed">Non testé</option>
                  <option value="Needs Improvement">Amélioration nécessaire</option>
                  <option value="Satisfactory">Satisfaisant</option>
                  <option value="Unsatisfactory">Non satisfaisant</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Assessed By</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  placeholder="Enter assessed name"
                  value={formData.assessedBy}
                />
              </FormControl>
            </Flex>
          </Box>
          <Box width="50%">
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
            <Flex alignItems="start" justifyContent="space-between" gap={2} marginTop={4}>
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
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex justifyContent="center" gap={4} mt={6}>
        <Button fontSize="sm" colorScheme="blue" variant="outline">Amend Assess</Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">UnAttest Assess</Button>
        <Button fontSize="sm" colorScheme="green" variant="outline" onClick={handleSave} disabled={selectedControl?.historyControl?.length > 0 && !selectedControl.historyControl[0]?.attested}>Save</Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">Attest Assess</Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">Cancel</Button>
      </Flex>

      <ActionModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSaveAction}
        actionData={actionData}
        setActionData={setActionData}
        profileOptions={profileOptions}
        entitiesOptions={entitiesOptions} />
    </Box>
  );
};

export default RiskControlAssessment;
