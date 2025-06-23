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
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { listEntityRiskControls } from "redux/entityRiskControl/action";
import { AddControlHistory } from "redux/controlHistory/action";
import ActionModal from "./ActionModal";
import { AddAction } from "redux/actions/action";
import { listControlActions } from "redux/actions/action";
import { updateControlHistory } from "redux/controlHistory/action";
import { fetchOneRiskControls } from "redux/entityRiskControl/action";

const RiskControlAssessment = ({
  selectedFrequency,
  selectedControl,
  selectedEntityDescription,
  setActiveSubTab
}) => {
  const [amend, setAmend] = useState(false);
  const userName = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profiles = useSelector(state => state.ProfileReducer.profiles);
  const entities = useSelector(state => state.EntityReducer.entities);
  const actions = useSelector(state => state.ActionReducer.actions);
  const loadingSave = useSelector(state => state.ControlHistoryReducer.loding);
  const { riskControl, loading } = useSelector(state => state.EntityRiskControlReducer);

  const userRole = localStorage.getItem('role');

  const toast = useToast();

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
        email: profile.email,
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

  const controlId = selectedControl._id;

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
    emailProprio: "",
    idEntity: null,
    evolutionAction: "",
  });

  // Réinitialiser le formulaire quand le contrôle change
  useEffect(() => {
    // Réinitialiser avec les valeurs par défaut
    setFormData({
      performance: "Not Assessed",
      assessedBy: userName,
      assessedOn: new Date().toISOString().split('T')[0],
      dueOn: "",
      closeDate: "",
      note: "",
      attested: false,
    });

    // Charger les données du nouveau contrôle
    if (controlId) {
      dispatch(fetchOneRiskControls(controlId));
    }
  }, [controlId, dispatch, userName]);

  // Mettre à jour le formulaire quand les données sont chargées
  useEffect(() => {
    if (!riskControl || riskControl._id !== controlId) return;

    // Mise à jour de la méthodologie
    if (selectedControl?.monitoringMethodology) {
      setMonitoring(selectedControl.monitoringMethodology);
    }

    // Préremplissage avec le dernier historique s'il existe
    if (riskControl.historyControl?.length > 0) {
      const latestHistory = riskControl.historyControl[riskControl.historyControl.length - 1];
      const today = new Date().toISOString().split('T')[0];

      // Vérifier si nextAssessMent existe et si closeDate correspond à aujourd'hui
      const shouldUseNextAssessment = selectedControl?.nextAssessMent &&
        latestHistory.closeDate === today;

      // Calculer la nouvelle closeDate si nécessaire
      let newCloseDate = latestHistory.closeDate || "";

      if (shouldUseNextAssessment) {
        // Créer une date à partir de nextAssessMent
        const dueDate = new Date(selectedControl.nextAssessMent);
        // Ajouter un mois
        dueDate.setMonth(dueDate.getMonth() + 1);
        // Formater en YYYY-MM-DD
        newCloseDate = dueDate.toISOString().split('T')[0];
      }

      setFormData(prev => ({
        ...prev,
        performance: latestHistory.performance || "Not Assessed",
        assessedBy: latestHistory.assessedBy || userName,
        assessedOn: latestHistory.assessedOn || new Date().toISOString().split('T')[0],
        dueOn: shouldUseNextAssessment ? selectedControl.nextAssessMent : (latestHistory.dueOn || ""),
        closeDate: newCloseDate,
        note: latestHistory.note || "",
        attested: latestHistory.attested || false,
      }));
    }
  }, [riskControl, selectedControl, userName, controlId]);

  const handleSave = async () => {
    // Vérification que tous les champs requis sont remplis
    const requiredFields = ['performance', 'assessedBy', 'assessedOn', 'dueOn', 'note'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

    if (missingFields.length > 0) {
      toast({
        title: 'Champs manquants',
        description: `Veuillez remplir tous les champs obligatoires: ${missingFields.join(', ')}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (formData.performance === "Not Assessed") {
      toast({
        title: 'Performance non évaluée',
        description: 'Veuillez sélectionner une évaluation de performance valide (différente de "Non testé")',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

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
          author: localStorage.getItem("username"),
          attested: false,
        })
      );
      dispatch(fetchOneRiskControls(controlId));
    }
  };

  const handleSaveAction = async () => {
    const postData = {
      ...actionData,
      idControl: controlId,
      author: localStorage.getItem("username"),
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

  const handleAmend = () => {
    setAmend(true);
  }

  const handleUpdate = async (id, attest) => {
    // Vérification de la condition sur la performance
    if (formData.performance === "Unsatisfactory") {
      // Si la performance n'est pas "Satisfaisant", ouvrir la modal
      onOpen();
      return; // Arrêter l'exécution de la fonction pour ne pas enregistrer
    } else {
      const data = {
        ...formData,
        idControl: controlId,
        frequency: selectedFrequency,
        attested: attest
      }
      // Sinon, procéder à l'enregistrement des données
      await dispatch(
        updateControlHistory(id, data)
      );

      dispatch(fetchOneRiskControls(controlId));
    }
  };

  const handleSaveTest = (id, attest) => {
    if (!amend) {
      handleSave();
    } else {
      handleUpdate(id, attest);
    }
    setAmend(false);
  }

  const handleCancel = () => {
    setActiveSubTab(0);
    setAmend(false);
  }

  // Conditions de désactivation bien structurées
  const hasHistory = riskControl?.historyControl?.length > 0;
  const lastHistory = hasHistory ? riskControl.historyControl[riskControl.historyControl.length - 1] : null;
  const isClosed = lastHistory?.closeDate && new Date(lastHistory.closeDate) > new Date();
  const isInputer = userRole === "inputeurs";
  const isValidator = userRole === "validated";

  // Conditions pour chaque bouton
  const isDisabledUnattest = !hasHistory || !lastHistory?.attested || isInputer;
  const isDisabledAmendAttest = !hasHistory || lastHistory?.attested || isValidator || !isClosed || amend;
  const isDisabledToAdmin = !hasHistory || lastHistory?.attested || isInputer || isDisabledAmendAttest;
  const isDisabledSave = (isValidator && !isClosed && !amend) || !isDisabledAmendAttest || lastHistory?.attested;

  const isReadOnly = !amend && (riskControl?.historyControl && riskControl?.historyControl.length > 0)

  // useEffect(() => {
  //   setAmend(false);
  // }, []);

  return (
    <Box fontSize="12px">
      <Flex flexDirection="column" gap={4} alignItems="start">
        <Table variant="simple" width="100%" fontSize="10px">
          <Thead bg="gray.200">
            <Tr>
              <Th textTransform="none">Ref</Th>
              <Th textTransform="none">Ass On</Th>
              <Th textTransform="none">Due On</Th>
              <Th textTransform="none">Closed date</Th>
              <Th textTransform="none">Perf</Th>
              <Th textTransform="none">Att</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(riskControl?.historyControl && riskControl?.historyControl.length) > 0 ? (
              riskControl?.historyControl.slice(-5).map((controlHistory) => (
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
                <FormLabel fontSize="sm">Performance <span style={{ color: 'red' }}>*</span></FormLabel>
                <Select
                  fontSize="sm"
                  value={formData.performance}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      performance: e.target.value
                    }));
                  }}
                  disabled={isReadOnly}
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
                  readOnly
                />
              </FormControl>
            </Flex>
          </Box>
          <Box width="50%">
            <FormControl>
              <FormLabel fontSize="sm">Résultats du test <span style={{ color: 'red' }}>*</span></FormLabel>
              <Textarea
                fontSize="sm"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                readOnly={isReadOnly}
              />
            </FormControl>
            <Flex alignItems="start" justifyContent="space-between" gap={2} marginTop={4}>
              <FormControl>
                <FormLabel fontSize="sm">Assessed On <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  placeholder="Enter assessed date"
                  value={formData.assessedOn}
                  onChange={(e) =>
                    setFormData({ ...formData, assessedOn: e.target.value })
                  }
                  readOnly={isReadOnly}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Due On <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.dueOn}
                  onChange={(e) =>
                    setFormData({ ...formData, dueOn: e.target.value })
                  }
                  readOnly={isReadOnly}
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
                  readOnly
                />
              </FormControl>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex justifyContent="center" gap={4} mt={6}>
        <Button onClick={handleAmend} fontSize="sm" colorScheme="blue" variant="outline" disabled={isDisabledAmendAttest}>Amend Assess</Button>
        <Button onClick={() => handleUpdate(lastHistory?._id, false)} fontSize="sm" colorScheme="red" variant="outline" disabled={isDisabledUnattest}>{loading ? "In progress..." : "UnAttest Assess"}</Button>
        <Button fontSize="sm" colorScheme="green" variant="outline" onClick={() => handleSaveTest(lastHistory?._id, false)} disabled={isDisabledSave}> {loadingSave ? "Saving..." : "Save"} </Button>
        <Button onClick={() => handleUpdate(lastHistory?._id, true)} fontSize="sm" colorScheme="blue" variant="outline" disabled={isDisabledToAdmin}> {loading ? "In progress..." : "Attest Assess"} </Button>
        <Button onClick={handleCancel} fontSize="sm" colorScheme="red" variant="outline">Cancel</Button>
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
