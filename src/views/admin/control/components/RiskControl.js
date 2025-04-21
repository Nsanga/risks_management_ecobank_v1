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
import ActionCard from "./ActionCard";

const RiskControl = ({
  riskControlData,
  profiles,
  handleSelectChange,
  handleChange,
  selectedControl,
  activeSubTab,
  setActiveSubTab,
  handleTestControlBySubTabClick,
  selectedEntityDescription,
  actions,
  selectedFrequency,
  onClose
}) => {
  const toast = useToast();

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

    // console.log("Form submitted:", riskControlData);
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
            <Th textTransform="none">Ref</Th>
            <Th textTransform="none">Description</Th>
            <Th textTransform="none">Active</Th>
            <Th textTransform="none">Key Ctrl</Th>
            <Th textTransform="none">Last Ass. Date</Th>
            <Th textTransform="none">Last Ass. Perf.</Th>
            <Th textTransform="none">Last Ass. Creator</Th>
            <Th textTransform="none">Last Assess. Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{selectedControl?.reference}</Td>
            <Td>
              {(() => {
                const description = selectedControl?.controlDescription;
                if (description) {
                  return description.length > 20
                    ? `${description.substring(0, 35)}...`
                    : description;
                }
                return null; // Ou une valeur par défaut si nécessaire
              })()}
            </Td>
            <Td>
              {selectedControl?.activeControl ? (
                <CheckCircleIcon color="green.500" />
              ) : (
                <IoCloseCircle color="red.500" />
              )}
            </Td>
            <Td>
              {selectedControl?.keyControl ? "Y" : "N"}
            </Td>
            {(selectedControl?.historyControl && selectedControl.historyControl.length > 0) && (
              <>
                <Td>
                  {selectedControl?.historyControl?.[0]?.dueOn ||
                    "N/A"} {/* Valeur par défaut si aucune date n'est disponible */}
                </Td>
                <Td>
                  {selectedControl?.historyControl?.[0]?.performance ||
                    "N/A"} {/* Valeur par défaut si aucune performance n'est disponible */}
                </Td>
                <Td>
                  {selectedControl?.historyControl?.[0]?.assessedBy ||
                    "N/A"} {/* Valeur par défaut si aucun évaluateur n'est disponible */}
                </Td>
              </>
            )}
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
              handleChange={handleChange}
              selectedFrequency={selectedFrequency}
            />
          </TabPanel>
          <TabPanel>
            <ActionCard actions={actions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RiskControl;
