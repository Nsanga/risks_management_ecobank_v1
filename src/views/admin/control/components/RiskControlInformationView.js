import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel, // Import Chakra UI Tabs components
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import TreeSelect from "./TreeSelect";
import LogTable from "./LogTable";
import DataDisplay from "./DataDisplay";
import RiskControl from "./RiskControl";
import ActionsPanel from "./ActionsPanel";
import RiskPage from "./RiskPage";
import RiskForm from "./RiskForm";
import { connect, useDispatch, useSelector } from "react-redux";
import { AddEntityRiskControl } from "redux/entityRiskControl/action";
import GeneralForm from "./GeneralForm";
import RiskControlAssessment from "./RiskControlAssessment";
import toast from "react-hot-toast";
import ActionCard from "./ActionCard";
import { listEntityActions } from "redux/actions/action";
import { listControlActions } from "redux/actions/action";

const RiskControlInformationView = ({
  isOpen,
  onClose,
  entities,
  profiles,
  isEditMode,
  addSuccess,
  newItemId,
  loading,
  selectedRisk,
  selectedControl,
  currentView,
  indexChoice,
  selectedEntityDescription,
}) => {
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 pour "General", 1 pour "Controls"
  // const [activeSubTab, setActiveSubTab] = useState(0); // 0 pour "Details", 1 pour "History"
  const [selectedFrequency, setSelectedFrequency] = useState("");

  const dispatch = useDispatch();
  const [formDataRiskPage, setFormDataRiskPage] = useState({
    entity: "",
    location: "CAMEROON",
    businessLine: "Consumer",
    cbrDescription: "[N/A]",
    description: "",
    riskCategory: "",
    dismissalCategory: "",
    linkedRisk: "",
    residualSeverity: "",
    residualScore: "0.00",
    residualAnnExp: "0.00",
    riskActions: "0",
    riskStatus: "Approved",
  });

  const [formDataRiskForm, setFormDataRiskForm] = useState({
    ownerRisk: null,
    ownerEmail: false,
    nomineeRisk: null,
    reviewerRisk: null,
    activeRisk: true,
    description: "",
    frequency: "",
    remindOne: "",
    riskDescription: "",
  });

  const [formDataRiskControl, setFormDataRiskControl] = useState({
    controlRef: "",
    controlCategory: "",
    description: "",
    nomineeRisk: null,
    reviewerRisk: null,
    reviewDate: "",
    frequency: "",
    lastOperation: "",
    nextOperation: "",
    frequencyAssessment: "",
    nextAssessment: "",
    keyControl: false,
    activeControl: false,
    monitoringMethodology: "",
    controlSummary: "",
  });

  const actions = useSelector(state => state.ActionReducer.actions);

  const handleChangeRiskPage = (e) => {
    const { name, value } = e.target;
    setFormDataRiskPage((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    const value = selectedOption ? selectedOption.value : null;

    setFormDataRiskPage((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormDataRiskForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormDataRiskControl((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeRiskForm = (e) => {
    const { name, checked, type } = e.target;
    setFormDataRiskForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : e.target.value,
    }));
  };

  const handleChangeRiskControl = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataRiskControl((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatObjectItems = (item, keys) => {
    const formattedItem = {};
    keys.forEach((key) => {
      formattedItem[key] = item[key];
    });
    return formattedItem;
  };

  const handleSave = () => {
    const riskKeys = [
      "activeRisk",
      "description",
      "frequency",
      "nominee",
      "owner",
      "ownerEmail",
      "remindOne",
      "reviewer",
    ];
    const controlKeys = [
      "activeControl",
      "controlCategory",
      "controlRef",
      "description",
      "frequency",
      "lastOperation",
      "nextOperation",
      "frequencyAssessment",
      "nextAssessment",
      "nominee",
      "reviewDate",
      "reviewer",
      "keyControl",
      "monitoringMethodology",
      "controlSummary",
    ];

    const payload = {
      ...formDataRiskPage,
      risks: formatObjectItems(formDataRiskForm, riskKeys),
      controls: formatObjectItems(formDataRiskControl, controlKeys),
    };
    dispatch(AddEntityRiskControl(payload));
  };
  console.log("currentView", currentView);
  useEffect(() => {
    if (currentView === "Controls") {
      setActiveTab(1);
      // setActiveSubTab(0);
    } else {
      setActiveTab(0);
      // setActiveSubTab(0);
    }
  }, [currentView]);

  useEffect(() => {
    if (newItemId) {
      setFormDataRiskForm((prevState) => ({
        ...prevState,
        id: newItemId,
      }));
    }
  }, [newItemId]);

  useEffect(() => {
    dispatch(listControlActions(selectedControl?._id));
  }, [selectedControl]);

  const handleTestControlClick = () => {
    setActiveTab(3); // Passer à l'onglet "Controls"
    // setActiveSubTab(1); // Passer au sous-onglet "History"
  };

  const handleTestControlBySubTabClick = (frequency) => {
    setActiveTab(3); // Passer 0 L4onglet "History"
    setSelectedFrequency(frequency);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formDataRiskControl.controlRef ||
      !formDataRiskControl.nominee ||
      !formDataRiskControl.reviewer
    ) {
      toast({
        title: "Error.",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // console.log("Form submitted:", riskControlData);
    toast({
      title: "Success!",
      description: "Form submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClose = () => {
    onClose();
    setActiveTab(0);
    // setActiveSubTab(0);
    setFormDataRiskForm({
      ownerRisk: null,
      ownerEmail: false,
      nomineeRisk: null,
      reviewerRisk: null,
      activeRisk: true,
      description: "",
      frequency: "",
      remindOne: "",
      riskDescription: "",
    });
    setFormDataRiskControl({
      controlRef: "",
      controlCategory: "",
      description: "",
      nomineeRisk: null,
      reviewerRisk: null,
      reviewDate: "",
      frequency: "",
      lastOperation: "",
      nextOperation: "",
      frequencyAssessment: "",
      nextAssessment: "",
      keyControl: false,
      activeControl: false,
      monitoringMethodology: "",
      controlSummary: "",
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditMode ? "Edit Risk Control" : "Add New Risk Control"}
          </ModalHeader>
          <ModalCloseButton onClose={handleClose} />
          <ModalBody p={4}>
            {/* You can pass selectedRisk data to the RiskPage or any other component as needed */}
            <RiskPage
              riskData={formDataRiskPage}
              handleChange={handleChangeRiskPage}
              handleSelectChange={handleSelectChange}
              isEditMode={isEditMode}
              entities={entities}
              selectedRisk={selectedRisk}
              selectedControl={selectedControl}
            />
            <Tabs
              variant="enclosed"
              mt={6}
              index={activeTab}
              onChange={setActiveTab}
            >
              <TabList>
                <Tab fontSize={12}>General</Tab>
                {/* <Tab fontSize={12} >Goals</Tab> */}
                <Tab fontSize={12}>Controls</Tab>
                <Tab fontSize={12}>Details</Tab>
                <Tab fontSize={12}>History</Tab>
                <Tab fontSize={12}>Actions</Tab>
                <Tab fontSize={12}>Risk focus</Tab>
                <Tab fontSize={12}>Risks logs</Tab>
                <Tab fontSize={12}>Linked items</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <RiskForm
                    riskFormData={formDataRiskForm}
                    handleChange={handleChangeRiskForm}
                    handleSelectChange={handleSelectChange}
                    profiles={profiles}
                    newRiskId={newItemId}
                    onClose={onClose}
                    selectedRisk={selectedRisk}
                    handleTestControlClick={handleTestControlClick}
                    selectedEntityDescription={selectedEntityDescription}
                  />
                </TabPanel>
                {/* <TabPanel>
                  <MyTableComponent />
                </TabPanel> */}
                <TabPanel>
                  <RiskControl
                    riskControlData={formDataRiskControl}
                    handleChange={handleChangeRiskControl}
                    handleSelectChange={handleSelectChange}
                    profiles={profiles}
                    onClose={onClose}
                    selectedControl={selectedControl}
                    // activeSubTab={activeSubTab} // Passer l'état du sous-onglet
                    // setActiveSubTab={setActiveSubTab} // Passer la fonction pour changer le sous-onglet
                    handleTestControlBySubTabClick={
                      handleTestControlBySubTabClick
                    }
                    selectedEntityDescription={selectedEntityDescription}
                    selectedFrequency={selectedFrequency} // Passer la fréquence sélectionnée
                    setSelectedFrequency={setSelectedFrequency} // Passer la fonction pour mettre à jour la fréquence
                  />
                </TabPanel>
                <TabPanel>
                  {/* Import the GeneralForm component */}
                  <GeneralForm
                    formData={formDataRiskControl}
                    handleChange={handleChangeRiskControl}
                    handleSelectChange={handleSelectChange}
                    profiles={profiles}
                    handleSubmit={handleSubmit}
                    selectedControl={selectedControl}
                    handleTestControlBySubTabClick={handleTestControlBySubTabClick}
                    selectedEntityDescription={selectedEntityDescription}
                    onClose={onClose}
                  />
                </TabPanel>

                {/* History Tab Content */}
                <TabPanel>
                  <RiskControlAssessment
                    selectedControl={selectedControl}
                    selectedEntityDescription={selectedEntityDescription}
                    handleChange={handleChangeRiskControl}
                    selectedFrequency={selectedFrequency}
                  />
                </TabPanel>
                <TabPanel>
                  <ActionCard actions={actions} />
                </TabPanel>
                <TabPanel>
                  <TreeSelect />
                </TabPanel>
                <TabPanel>
                  <LogTable />
                </TabPanel>
                <TabPanel>
                  <DataDisplay />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          {/* <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost" onClick={handleSave} isLoading={loading ? true : false} >Save</Button>
                        </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ EntityRiskControlReducer }) => ({
  addSuccess: EntityRiskControlReducer.addSuccess,
  newItemId: EntityRiskControlReducer.newItemId,
  loading: EntityRiskControlReducer.loading,
});

export default connect(mapStateToProps)(RiskControlInformationView);
