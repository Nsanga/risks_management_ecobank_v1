import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
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
  ModalCloseButton,
  ModalBody,
  Text,
  Image,
  useDisclosure,
  FormControl,
  FormLabel,
  ModalHeader,
  ModalFooter,
  HStack,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { connect, useDispatch } from "react-redux";
import { listKeyIndicator } from "redux/kri/action";
import Loader from '../../../../assets/img/loader.gif';
import Select from "react-select";
import KeyIndicatorComponent from "./KeyIndicatorComponent"; // ajuste le path selon ton projet
import { listEntityKeyIndicators } from "redux/kri/action";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { updateKeyIndicator } from "redux/kri/action";

const truncateWords = (text = "", limit = 40) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const KriCard = ({ keyIndicator, loading, entities, profiles, selectedEntity, setSelectedEntity, isRCSA=false }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedKri, setSelectedKri] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [owner, setOwner] = React.useState(null);
  const [nominee, setNominee] = React.useState(null);
  const [reviewer, setReviewer] = React.useState(null);
  const [isModalBulkAmendOpen, setIsModalBulkAmendOpen] = useState(false);
  const [formData, setFormData] = useState({
    entity: null,
  });
  const [viewData, setViewData] = useState({
    KIs: [],
  });

  const isRowSelected = (row) => selectedRows.includes(row._id);
  const toast = useToast();

  const columnsByView = {
    KIs: [
      { label: "Reference Id", key: "reference" },
      { label: "Description", key: "riskIndicatorDescription" },
      { label: "Category", key: "category" },
      { label: "Type", key: "type" },
      { label: "Frequency", key: "frequenceKeyIndicator" },
      { label: "Trend", key: "trend" },
      { label: "Status", key: "status" },
      { label: "Average", key: "calculMethodKeyIndicator" },
      { label: "Owner", key: "ownerKeyIndicator" },
      { label: "Nominee", key: "nomineeKeyIndicator" },
      { label: "Reviewer", key: "reviewerKeyIndicator" },
    ],
  };

  useEffect(() => {
    setViewData({
      KIs: keyIndicator || [],
    });
  }, [keyIndicator]);

  // Préparation des options pour les profils
  const profilesOptions = React.useMemo(() => {
    if (!Array.isArray(profiles)) return []; // Handle non-array cases

    return profiles
      .filter(profile => profile?.activeUser)
      .map(profile => ({
        value: profile?._id,
        label: [profile?.name, profile?.surname].filter(Boolean).join(' ') || 'Unnamed Profile',
        profile,
        email: profile?.email
      }));
  }, [profiles]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Sélectionner tous les IDs
      const allIds = viewData.KIs.map((row) => row._id);
      setSelectedRows(allIds);
    } else {
      // Désélectionner tout
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (row, isChecked) => {
    const { _id } = row;
    if (isChecked) {
      setSelectedRows((prev) => [...prev, _id]);
    } else {
      setSelectedRows((prev) =>
        prev.filter((selectedId) => selectedId !== _id)
      );
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null,
    }));

    if (selectedOption) {
      setSelectedEntity(selectedOption.fullEntity);
    }
    setSelectedRows([]);
  };

  const handleRowClick = (item, index) => {
    const KIs = viewData.KIs[index]
    // console.log("KIs:", KIs);
    setSelectedKri(KIs)
    onOpen();
  };

  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`,
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
      maxHeight: "200px", // Définir une hauteur maximale pour le menu
      overflowY: "auto", // Activer le défilement vertical
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

  useEffect(() => {
    const fetchEntityData = async () => {
      if (selectedEntity) {
        try {
          // Exécute les appels en parallèle pour meilleure performance
          await Promise.all([
            dispatch(listEntityKeyIndicators({ entityId: selectedEntity?._id }))
          ]);

          setFormData({
            entity: selectedEntity?._id,
          });
        } catch (error) {
          console.error("Error fetching entity data:", error);
          // Gérer l'erreur ici (affichage à l'utilisateur, etc.)
        }
      } else {
        await dispatch(listKeyIndicator());
      }
    };

    fetchEntityData();
  }, [dispatch, selectedEntity]);

  const handleBulkAmend = async () => {
    if (!owner || !nominee) {
      toast({
        title: "Erreur",
        description: "Owner and Nominee fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const postData = {
      itemIds: selectedRows,
      updates: {
        ownerKeyIndicator: owner.label,
        nomineeKeyIndicator: nominee.label,
        reviewerKeyIndicator: reviewer?.label ? reviewer.label : "", // Ajoute reviewerControl seulement s'il est défini
      },
    };

    // console.log("postData:", postData);
    await dispatch(updateKeyIndicator(postData));
    if (selectedEntity) {
      try {
        // Exécute les appels en parallèle pour meilleure performance
        dispatch(listEntityKeyIndicators({ entityId: selectedEntity?._id }))
      } catch (error) {
        console.error("Error fetching entity data:", error);
        // Gérer l'erreur ici (affichage à l'utilisateur, etc.)
      }
    } else {
      await dispatch(listKeyIndicator());
    }

    // Fermer la modal après sauvegarde
    closeBulkAmendModal();
    setOwner(null);
    setNominee(null);
    setReviewer(null);
  };


  const bulkAmendModalOpen = () => {
    setIsModalBulkAmendOpen(true);
  };

  const closeBulkAmendModal = () => {
    if (selectedEntity) {
      setFormData({
        entity: selectedEntity
      });
    }

    setIsModalBulkAmendOpen(false);
    setOwner(null);
    setNominee(null);
    setReviewer(null);
  };

  const hasKIs = keyIndicator?.length > 0;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcul des données à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = viewData.KIs?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((viewData.KIs?.length || 0) / itemsPerPage);

  // Fonction de changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box>
      {!isRCSA && (
        <div>
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
      </div>
      )}
      
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : hasKIs ? (
        <>
          <div style={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            paddingBottom: '10px' // Espace pour le scrollbar
          }}>
            {/* Conteneur avec scroll horizontal */}
            <div style={{
              minWidth: 'max-content', // Force le contenu à ne pas se réduire
              width: '100%'
            }}>
              <Table variant="simple" mt={isRCSA ? 0 : 4} minWidth="800px">
                <Thead>
                  <Tr>
                    <div style={{ position: "relative", left: "25px", top: "15px" }}>
                      <Checkbox
                        onChange={handleSelectAll}
                        isChecked={
                          selectedRows.length === viewData.KIs?.length &&
                          viewData.KIs?.length > 0
                        }
                      />
                    </div>
                    {columnsByView.KIs?.map((col) => (
                      <Th fontSize={14} key={col.key} textTransform="none">
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
                    {currentItems.map((row, index) => (
                      <Tr key={index} cursor="pointer">
                        <Td>
                          <Checkbox
                            onChange={(e) => handleCheckboxChange(row, e.target.checked)}
                            isChecked={isRowSelected(row)}
                          />
                        </Td>
                        {columnsByView.KIs?.map((col) => (
                          <Td
                            fontSize={12}
                            key={col.key}
                            onClick={() => handleRowClick(row, index)}
                          >
                            {col.key === "reference"
                              ? `KI${row[col.key]}`
                              : (row[col.key]?.length > 20
                                ? `${row[col.key].substring(0, 16)}...`
                                : row[col.key]
                              )
                            }
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                )}
              </Table>
            </div>
          </div>
          <Box>
            {selectedRows.length > 0 && (
              <HStack mt={4} spacing={4} justifyContent="start">
                <Button
                  colorScheme="blue"
                  fontSize={12}
                  leftIcon={<EditIcon />}
                  onClick={bulkAmendModalOpen}
                >
                  Bulk Amend
                </Button>
              </HStack>
            )}
            <Flex justifyContent='space-between'>
              {/* Affichage du nombre d'éléments */}
              <Text textAlign="center" mt={8} fontSize="sm" color="gray.500">
                Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, viewData.KIs?.length || 0)} sur {viewData.KIs?.length || 0} éléments
              </Text>

              {/* Pagination */}
              {!loading && viewData.KIs?.length > itemsPerPage && (
                <Flex justifyContent="center" mt={4}>
                  <ButtonGroup spacing={2}>
                    <Button
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                    >
                      «
                    </Button>
                    <Button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ‹
                    </Button>

                    {/* Affichage des numéros de page */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      ›
                    </Button>
                    <Button
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      »
                    </Button>
                  </ButtonGroup>
                </Flex>
              )}
            </Flex>
          </Box>
        </>
      ) : (
        <Flex alignItems='center' justifyContent='center'>
          <Text fontSize='12px'>No Key Indicator found</Text>
        </Flex>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedKri && (
              <KeyIndicatorComponent kri={selectedKri} profiles={profiles} onClose={onClose} selectedEntity={selectedEntity} profilesOptions={profilesOptions} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Bulk amend */}
      <Modal
        isCentered
        isOpen={isModalBulkAmendOpen}
        onClose={closeBulkAmendModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>Bulk Amend</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isRequired>
              <FormLabel fontSize={12}>Owner</FormLabel>
              <Select
                placeholder="Select Owner"
                options={profilesOptions}
                value={owner}
                onChange={(selectedOption) => setOwner(selectedOption)}
              // isDisabled={!isEditing}
              />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel fontSize={12}>Nominee</FormLabel>
              <Select
                placeholder="Select Nominee"
                options={profilesOptions}
                value={nominee}
                onChange={(selectedOption) => setNominee(selectedOption)}
              // isDisabled={!isEditing}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontSize={12}>Reviewer</FormLabel>
              <Select
                placeholder="Select Reviewer"
                options={profilesOptions}
                value={reviewer}
                onChange={(selectedOption) => setReviewer(selectedOption)}
              // isDisabled={!isEditing}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} justifyContent="start">
              <Button
                colorScheme="red"
                fontSize={12}
                leftIcon={<CloseIcon />}
                onClick={closeBulkAmendModal}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                fontSize={12}
                leftIcon={<CheckIcon />}
                onClick={handleBulkAmend}
                isLoading={loading}
              >
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const mapStateToProps = ({ KeyIndicatorReducer }) => ({
  keyIndicator: KeyIndicatorReducer.keyIndicator,
  loading: KeyIndicatorReducer.loading,
});

export default connect(mapStateToProps)(KriCard);
