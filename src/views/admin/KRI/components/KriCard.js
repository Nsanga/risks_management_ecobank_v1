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
} from "@chakra-ui/react";
import { connect, useDispatch } from "react-redux";
import { listKeyIndicator } from "redux/kri/action";
import Loader from '../../../../assets/img/loader.gif';
import Select from "react-select";
import KeyIndicatorComponent from "./KeyIndicatorComponent"; // ajuste le path selon ton projet
import { listEntityKeyIndicators } from "redux/kri/action";

const truncateWords = (text = "", limit = 40) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const KriCard = ({ keyIndicator, loading, entities, profiles }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedKri, setSelectedKri] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({
    entity: null,
  });
  const [viewData, setViewData] = useState({
    KIs: [],
  });

  const isRowSelected = (row) => selectedRows.includes(row._id);

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
    const KIs = viewData.KIs
    // console.log("control:", control);
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

  const handleOpenKIs = (kri) => {
    console.log(kri)
    setSelectedKri(kri);
    onOpen();
  };

  const hasKIs = keyIndicator?.length > 0;

  return (
    <Box>
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
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : hasKIs ? (
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
            <Table variant="simple" mt={4} minWidth="800px">
              <Thead>
                <Tr>
                  <div
                    style={{ position: "relative", left: "25px", top: "15px" }}
                  >
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
                  {viewData.KIs?.map((row, index) => (
                    <Tr key={index} cursor="pointer">
                      <Td>
                        <Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(row, e.target.checked)
                          }
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
              <KeyIndicatorComponent kri={selectedKri} profiles={profiles} onClose={onClose} />
            )}
          </ModalBody>
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
