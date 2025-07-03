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
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { listEntityRiskControls } from "redux/entityRiskControl/action";
import { AddControlHistory } from "redux/controlHistory/action";
import ActionModal from "./ActionModal";
import { AddAction } from "redux/actions/action";
import { fetchOneRiskControls } from "redux/entityRiskControl/action";
import { updateControlHistory } from "redux/controlHistory/action";

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
  const loadingSave = useSelector(state => state.ControlHistoryReducer.loding);
  const { riskControl, loading } = useSelector(state => state.EntityRiskControlReducer);

  const userRole = localStorage.getItem('role');
  const toast = useToast();

  const profileOptions = profiles
    ?.filter(profile => profile.activeUser)
    ?.map((profile, index) => {
      const name = profile.name || "";
      const surname = profile.surname || "";
      return {
        key: `${profile._id}-${index}`,
        value: `${name} ${surname}`.trim(),
        label: `${name} ${surname}`.trim(),
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

  useEffect(() => {
    if (formData.dueOn) {
      const dueDate = new Date(formData.dueOn);
      const closeDate = new Date(dueDate);
      closeDate.setMonth(closeDate.getMonth() + 1);
      const formattedcloseDate = closeDate.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, closeDate: formattedcloseDate }));
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

  useEffect(() => {
    setFormData({
      performance: "Not Assessed",
      assessedBy: userName,
      assessedOn: new Date().toISOString().split('T')[0],
      dueOn: "",
      closeDate: "",
      note: "",
      attested: false,
    });

    if (controlId) {
      dispatch(fetchOneRiskControls(controlId));
    }
  }, [controlId, dispatch, userName]);

  useEffect(() => {
    if (!riskControl || riskControl._id !== controlId) return;

    if (selectedControl?.monitoringMethodology) {
      setMonitoring(selectedControl.monitoringMethodology);
    }

    if (riskControl.historyControl?.length > 0) {
      const latestHistory = riskControl.historyControl[riskControl.historyControl.length - 1];
      const today = new Date().toISOString().split('T')[0];
      const shouldUseNextAssessment = selectedControl?.nextAssessMent &&
        latestHistory.closeDate === today;

      let newCloseDate = latestHistory.closeDate || "";
      if (shouldUseNextAssessment) {
        const dueDate = new Date(selectedControl.nextAssessMent);
        dueDate.setMonth(dueDate.getMonth() + 1);
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
    const requiredFields = ['performance', 'assessedBy', 'assessedOn', 'dueOn', 'note'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

    if (missingFields.length > 0) {
      toast({
        title: 'Champs manquants',
        description: `Veuillez remplir tous les champs obligatoires : ${missingFields.join(', ')}`,
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

    if (formData.performance === "Unsatisfactory") {
      onOpen();
      return;
    } else {
      await dispatch(
        AddControlHistory({
          ...formData,
          idControl: controlId,
          frequency: selectedFrequency,
          author: userName,
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
      author: userName,
    };
    await dispatch(AddAction(postData));
    await dispatch(
      AddControlHistory({
        ...formData,
        idControl: controlId,
        frequency: selectedFrequency,
      })
    );
    dispatch(listEntityRiskControls(selectedEntityDescription));
    onClose();
  };

  const handleAmend = () => setAmend(true);

  const handleUpdate = async (id, attest) => {
    const data = {
      ...formData,
      idControl: controlId,
      frequency: selectedFrequency,
      attested: attest
    };
    await dispatch(updateControlHistory(id, data));
    dispatch(fetchOneRiskControls(controlId));
  };

  const handleSaveTest = (id, attest) => {
    if (!amend) {
      handleSave();
    } else {
      handleUpdate(id, attest);
    }
    setAmend(false);
  };

  const handleCancel = () => {
    setActiveSubTab(0);
    setAmend(false);
  };

  const hasHistory = riskControl?.historyControl?.length > 0;
  const lastHistory = hasHistory ? riskControl.historyControl[riskControl.historyControl.length - 1] : null;
  const isClosed = lastHistory?.closeDate && new Date(lastHistory.closeDate) > new Date();
  const isInputer = userRole === "inputeurs";
  const isValidator = userRole === "validated";

  const isDisabledUnattest = !hasHistory || !lastHistory?.attested || isInputer;
  const isDisabledAmendAttest = !hasHistory || lastHistory?.attested || isValidator || !isClosed || amend;
  const isDisabledToAdmin = !hasHistory || lastHistory?.attested || isInputer || isDisabledAmendAttest;
  const isDisabledSave = (isValidator && !isClosed && !amend) || !isDisabledAmendAttest || lastHistory?.attested;

  const isReadOnly = !amend && hasHistory;

  return (
    <Box fontSize="12px">
      <Flex flexDirection="column" gap={4} alignItems="start">
        <Table variant="simple" width="100%" fontSize="10px">
          <Thead bg="gray.200">
            <Tr>
              <Th textTransform="none">Réf</Th>
              <Th textTransform="none">Date d’évaluation</Th>
              <Th textTransform="none">Date limite</Th>
              <Th textTransform="none">Date de clôture</Th>
              <Th textTransform="none">Performance</Th>
              <Th textTransform="none">Attesté</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hasHistory ? (
              riskControl.historyControl.slice(-5).map((controlHistory) => (
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
            <Flex alignItems="start" justifyContent="space-between" gap={2} mt={4}>
              <FormControl>
                <FormLabel fontSize="sm">Performance <span style={{ color: 'red' }}>*</span></FormLabel>
                <Select
                  fontSize="sm"
                  value={formData.performance}
                  onChange={(e) => setFormData(prev => ({ ...prev, performance: e.target.value }))}
                  disabled={isReadOnly}
                >
                  <option value="Not Assessed">Non testé</option>
                  <option value="Needs Improvement">Amélioration nécessaire</option>
                  <option value="Satisfactory">Satisfaisant</option>
                  <option value="Unsatisfactory">Non satisfaisant</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Évalué par</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  placeholder="Nom de l’évaluateur"
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
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                readOnly={isReadOnly}
              />
            </FormControl>
            <Flex alignItems="start" justifyContent="space-between" gap={2} mt={4}>
              <FormControl>
                <FormLabel fontSize="sm">Date d’évaluation <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  placeholder="Date d’évaluation"
                  value={formData.assessedOn}
                  onChange={(e) => setFormData({ ...formData, assessedOn: e.target.value })}
                  readOnly={isReadOnly}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Date limite <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.dueOn}
                  onChange={(e) => setFormData({ ...formData, dueOn: e.target.value })}
                  readOnly={isReadOnly}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Date de clôture</FormLabel>
                <Input
                  fontSize="sm"
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                  readOnly
                />
              </FormControl>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex justifyContent="center" gap={4} mt={6}>
        <Button onClick={handleAmend} fontSize="sm" colorScheme="blue" variant="outline" disabled={isDisabledAmendAttest}>
          Modifier l’évaluation
        </Button>
        <Button onClick={() => handleUpdate(lastHistory?._id, false)} fontSize="sm" colorScheme="red" variant="outline" disabled={isDisabledUnattest}>
          {loading ? "En cours..." : "Désattester"}
        </Button>
        <Button fontSize="sm" colorScheme="green" variant="outline" onClick={() => handleSaveTest(lastHistory?._id, false)} disabled={isDisabledSave}>
          {loadingSave ? "Enregistrement..." : "Enregistrer"}
        </Button>
        <Button onClick={() => handleUpdate(lastHistory?._id, true)} fontSize="sm" colorScheme="blue" variant="outline" disabled={isDisabledToAdmin}>
          {loading ? "En cours..." : "Attester"}
        </Button>
        <Button onClick={handleCancel} fontSize="sm" colorScheme="red" variant="outline">Annuler</Button>
      </Flex>

      <ActionModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSaveAction}
        actionData={actionData}
        setActionData={setActionData}
        profileOptions={profileOptions}
        entitiesOptions={entitiesOptions}
      />
    </Box>
  );
};

export default RiskControlAssessment;
