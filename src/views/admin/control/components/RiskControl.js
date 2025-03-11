import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import RiskControlAssessment from "./RiskControlAssessment"; // Importation du composant pour l'historique
import GeneralForm from "./GeneralForm"; // Importation du composant GeneralForm (à ajuster selon l'emplacement du fichier)

const RiskControl = ({
  riskControlData,
  profiles,
  handleSelectChange,
  handleChange,
  currentAssoCiate,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!riskControlData.controlRef || !riskControlData.nominee || !riskControlData.reviewer) {
      toast({
        title: "Error.",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("Form submitted:", riskControlData);
    toast({
      title: "Success!",
      description: "Form submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="container" fontSize='12px'>
      <Table variant="simple" mb={6}>
        <Thead bg="blue.100">
          <Tr fontSize='10px'>
            <Th>Ref</Th>
            <Th>Description</Th>
            <Th>Active</Th>
            <Th>Key Ctrl</Th>
            <Th>Last Assess. Date</Th>
            <Th>Last Assess. Design</Th>
            <Th>Last Assess. Performance</Th>
            <Th>Last Assess. Creator</Th>
            <Th>Last Assess. Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{currentAssoCiate.reference}</Td>
            <Td>{currentAssoCiate.controlDescription?.length > 20 ? `${currentAssoCiate.controlDescription.substring(0, 35)}...` : currentAssoCiate.controlDescription}</Td>
            <Td><CheckCircleIcon color="green.500" /></Td>
            <Td>{riskControlData.keyControl ? "Y" : "N"}</Td>
            <Td>Acceptable</Td>
            <Td>Not Assessed</Td>
            <Td>Not Attended</Td>
            <Td>---</Td>
            <Td>---</Td>
          </Tr>
        </Tbody>
      </Table>

      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        mt={6}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)} // Update tab index on tab change
      >
        <TabList>
          <Tab>Details</Tab>
          <Tab>History</Tab>
          <Tab>Documents</Tab>
          <Tab>Actions</Tab>
          <Tab>Risk focus</Tab>
          <Tab>Risks logs</Tab>
          <Tab>Linked items</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Import the GeneralForm component */}
            <GeneralForm
              formData={riskControlData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              profiles={profiles}
              handleSubmit={handleSubmit}
              currentAssoCiate={currentAssoCiate}
            />
          </TabPanel>

          {/* History Tab Content */}
          <TabPanel>
            <RiskControlAssessment />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RiskControl;
