import React, { useState } from 'react';
import {
  FormControl, FormLabel, Input, Flex,
  Box, RadioGroup, Radio, HStack, Table, Thead, Tbody, Tr, Th, Td,
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon, CopyIcon, EditIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import RiskControlInformationView from './RiskControlInformationView';
import AddEntityModal from 'views/admin/system/Component/AddEntityModal';
import { IoMove } from 'react-icons/io5';
import Select from 'react-select';

function AddControl({ riskControls, entities, profiles }) {
  const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure for modal control
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);  // To differentiate between add and edit mode
  const [currentView, setCurrentView] = useState("Risks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({ entity: null });
  const { isOpen: isMoveModalOpen, onOpen: onMoveModalOpen, onClose: onMoveModalClose } = useDisclosure();
  const { isOpen: isCopyModalOpen, onOpen: onCopyModalOpen, onClose: onCopyModalClose } = useDisclosure();

  // Gestion de la sélection des cases à cocher
  const handleCheckboxChange = (row, isChecked) => {
    const { refId } = row;
    if (isChecked) {
      setSelectedRows((prev) => [...prev, refId]); // Add the row's refId
    } else {
      setSelectedRows((prev) => prev.filter((selectedId) => selectedId !== refId)); // Remove the row's refId if unchecked
    }
  };

  const isRowSelected = (row) => selectedRows.includes(row.refId); // Check if the row's refId is in selectedRows

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const risksData = [
    {
      refId: 'RISK001',
      keyRiskSummary: 'Risk of data breach',
      owner: 'John Doe',
      nominee: 'Jane Smith',
      reviewer: 'Robert Brown',
      category: 'Cybersecurity',
      exposure: 'High',
    },
    {
      refId: 'RISK002',
      keyRiskSummary: 'Risk of financial loss',
      owner: 'Alice Johnson',
      nominee: 'Michael Green',
      reviewer: 'Emma Wilson',
      category: 'Finance',
      exposure: 'Medium',
    },
    {
      refId: 'RISK003',
      keyRiskSummary: 'Risk of regulatory non-compliance',
      owner: 'David Lee',
      nominee: 'Laura White',
      reviewer: 'Henry Martin',
      category: 'Compliance',
      exposure: 'Low',
    },
    {
      refId: 'RISK004',
      keyRiskSummary: 'Risk of equipment failure',
      owner: 'Sarah Black',
      nominee: 'Daniel Gray',
      reviewer: 'Sophia Harris',
      category: 'Operations',
      exposure: 'High',
    },
    {
      refId: 'RISK005',
      keyRiskSummary: 'Risk of market downturn',
      owner: 'James Scott',
      nominee: 'Emily Clark',
      reviewer: 'Liam Taylor',
      category: 'Market',
      exposure: 'Medium',
    }
  ];

  const controlsData = [
    {
      refId: 'CONTROL001',
      keyRiskSummary: 'Control for data breach',
      library: 'Cybersecurity Library',
      category: 'Cybersecurity',
      owner: 'John Doe',
      nominee: 'Jane Smith',
      reviewer: 'Robert Brown',
    },
    {
      refId: 'CONTROL002',
      keyRiskSummary: 'Control for financial risk',
      library: 'Finance Control Library',
      category: 'Finance',
      owner: 'Alice Johnson',
      nominee: 'Michael Green',
      reviewer: 'Emma Wilson',
    },
    {
      refId: 'CONTROL003',
      keyRiskSummary: 'Control for regulatory compliance',
      library: 'Compliance Control Library',
      category: 'Compliance',
      owner: 'David Lee',
      nominee: 'Laura White',
      reviewer: 'Henry Martin',
    },
    {
      refId: 'CONTROL004',
      keyRiskSummary: 'Control for equipment failure',
      library: 'Operations Control Library',
      category: 'Operations',
      owner: 'Sarah Black',
      nominee: 'Daniel Gray',
      reviewer: 'Sophia Harris',
    },
    {
      refId: 'CONTROL005',
      keyRiskSummary: 'Control for market risk',
      library: 'Market Control Library',
      category: 'Market',
      owner: 'James Scott',
      nominee: 'Emily Clark',
      reviewer: 'Liam Taylor',
    }
  ];

  // Dynamically map the data to the selected view
  const viewData = {
    Risks: risksData || [],
    Controls: controlsData || [],
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

  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`, // Unicité assurée
    value: entity._id,
    label: `ENT${entity.referenceId} CAM - ${entity.description}`,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px'
    })
  };

  const numberOfItems = viewData[currentView].length;

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prevState => {
      const updatedFormData = {
        ...prevState,
        [name]: selectedOption ? selectedOption.value : null,
      };
      return updatedFormData;
    });
  };

  return (
    <>
      <Flex direction="column" justifyContent="flex-end" align="flex-end" mb={5} w="100%">
        <Flex gap={4}>
          <Button fontSize={12} onClick={openModal} variant="solid" colorScheme="blue" leftIcon={<AddIcon />}>
            Add
          </Button>
          <Button fontSize={12} variant="solid" colorScheme="green" leftIcon={<EditIcon />}>
            Amend
          </Button>
        </Flex>

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
              <Select styles={customStyles} placeholder="Select entity" />
                {/* <option value="entity1">Entity 1</option>
                <option value="entity2">Entity 2</option> */}
            </FormControl>
            <FormControl fontSize={12} mr={4} maxW="150px">
              <FormLabel fontSize={12}>RAM</FormLabel>
              <Input fontSize={12} placeholder="RAM Value" />
            </FormControl>
            <FormControl maxW="150px">
              <FormLabel fontSize={12}>Owner</FormLabel>
              <Input fontSize={12} placeholder="Owner Name" />
            </FormControl>
          </Flex>

          {/* Toggle between different views */}
          <Flex direction="row" alignItems="center" mb={4}>
            <Box fontSize={12} mr={4}>Show:</Box>
            <RadioGroup defaultValue="Risks" onChange={(value) => setCurrentView(value)}>
              <HStack spacing={4}>
                {Object.keys(viewData).map((view) => (
                  <Radio
                    size='sm'
                    key={view}
                    value={view}
                    isDisabled={viewData[view].length === 0} // Disable if no data
                  >
                    <span style={{ fontSize: 12 }}>{view}</span>
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>
          </Flex>

          {/* Filters */}
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <FormControl mr={4} maxW="200px">
              <FormLabel fontSize={12}>Filter on</FormLabel>
              <Select styles={customStyles} placeholder="Filter by"/>
                {/* <option value="approved">Approved</option>
                <option value="pending">Pending</option> */}
            </FormControl>
            <FormControl mr={4} maxW="150px">
              <FormLabel fontSize={12}>Status</FormLabel>
              <Select styles={customStyles} placeholder="Select status" />
                {/* <option value="active">Active</option>
                <option value="inactive">Inactive</option> */}
              
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
          <>
            <Table variant="simple" mt={4}>
              <Thead>
                <Tr>
                  <Th fontSize={10}></Th> {/* Colonne pour les cases à cocher */}
                  {columnsByView[currentView].map((col) => (
                    <Th fontSize={10} key={col.key}>
                      {col.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {viewData[currentView].map((row, index) => (
                  <Tr key={index} cursor="pointer">
                    {/* Case à cocher */}
                    <Td>
                      <Checkbox
                        onChange={(e) => handleCheckboxChange(row, e.target.checked)}
                        isChecked={isRowSelected(row)}
                      />
                    </Td>
                    {/* Données des colonnes */}
                    {columnsByView[currentView].map((col) => (
                      <Td fontSize={12} key={col.key} onClick={() => handleRowClick(row)}>
                        {row[col.key]}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        ) : (
          <Box fontSize={12} mt={4} p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
            No data available for {currentView}
          </Box>
        )}
      </Flex>
      {selectedRows.length > 0 && (
        <HStack mt={4} spacing={4} justifyContent='start'>
          <Button colorScheme="blue" fontSize={12} leftIcon={<EditIcon />} >
            Bulk Amend
          </Button>
          <Button colorScheme="teal" fontSize={12} leftIcon={<IoMove />} onClick={onMoveModalOpen}>
            Move Risk
          </Button>
          <Button colorScheme="green" fontSize={12} leftIcon={<CopyIcon />} onClick={onCopyModalOpen}>
            Copy Risk
          </Button>
        </HStack>
      )}

      {/* Modal for Move */}
      <Modal isCentered isOpen={isMoveModalOpen} onClose={onMoveModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={12}>Move Risk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap={4}>
              <Flex justifyContent='space-between' alignItems="center">
                <Text fontSize={12}>From Entity :</Text>
              </Flex>
              <Flex justifyContent='space-between' alignItems="center">
                <Text fontSize={12}>To Entity :</Text>
                <Box width={280}>
                  <Select
                    options={entitiesOptions}
                    styles={customStyles}
                    placeholder='Select Entity'
                    value={entitiesOptions?.find(ent => ent.value === formData.entity)}
                    onChange={(selectedOption) => handleSelectChange('entity', selectedOption)}
                  />
                </Box>
              </Flex>
              <Radio size='sm' name='1' colorScheme='blue'>
                <span style={{ fontSize: 12 }}>Copy Control</span>
              </Radio>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} justifyContent='start'>
              <Button colorScheme="blue" fontSize={12} leftIcon={<CheckIcon />} >
                Copy
              </Button>
              <Button colorScheme="red" fontSize={12} leftIcon={<CloseIcon />} onClick={onMoveModalClose}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Copy */}
      <Modal isCentered isOpen={isCopyModalOpen} onClose={onCopyModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={12}>Copy Risk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap={4}>
              <Flex justifyContent='space-between' alignItems="center">
                <Text fontSize={12}>From Entity :</Text>
              </Flex>
              <Flex justifyContent='space-between' alignItems="center">
                <Text fontSize={12}>To Entity :</Text>
                <Box width={280}>
                  <Select
                    options={entitiesOptions}
                    styles={customStyles}
                    placeholder='Select Entity'
                    value={entitiesOptions?.find(ent => ent.value === formData.entity)}
                    onChange={(selectedOption) => handleSelectChange('entity', selectedOption)}
                  />
                </Box>
              </Flex>
              <Radio size='sm' name='1' colorScheme='blue'>
                <span style={{ fontSize: 12 }}>Copy Control</span>
              </Radio>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} justifyContent='start'>
              <Button colorScheme="blue" fontSize={12} leftIcon={<CheckIcon />} >
                Copy
              </Button>
              <Button colorScheme="red" fontSize={12} leftIcon={<CloseIcon />} onClick={onCopyModalClose}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AddEntityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        profiles={profiles}
      />
    </>
  );
}

export default AddControl;
