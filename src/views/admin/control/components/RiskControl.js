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
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import RiskControlAssessment from "./RiskControlAssessment"; // Importation du composant pour l'historique
import GeneralForm from "./GeneralForm"; // Importation du composant GeneralForm (à ajuster selon l'emplacement du fichier)
import { IoCloseCircle } from "react-icons/io5";

const RiskControl = ({
  riskControlData,
  profiles,
  handleSelectChange,
  handleChange,
  currentAssoCiate,
  activeSubTab,
  setActiveSubTab,
  handleTestControlBySubTabClick,
  selectedEntityDescription,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  console.log("currentAssoCiate", currentAssoCiate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !riskControlData.controlRef ||
      !riskControlData.nominee ||
      !riskControlData.reviewer
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
    <Box className="container" fontSize="12px">
      <Table variant="simple" mb={6}>
        <Thead bg="blue.100">
          <Tr fontSize="10px">
            <Th>Ref</Th>
            <Th>Description</Th>
            <Th>Active</Th>
            <Th>Key Ctrl</Th>
            <Th>Last Ass. Date</Th>
            <Th>Last Ass. Perf.</Th>
            <Th>Last Ass. Creator</Th>
            <Th>Last Assess. Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{currentAssoCiate?.reference}</Td>
            <Td>
              {currentAssoCiate?.controlDescription?.length > 20
                ? `${currentAssoCiate?.controlDescription.substring(0, 35)}...`
                : currentAssoCiate?.controlDescription}
            </Td>
            <Td>
              {currentAssoCiate?.activeControl ? (
                <CheckCircleIcon color="green.500" />
              ) : (
                <IoCloseCircle color="red.500" />
              )}
            </Td>
            <Td>{currentAssoCiate?.keyControl ? "Y" : "N"}</Td>
            <Td>
              {currentAssoCiate?.historyControl?.length
                ? currentAssoCiate?.historyControl[0]?.dueOn
                : ""}
            </Td>
            <Td>
              {currentAssoCiate?.historyControl?.length
                ? currentAssoCiate?.historyControl[0]?.performance
                : ""}
            </Td>
            <Td>
              {currentAssoCiate?.historyControl?.length
                ? currentAssoCiate?.historyControl[0]?.assessedBy
                : ""}
            </Td>
            <Td>---</Td>
          </Tr>
        </Tbody>
      </Table>

      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        mt={6}
        index={activeSubTab}
        onChange={setActiveSubTab}
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
              handleTestControlBySubTabClick={handleTestControlBySubTabClick}
              selectedEntityDescription={selectedEntityDescription}
            />
          </TabPanel>

          {/* History Tab Content */}
          <TabPanel>
            <RiskControlAssessment
              currentAssoCiate={currentAssoCiate}
              selectedEntityDescription={selectedEntityDescription}
              handleChange={handleChange}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RiskControl;
