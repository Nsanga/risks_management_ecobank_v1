import React, { useState } from 'react'
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
    ModalFooter, useDisclosure, Tabs, TabList, TabPanels, Tab, TabPanel, // Import Chakra UI Tabs components
    Text
} from '@chakra-ui/react';
import TreeSelect from './TreeSelect';
import LogTable from './LogTable';
import DataDisplay from './DataDisplay';
import RiskControl from './RiskControl';
import MyTableComponent from './MyTableComponent';
import ActionsPanel from './ActionsPanel';
import RiskPage from './RiskPage';
import RiskForm from './RiskForm';

const RiskControlInformationView = ({ isOpen, onClose, entities, profiles, isEditMode }) => {
    const [formDataRiskPage, setFormDataRiskPage] = useState({
        entity: "",
        location: "CAMEROON",
        businessLine: "Consumer",
        cbrDescription: "[N/A]",
        description: "",
        riskCategory: "",
        dismissalCategory: "",
        riskRef: "",
        linkedRisk: "",
        residualSeverity: "",
        residualScore: "0.00 USD",
        residualAnnExp: "0.00 USD",
        riskActions: "0",
        riskStatus: "Approved"
    });

    const [formDataRiskForm, setFormDataRiskForm] = useState({
        owner: "",
        ownerEmailChecked: "",
        nominee: "",
        reviewer: "",
        activeRisk: true,
        description: "",
        frequency: "",
        remindOne: "",
    });

    const [formDataRiskControl, setFormDataRiskControl] = useState({
        controlRef: "",
        controlCategory: "",
        description: "",
        nominee: "",
        reviewer: "",
        reviewDate: "",
        frequency: "",
        lastOperator: "",
        nextOperation: "",
        frequencyAssessment: "",
        nextAssessment: "",
        keyControl: false,
        activeControl: true,
    });

    const handleChangeRiskPage = (e) => {
        const { name, value } = e.target;
        setFormDataRiskPage((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormDataRiskPage((prevData) => ({
            ...prevData,
            [name]: selectedOption ? selectedOption.value : null
        }));
        setFormDataRiskForm((prevData) => ({
            ...prevData,
            [name]: selectedOption ? selectedOption.value : null
        }));

        setFormDataRiskControl((prevData) => ({
            ...prevData,
            [name]: selectedOption ? selectedOption.value : null
        }));
    };

    const handleChangeRiskForm = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDataRiskForm((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleChangeRiskControl = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDataRiskControl((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = () => {
        const payload = {
            riskControlInformations: formDataRiskPage,
            risks: formDataRiskForm,
            controls: formDataRiskControl
        }
        console.log("payload", payload);
        // You can add additional logic for saving the data here
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEditMode ? "Edit Risk Control" : "Add New Risk Control"}</ModalHeader>
                    <ModalBody p={4}>
                        {/* You can pass selectedRisk data to the RiskPage or any other component as needed */}
                        <RiskPage riskData={formDataRiskPage} handleChange={handleChangeRiskPage} handleSelectChange={handleSelectChange} isEditMode={isEditMode} entities={entities} />
                        <Tabs variant='enclosed' mt={6}>
                            <TabList>
                                <Tab fontSize={12} >General</Tab>
                                {/* <Tab fontSize={12} >Goals</Tab> */}
                                <Tab fontSize={12} >Controls</Tab>
                                <Tab fontSize={12} >Actions</Tab>
                                <Tab fontSize={12} >Risk focus</Tab>
                                <Tab fontSize={12} >Risks logs</Tab>
                                <Tab fontSize={12} >Linked items</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <RiskForm riskFormData={formDataRiskForm} handleChange={handleChangeRiskForm} handleSelectChange={handleSelectChange} profiles={profiles} />
                                </TabPanel>
                                {/* <TabPanel>
                                    <MyTableComponent />
                                </TabPanel> */}
                                <TabPanel>
                                    <RiskControl riskControlData={formDataRiskControl} handleChange={handleChangeRiskControl} handleSelectChange={handleSelectChange} profiles={profiles} />
                                </TabPanel>
                                <TabPanel>
                                    <ActionsPanel />
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
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={handleSave}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RiskControlInformationView
