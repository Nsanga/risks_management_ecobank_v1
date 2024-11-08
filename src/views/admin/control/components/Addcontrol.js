import React, { useEffect, useState } from 'react';
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
  Image,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon, CopyIcon, EditIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import RiskControlInformationView from './RiskControlInformationView';
import AddEntityModal from 'views/admin/system/Component/AddEntityModal';
import { IoMove } from 'react-icons/io5';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { listEntityRiskControls } from 'redux/entityRiskControl/action';
import Loader from '../../../../assets/img/loader.gif'

function AddControl({ entityRiskControls, loading, entities, profiles }) {
  const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure for modal control
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);  // To differentiate between add and edit mode
  const [currentView, setCurrentView] = useState("Risks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formData, setFormData] = useState({ entity: null });
  const { isOpen: isMoveModalOpen, onOpen: onMoveModalOpen, onClose: onMoveModalClose } = useDisclosure();
  const { isOpen: isCopyModalOpen, onOpen: onCopyModalOpen, onClose: onCopyModalClose } = useDisclosure();
  const [viewData, setViewData] = useState({
    Risks: [],
    Controls: [],
    Events: [],
    Actions: [],
    Kits: [],
    Obligations: [],
  });
  const dispatch = useDispatch();

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
    setSelectedEntity(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const columnsByView = {
    Risks: [
      { label: "Reference Id", key: "reference" },
      { label: "Description", key: "riskSummary" },
      { label: "Owner", key: "ownerRisk" },
      { label: "Nominee", key: "nomineeRisk" },
      { label: "Reviewer", key: "reviewerRisk" },
      { label: "Category", key: "riskCategory" },
      // { label: "Residual Exposure", key: "exposure" },
    ],
    Controls: [
      { label: "Reference Id", key: "reference" },
      { label: "Description", key: "controlSummary" },
      { label: "Library", key: "library" }, // Adjust this according to actual data structure
      { label: "Category", key: "preventiveDetectiveControl" },
      { label: "Owner", key: "ownerControl" },
      { label: "Nominee", key: "nomineeControl" },
      { label: "Reviewer", key: "reviewerControl" },
    ],
  };
  
  useEffect(() => {
    setViewData({
      Risks: [],
      Controls: [],
      Events: [],
      Actions: [],
      Kits: [],
      Obligations: [],
    });
  }, []); // Le tableau de dépendances vide signifie que cela ne s'exécute qu'une seule fois lors du montage

  useEffect(() => {
    // Mettre à jour viewData lorsque entityRiskControls change
    if (entityRiskControls.length > 0) {
      setViewData({
        Risks: entityRiskControls[0]?.risks || [],
        Controls: entityRiskControls[0]?.controls || [],
        Events: [],
        Actions: [],
        Kits: [],
        Obligations: [],
      });
    } else {
      // Réinitialiser viewData si entityRiskControls est vide
      setViewData({
        Risks: [],
        Controls: [],
        Events: [],
        Actions: [],
        Kits: [],
        Obligations: [],
      });
    }
  }, [entityRiskControls]);

  const handleRowClick = (item) => {
    setSelectedRisk(item);  // Save the clicked row's data for editing
    setIsEditMode(true);    // Set edit mode
    onOpen();               // Open the modal
  };

  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`, // Unicité assurée
    value: entity._id,
    label: `ENT${entity.referenceId} CAM - ${entity.description}`,
    description: entity.description,
    fullEntity: entity
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

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null,
    }));

    if (selectedOption) {
      setSelectedEntity(selectedOption.fullEntity);

      setViewData({
        Risks: [],
        Controls: [],
        Events: [],
        Actions: [],
        Kits: [],
        Obligations: [],
      });
      // On dispatch l'action pour récupérer les données spécifiques à l'entité
      dispatch(listEntityRiskControls(selectedOption.description));
    }
  };

  const numberOfItems = viewData[currentView].length;

  return (
    <>
      <Flex direction="column" justifyContent="flex-end" align="flex-end" mb={5} w="100%">
        <Flex gap={4}>
          <Button fontSize={12} onClick={openModal} variant="solid" colorScheme="blue" leftIcon={<AddIcon />}>
            Add
          </Button>
          <Button fontSize={12} variant="solid" colorScheme="green" leftIcon={<EditIcon />} disabled={!selectedEntity}
          onClick={() => {
            setIsModalOpen(true);
          }}>
            Amend
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" justifyContent="center" align="center" mb={5} w="100%">
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
              <Select
                options={entitiesOptions}
                styles={customStyles}
                placeholder='Select Entity'
                value={entitiesOptions?.find(ent => ent.value === formData.entity)}
                onChange={(selectedOption) => handleSelectChange('entity', selectedOption)}
              />
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
              <Select styles={customStyles} placeholder="Filter by" />
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
              {loading ? (
                <Flex alignItems='center' justifyContent='center'>
                  <Image src={Loader} alt="Loading..." height={50} width={50} />
                </Flex>
              ) :
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
                </Tbody>}
            </Table>
          </>
        ) : (
          <Flex fontSize={12} mt={4} p={4} justifyContent='end' alignItems='center'>
            No data available for {currentView}
          </Flex>
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
                Move
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

      {/* Modal always rendered, only the selectedEntity is conditionally passed */}
      <AddEntityModal
       isOpen={isModalOpen}
       onClose={closeModal}
       profiles={profiles}
      />

      {selectedEntity && (
        <AddEntityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        loading={loading}
        selectedEntity={selectedEntity}
        profiles={profiles}
      />
      )}
    </>
  );
}

const mapStateToProps = ({ EntityRiskControlReducer }) => ({
  entityRiskControls: EntityRiskControlReducer.entityRiskControls,
  loading: EntityRiskControlReducer.loading,
});

export default connect(mapStateToProps)(AddControl);
