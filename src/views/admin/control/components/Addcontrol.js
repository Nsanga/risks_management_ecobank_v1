import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  RadioGroup,
  Radio,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import RiskControlInformationView from "./RiskControlInformationView";
import AddEntityModal from "views/admin/system/Component/AddEntityModal";
import { IoMove } from "react-icons/io5";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";
import { listEntityRiskControls } from "redux/entityRiskControl/action";
import Loader from "../../../../assets/img/loader.gif";
import { copyEntityRiskControl } from "redux/entityRiskControl/action";
import { moveEntityRiskControl } from "redux/entityRiskControl/action";

function AddControl({ entityRiskControls, loading, entities, profiles }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure for modal control
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // To differentiate between add and edit mode
  const [currentView, setCurrentView] = useState("Risks");
  const [currenChoice, setCurrentChoice] = useState(null);
  const [indexChoice, setIndexChoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCopyOpen, setIsModalCopyOpen] = useState(false);
  const [isModalMoveOpen, setIsModalMoveOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formData, setFormData] = useState({
    entity: null,
    entityMove: null,
    entityCopy: null,
  });
  const [isRadioCopyChecked, setIsRadioCopyChecked] = useState(false);
  const [isRadioMoveChecked, setIsRadioMoveChecked] = useState(false);
  const [selectedEntityDescription, setSelectedEntityDescription] =
    useState(null);
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
    const { _id } = row; // Identifiant unique de la ligne
    if (isChecked) {
      // Ajouter l'ID si la ligne est sélectionnée
      setSelectedRows((prev) => [...prev, _id]);
    } else {
      // Supprimer l'ID si la ligne est désélectionnée
      setSelectedRows((prev) =>
        prev.filter((selectedId) => selectedId !== _id)
      );
    }
  };

  useEffect(() => {
    if (currentView === "Risks") {
      setCurrentChoice(viewData["Controls"]);
    } else if (currentView === "Controls") {
      setCurrentChoice(viewData["Risks"]);
    }
  }, [currentView, viewData]);

  const isRowSelected = (row) => selectedRows.includes(row._id);

  const openModal = () => {
    setSelectedEntity(null);
    setIsModalOpen(true);
  };

  const copyModalOpen = () => {
    setIsModalCopyOpen(true);
  };

  const moveModalOpen = () => {
    setIsModalMoveOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeCopyModal = () => {
    setFormData({ entity: null, entityMove: null, entityCopy: null });
    setIsModalCopyOpen(false);
  };
  const closeMoveModal = () => {
    setFormData({ entity: null, entityMove: null, entityCopy: null });
    setIsModalMoveOpen(false);
  };

  const handleRadioCopyChange = (event) => {
    setIsRadioCopyChecked(event.target.checked);
  };

  const handleRadioMoveChange = (event) => {
    setIsRadioMoveChecked(event.target.checked);
  };

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

  const handleRowClick = (item, index) => {
    setIndexChoice(index);
    setSelectedRisk(item);
    setIsEditMode(true);
    onOpen();
  };

  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`, // Unicité assurée
    value: entity._id,
    label: `ENT${entity.referenceId} CAM - ${entity.description}`,
    description: entity.description,
    fullEntity: entity,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  const handleCopyEntitySelectedChange = (name, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleMoveEntitySelectedChange = (name, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null,
    }));

    if (selectedOption) {
      setSelectedEntity(selectedOption.fullEntity);
      setSelectedEntityDescription(selectedOption.description); // Stocke la description
      // On dispatch l'action pour récupérer les données spécifiques à l'entité
      dispatch(listEntityRiskControls(selectedOption.description));
    }
    setSelectedRows([]);
  };

  const numberOfItems = viewData[currentView].length;

  const handleCopy = async () => {
    const itemType = currentView === "Risks" ? "risk" : "control";
    const selectedIds = selectedRows;
    const targetEntityId = formData.entityCopy;

    // Dispatch l'action de copie et attendez qu'elle soit terminée
    await dispatch(
      copyEntityRiskControl(selectedIds, targetEntityId, itemType)
    );

    // Fermez la modal et rafraîchissez la liste
    closeCopyModal();
    dispatch(listEntityRiskControls(selectedEntityDescription)); // Rafraîchit la liste avec la description
    setIsRadioCopyChecked(false);
    setSelectedRows([]);
    setFormData({ entity: null, entityMove: null, entityCopy: null });
  };

  const handleMove = async () => {
    const itemType = currentView === "Risks" ? "risk" : "control";
    const selectedIds = selectedRows;
    const targetEntityId = formData.entityMove;

    // Dispatch l'action de déplacement et attendez qu'elle soit terminée
    await dispatch(
      moveEntityRiskControl(selectedIds, targetEntityId, itemType)
    );

    // Fermez la modal et rafraîchissez la liste
    closeMoveModal();
    dispatch(listEntityRiskControls(selectedEntityDescription)); // Rafraîchit la liste avec la description
    setIsRadioMoveChecked(false);
    setSelectedRows([]);
    setFormData({ entity: null, entityMove: null, entityCopy: null });
  };

  return (
    <>
      {/* <Flex
        direction="column"
        justifyContent="flex-end"
        align="flex-end"
        mb={5}
        w="100%"
      > */}
        <Flex alignItems="center" justifyContent="space-between">
          <FormControl mr={4} maxW="250px">
            <FormLabel fontSize={18}>Entity</FormLabel>
            <Select
              options={entitiesOptions}
              styles={customStyles}
              placeholder="Select Entity"
              value={entitiesOptions?.find(
                (ent) => ent.value === formData.entity
              )}
              onChange={(selectedOption) =>
                handleSelectChange("entity", selectedOption)
              }
            />
          </FormControl>
          <Flex gap={4}>
            <Button
              fontSize={12}
              onClick={openModal}
              variant="solid"
              colorScheme="blue"
              leftIcon={<AddIcon />}
            >
              Add
            </Button>
            <Button
              fontSize={12}
              variant="solid"
              colorScheme="green"
              leftIcon={<EditIcon />}
              disabled={!selectedEntity}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Amend
            </Button>
          </Flex>
        </Flex>
      {/* </Flex> */}
      <Flex
        direction="column"
        justifyContent="center"
        align="center"
        mb={5}
        w="100%"
      >
        {/* Modal for Adding or Editing Controls */}
        {selectedRisk && (
          <RiskControlInformationView
            isOpen={isOpen}
            onClose={onClose}
            selectedRisk={selectedRisk}
            isEditMode={isEditMode}
            entities={entities}
            profiles={profiles}
            currenChoice={currenChoice}
            indexChoice={indexChoice}
          />
        )}

        <Box w="100%" p={4} mt={4} borderWidth="1px" borderRadius="lg">
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            {/* <FormControl fontSize={12} mr={4} maxW="150px">
              <FormLabel fontSize={12}>RAM</FormLabel>
              <Input fontSize={12} placeholder="RAM Value" />
            </FormControl>
            <FormControl maxW="150px">
              <FormLabel fontSize={12}>Owner</FormLabel>
              <Input fontSize={12} placeholder="Owner Name" />
            </FormControl> */}
          </Flex>

          {/* Toggle between different views */}
          <Flex direction="row" alignItems="center" mb={4}>
            <Box fontSize={12} mr={4}>
              Show:
            </Box>
            <RadioGroup
              defaultValue="Risks"
              onChange={(value) => setCurrentView(value)}
            >
              <HStack spacing={4}>
                {Object.keys(viewData).map((view) => (
                  <Radio
                    size="sm"
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
              <Input
                fontSize={12}
                type="number"
                value={numberOfItems}
                readOnly
              />
            </FormControl>
            <FormControl maxW="250px">
              <FormLabel fontSize={12}>
                Total Annual Residual Exposure
              </FormLabel>
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
                  <Th fontSize={10}></Th>{" "}
                  {/* Colonne pour les cases à cocher */}
                  {columnsByView[currentView].map((col) => (
                    <Th fontSize={10} key={col.key}>
                      {col.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              {loading ? (
                <Flex alignItems="center" justifyContent="center" width="100%">
                  <Image src={Loader} alt="Loading..." height={25} width={25} />
                </Flex>
              ) : (
                <Tbody>
                  {viewData[currentView].map((row, index) => (
                    <Tr key={index} cursor="pointer">
                      {/* Case à cocher */}
                      <Td>
                        <Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(row, e.target.checked)
                          }
                          isChecked={isRowSelected(row)}
                        />
                      </Td>
                      {/* Données des colonnes */}
                      {columnsByView[currentView].map((col) => (
                        <Td
                          fontSize={12}
                          key={col.key}
                          onClick={() => handleRowClick(row, index)}
                        >
                          {row[col.key]?.length > 20 ? `${row[col.key].substring(0, 16)}...` : row[col.key]}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
          </>
        ) : (
          <Flex
            fontSize={12}
            mt={4}
            p={4}
            justifyContent="end"
            alignItems="center"
          >
            No data available for {currentView}
          </Flex>
        )}
      </Flex>
      {selectedRows.length > 0 && (
        <HStack mt={4} spacing={4} justifyContent="start">
          <Button colorScheme="blue" fontSize={12} leftIcon={<EditIcon />}>
            Bulk Amend
          </Button>
          <Button
            colorScheme="teal"
            fontSize={12}
            leftIcon={<IoMove />}
            onClick={moveModalOpen}
          >
            Move {currentView === "Risks" ? "Risk" : "Control"}
          </Button>
          <Button
            colorScheme="green"
            fontSize={12}
            leftIcon={<CopyIcon />}
            onClick={copyModalOpen}
          >
            Copy {currentView === "Risks" ? "Risk" : "Control"}
          </Button>
        </HStack>
      )}

      {/* Modal for Move */}
      <Modal isCentered isOpen={isModalMoveOpen} onClose={closeMoveModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={12}>
            Move {currentView === "Risks" ? "Risk" : "Control"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>From Entity :</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>To Entity :</Text>
                <Box width={280}>
                  <Select
                    options={entitiesOptions}
                    styles={customStyles}
                    placeholder="Select Entity"
                    value={entitiesOptions?.find(
                      (ent) => ent.value === formData.entityMove
                    )}
                    onChange={(selectedOption) =>
                      handleMoveEntitySelectedChange(
                        "entityMove",
                        selectedOption
                      )
                    }
                  />
                </Box>
              </Flex>
              <Radio
                size="sm"
                name="1"
                colorScheme="blue"
                onChange={handleRadioMoveChange}
              >
                <span style={{ fontSize: 12 }}>
                  Move {currentView === "Risks" ? "Control" : "Risk"}
                </span>
              </Radio>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} justifyContent="start">
              <Button
                colorScheme="blue"
                fontSize={12}
                leftIcon={<CheckIcon />}
                onClick={handleMove}
                isLoading={loading}
                isDisabled={!isRadioMoveChecked || !formData.entityMove}
              >
                Move
              </Button>
              <Button
                colorScheme="red"
                fontSize={12}
                leftIcon={<CloseIcon />}
                onClick={closeMoveModal}
              >
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Copy */}
      <Modal isCentered isOpen={isModalCopyOpen} onClose={closeCopyModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={12}>
            Copy {currentView === "Risks" ? "Risk" : "Control"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>From Entity :</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>To Entity :</Text>
                <Box width={280}>
                  <Select
                    options={entitiesOptions}
                    styles={customStyles}
                    placeholder="Select Entity"
                    value={entitiesOptions?.find(
                      (ent) => ent.value === formData.entityCopy
                    )}
                    onChange={(selectedOption) =>
                      handleCopyEntitySelectedChange(
                        "entityCopy",
                        selectedOption
                      )
                    }
                  />
                </Box>
              </Flex>
              <Radio
                size="sm"
                name="1"
                colorScheme="blue"
                onChange={handleRadioCopyChange}
              >
                <span style={{ fontSize: 12 }}>
                  Copy {currentView === "Risks" ? "Control" : "Risk"}
                </span>
              </Radio>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} justifyContent="start">
              <Button
                colorScheme="blue"
                fontSize={12}
                leftIcon={<CheckIcon />}
                onClick={handleCopy}
                isLoading={loading}
                isDisabled={!isRadioCopyChecked || !formData.entityCopy}
              >
                Copy
              </Button>
              <Button
                colorScheme="red"
                fontSize={12}
                leftIcon={<CloseIcon />}
                onClick={closeCopyModal}
              >
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal always rendered, only the selectedEntity is conditionally passed */}
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
