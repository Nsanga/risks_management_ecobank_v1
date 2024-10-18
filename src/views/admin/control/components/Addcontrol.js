import React, { useState } from 'react';
import {
  FormControl, FormLabel, Input, Flex,
  Box, Select, RadioGroup, Radio, HStack, Table, Thead, Tbody, Tr, Th, Td,
  Button,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import RiskControlInformationView from './RiskControlInformationView';

function AddControl({ riskControls, entities, profiles }) {
  const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure for modal control
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);  // To differentiate between add and edit mode
  const [currentView, setCurrentView] = useState("Risks");

  // Dynamically map the data to the selected view
  const viewData = {
    Risks: riskControls[0]?.risks || [],
    Controls: riskControls[0]?.controls || [],
    Events: [],
    Actions: [],
    Kits: [],
    Obligations: [],
  };

  const columnsByView = {
    Risks: [
      { label: "Reference Id", key: "refId" },
      { label: "Description", key: "keyRiskSummary" },
      { label: "Owner", key: "owner" },
      { label: "Nominee", key: "nominee" },
      { label: "Reviewer", key: "reviewer" },
      { label: "Category", key: "category" },
      { label: "Residual Exposure", key: "exposure" },
    ],
    Controls: [
      { label: "Reference Id", key: "refId" },
      { label: "Description", key: "keyRiskSummary" },
      { label: "Library", key: "library" }, // Adjust this according to actual data structure
      { label: "Category", key: "category" },
      { label: "Owner", key: "owner" },
      { label: "Nominee", key: "nominee" },
      { label: "Reviewer", key: "reviewer" },
    ],
  };

  const handleRowClick = (item) => {
    setSelectedRisk(item);  // Save the clicked row's data for editing
    setIsEditMode(true);    // Set edit mode
    onOpen();               // Open the modal
  };

  const handleAddControlClick = () => {
    setSelectedRisk(null);  // Reset the selected risk (no data for new control)
    setIsEditMode(false);   // Set add mode
    onOpen();               // Open the modal
  };

  const numberOfItems = viewData[currentView].length;

  return (
    <>
      <Flex direction="column" justifyContent="flex-end" align="flex-end" mb={5} w="100%">
        {/* Button for Adding a New Control */}
        <Button  fontSize={12} onClick={handleAddControlClick} variant="outline" color="blue" leftIcon={<AddIcon />}>
          Add Control
        </Button>

        {/* Modal for Adding or Editing Controls */}
        <RiskControlInformationView
          isOpen={isOpen}
          onClose={onClose}
          selectedRisk={selectedRisk}
          isEditMode={isEditMode}
          entities={entities}
          profiles={profiles}
        />

        <Box w="100%" p={4} mt={4} borderWidth="1px" borderRadius="lg">
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <FormControl mr={4} maxW="250px">
              <FormLabel fontSize={12}>Entity</FormLabel>
              <Select fontSize={12} placeholder="Select entity">
                <option value="entity1">Entity 1</option>
                <option value="entity2">Entity 2</option>
              </Select>
            </FormControl>
            <FormControl fontSize={12} mr={4} maxW="150px">
              <FormLabel  fontSize={12}>RAM</FormLabel>
              <Input fontSize={12} isDisabled placeholder="RAM Value" />
            </FormControl>
            <FormControl maxW="150px">
              <FormLabel fontSize={12}>Owner</FormLabel>
              <Input fontSize={12} isDisabled placeholder="Owner Name" />
            </FormControl>
          </Flex>

          {/* Toggle between different views */}
          <Flex direction="row" align="center" mb={4}>
            <FormLabel fontSize={12} mr={4}>Show:</FormLabel>
            <RadioGroup defaultValue="Risks" onChange={(value) => setCurrentView(value)}>
              <HStack spacing={4}>
                {Object.keys(viewData).map((view) => (
                  <Radio
                    key={view}
                    value={view}
                    isDisabled={viewData[view].length === 0} // Disable if no data
                  >
                    <span style={{fontSize: 12}}>{view}</span>
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>
          </Flex>

          {/* Filters */}
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <FormControl mr={4} maxW="200px">
              <FormLabel fontSize={12}>Filter on</FormLabel>
              <Select fontSize={12} placeholder="All Approval State">
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </Select>
            </FormControl>
            <FormControl mr={4} maxW="150px">
              <FormLabel fontSize={12}>Status</FormLabel>
              <Select fontSize={12} placeholder="Select Status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </FormControl>
            <FormControl mr={4} maxW="150px">
              <FormLabel fontSize={12}>Number of {currentView}</FormLabel>
              <Input fontSize={12} type="number" value={numberOfItems} readOnly />
            </FormControl>
            <FormControl maxW="250px">
              <FormLabel fontSize={12}>Total Annual Residual Exposure</FormLabel>
              <Input fontSize={12} placeholder="$0.00" />
            </FormControl>
          </Flex>
        </Box>

        {/* Table for the selected view */}
        {numberOfItems > 0 ? (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                {columnsByView[currentView].map((col) => (
                  <Th  fontSize={10} key={col.key}>{col.label}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {viewData[currentView].map((row, index) => (
                <Tr key={index} onClick={() => handleRowClick(row)} cursor="pointer">
                  {columnsByView[currentView].map((col) => (
                    <Td fontSize={12} key={col.key}>{row[col.key]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Box fontSize={12} mt={4} p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
            No data available for {currentView}
          </Box>
        )}
      </Flex>
    </>
  );
}

export default AddControl;
