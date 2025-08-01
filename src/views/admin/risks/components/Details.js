import {
  Flex,
  Input,
  Text,
  Textarea,
  Box,
  Checkbox,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import { FaFilePdf, FaFileWord, FaFileAlt, FaFileImage } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DocumentUploader from "./DocumentUploader";
import RAG from "../RAG";
import moment from "moment";

const Details = ({ detailsData, onDetailsChange, entities, profiles }) => {
  const [rag, setRag] = useState([]);
  const [formData, setFormData] = useState(detailsData || null);

  const profilesOptions = profiles
    ?.filter((profile) => profile.activeUser)
    ?.map((profile, index) => {
      // Vérification de la présence de name et surname
      const name = profile.name ? profile.name : "";
      const surname = profile.surname ? profile.surname : "";

      return {
        key: `${profile._id}-${index}`, // Unicité assurée
        value: profile._id,
        label: `${name} ${surname}`.trim(), // Concaténation des valeurs et suppression des espaces inutiles
      };
    });

  const entitiesOptions = entities?.map((entity, index) => ({
    key: `${entity._id}-${index}`, // Unicité assurée
    value: entity._id,
    label: `ENT${entity.referenceId} CAM - ${entity.description}`,
  }));

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [field]: selectedOption ? {
          _id: selectedOption.value,
          name: selectedOption.label, // ou récupère depuis profiles si besoin
        } : null,
      };
      onDetailsChange(newData);
      return newData;
    });
  };


  useEffect(() => {
    const loadRag = async () => {
      const formattedRag = RAG.map((rag) => ({
        value: rag.name,
        label: rag.name,
      }));
      setRag(formattedRag);
    };
    loadRag();
  }, []);

  useEffect(() => {
    // Initialiser la date du jour dans createdOn lors du montage du composant ou lorsque selectedEntity change
    const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
    setFormData((prevValues) => ({
      ...prevValues,
      event_date: prevValues?.event_date,
      recorded_date: prevValues?.recorded_date || today,
    }));
  }, [detailsData]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "14px",
      // maxHeight: "200px", // Définir la hauteur maximale du menu
      overflowY: "auto", // Activer le défilement si le contenu dépasse la hauteur
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };
      onDetailsChange(newData);
      return newData;
    });
  };

  const handleUploadLinks = (newLinks) => {
    setFormData((prevData) => {
      const updatedDocuments = [...prevData.document, ...newLinks];
      const newData = { ...prevData, document: updatedDocuments };
      onDetailsChange(newData); // Notify parent about changes
      return newData;
    });
  };

  useEffect(() => {
    if (detailsData) {
      setFormData(detailsData);
    }
  }, [detailsData]);

  useEffect(() => {
    if (formData) {
      onDetailsChange(formData);
    }
  }, []);

  const recordedName = localStorage.getItem("username");
  console.log('formData', formData)
  return (
    <Box>
      <Box pt={5} pb={5}>
        <Box bg="green.400" color="#FFF" mb={6} padding={2}>
          Description <span style={{ color: "red" }}>*</span>
        </Box>
        <Input
          name="description"
          placeholder="Description de l’événement"
          size="sm"
          value={formData?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Box>
      <Box pt={5} pb={5}>
        <Box bg="green.400" color="#FFF" mb={6} padding={2}>
          Description détaillée
        </Box>
        <Textarea
          name="descriptionDetailled"
          placeholder="Description détaillée"
          size="sm"
          value={formData?.descriptionDetailled}
          onChange={(e) =>
            handleInputChange("descriptionDetailled", e.target.value)
          }
        />
      </Box>
      <Flex flexDirection="column" gap={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={6} alignItems="center">
            <Text fontSize={12}>Date de l’événement : <span style={{ color: "red" }}>*</span></Text>
            <Box width={200}>
              <Input
                placeholder="Select Date"
                size="sm"
                type="date"
                value={
                  formData?.event_date
                    ? formData?.event_date.slice(0, 10) // extrait "2025-07-15" de "2025-07-15T00:00:00.000Z"
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("event_date", e.target.value)
                }
              />
            </Box>
          </Flex>
          <Flex gap={5} alignItems="center">
            <Text fontSize={12}>RAG :</Text>
            <Box width={200}>
              <Select
                options={rag}
                styles={customStyles}
                placeholder="Select RAG"
                value={rag.find((r) => r.value === formData?.RAG)}
                onChange={(selectedOption) =>
                  handleInputChange(
                    "RAG",
                    selectedOption ? selectedOption.value : ""
                  )
                }
              />
            </Box>
          </Flex>
          <Flex width={155}>
            <Checkbox
              size="sm"
              isChecked={formData?.activeEvent}
              onChange={(e) =>
                handleInputChange("activeEvent", e.target.checked)
              }
            >
              Événement actif
            </Checkbox>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={5} alignItems="center">
            <Text fontSize={12}>Heure de l’événement :</Text>
            <Box width={200}>
              <Input
                placeholder="Select Date and Time"
                size="sm"
                type="time"
                value={formData?.event_time}
                onChange={(e) =>
                  handleInputChange("event_time", e.target.value)
                }
              />
            </Box>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={5} alignItems="center">
            <Text fontSize={12}>Enregistré par :</Text>
            <Text color="blue" fontSize={12}>
              {recordedName}
            </Text>
          </Flex>
          <Flex gap={5} alignItems="center">
            <Text fontSize={12}>le :</Text>
            <Text color="blue" fontSize={12}>
              {moment(formData?.recorded_date).format("DD/MM/YYYY")}
            </Text>
          </Flex>
          <Flex width={155}>
            <Checkbox
              size="sm"
              isChecked={formData?.excludeFundLosses}
              onChange={(e) =>
                handleInputChange("excludeFundLosses", e.target.checked)
              }
            >
              Exclure les pertes de fonds
            </Checkbox>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Checkbox
            size="sm"
            isChecked={formData?.externalEvent}
            onChange={(e) =>
              handleInputChange("externalEvent", e.target.checked)
            }
          >
            Événement externe
          </Checkbox>
          <Flex gap={5} alignItems="center">
            <Text fontSize={12}>External Ref :</Text>
            <Box>
              <Input
                placeholder="External Ref"
                size="sm"
                type="text"
                value={formData?.externalRef}
                onChange={(e) =>
                  handleInputChange("externalRef", e.target.value)
                }
              />
            </Box>
          </Flex>
          <Flex width={155}>
            <Checkbox
              size="sm"
              isChecked={formData?.notify}
              onChange={(e) => handleInputChange("notify", e.target.checked)}
            >
              Informer
            </Checkbox>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          <Box p={5} shadow="md" borderWidth="1px" width="49%">
            <Box bg="green.400" color="#FFF" mb={6} padding={2}>
              Zone de détection
            </Box>
            <Flex flexDirection="column" gap={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>
                  Entité : <span style={{ color: "red" }}>*</span>
                </Text>
                <Box width={200}>
                  <Select
                    options={entitiesOptions}
                    styles={customStyles}
                    placeholder="Sélectionner une entité"
                    value={entitiesOptions?.find(
                      (ent) => ent.value === formData?.entityOfDetection?._id
                    )}
                    onChange={(selectedOption) =>
                      handleSelectChange("entityOfDetection", selectedOption)
                    }
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>Sous-entité :</Text>
                <Box width={200}>
                  <Input
                    placeholder=""
                    size="sm"
                    type="text"
                    value={formData?.subentityOfDetection}
                    onChange={(e) =>
                      handleInputChange("subentityOfDetection", e.target.value)
                    }
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>
                  Date de détection : <span style={{ color: "red" }}>*</span>
                </Text>
                <Box width={200}>
                  <Input
                    placeholder="Select Date"
                    size="sm"
                    type="date"
                    value={
                      formData?.detection_date
                        ? formData?.detection_date.slice(0, 10) // extrait "2025-07-15" de "2025-07-15T00:00:00.000Z"
                        : ""
                    }
                    onChange={(e) =>
                      handleInputChange("detection_date", e.target.value)
                    }
                  />
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" width="49%">
            <Box bg="green.400" color="#FFF" mb={6} padding={2}>
              Zone d’origine.
            </Box>
            <Flex flexDirection="column" gap={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>
                  Entité : <span style={{ color: "red" }}>*</span>
                </Text>
                <Box width={200}>
                  <Select
                    options={entitiesOptions}
                    styles={customStyles}
                    placeholder="Sélectionner une entité"
                    value={entitiesOptions?.find(
                      (ent) => ent.value === formData?.entityOfOrigin?._id
                    )}
                    onChange={(selectedOption) =>
                      handleSelectChange("entityOfOrigin", selectedOption)
                    }
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={12}>Sous-entité :</Text>
                <Box width={200}>
                  <Input
                    placeholder=""
                    size="sm"
                    type="text"
                    value={formData?.subentityOfOrigin}
                    onChange={(e) =>
                      handleInputChange("subentityOfOrigin", e.target.value)
                    }
                  />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" pt={5}>
          <Flex flexDirection="column" gap={2}>
            <Flex gap={20} alignItems="center">
              <Text fontSize={12}>Approuvé :</Text>
              <Box width={200}>
                <Input
                  placeholder="Sélectionner une Date"
                  size="sm"
                  type="date"
                  value={
                    formData?.approved_date
                      ? formData.approved_date.slice(0, 10)
                      : new Date().toISOString().slice(0, 10) // Date du jour au format YYYY-MM-DD
                  }
                  onChange={(e) => handleInputChange("approved_date", e.target.value)}
                  readOnly // Empêche la modification
                  bg="gray.100" // Fond gris pour indiquer que le champ est en lecture seule
                />
              </Box>
            </Flex>
            <Flex gap={14} alignItems="center">
              <Text fontSize={12}>Date d’approbation :</Text>
              <Box width={200} marginLeft={3}>
                <Input
                  placeholder="Sélectionner une Date"
                  size="sm"
                  type="date"
                  value={
                    formData?.closed_date
                      ? formData?.closed_date.slice(0, 10) // extrait "2025-07-15" de "2025-07-15T00:00:00.000Z"
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange("closed_date", e.target.value)
                  }
                />
              </Box>
            </Flex>
            <Flex gap={6} alignItems="center">
              <Text fontSize={12}>Date cible de clôture :</Text>
              <Box width={200}>
                <Input
                  placeholder="Sélectionner une Date"
                  size="sm"
                  type="date"
                  value={
                    formData?.targetClosureDate
                      ? formData?.targetClosureDate.slice(0, 10) // extrait "2025-07-15" de "2025-07-15T00:00:00.000Z"
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange("targetClosureDate", e.target.value)
                  }
                />
              </Box>
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap={2}>
            <Flex alignItems="center">
              <Box width={"40%"}>
                <Text fontSize={12}>
                  Propriétaire : <span style={{ color: "red" }}>*</span>
                </Text>
              </Box>
              <Box width={"100%"}>
                <Select
                  name="owner"
                  placeholder="Sélectionner le propriétaire"
                  options={profilesOptions}
                  styles={customStyles}
                  value={profilesOptions?.find(
                    (option) => option.value === formData?.owner?._id
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("owner", selectedOption)
                  }
                />
              </Box>
            </Flex>
            <Flex alignItems="center">
              <Box width={"40%"}>
                <Text fontSize={12}>
                  Désigné : <span style={{ color: "red" }}>*</span>
                </Text>
              </Box>
              <Box width={"100%"}>
                <Select
                  name="mandataire"
                  placeholder="Sélectionner le mandataire"
                  options={profilesOptions}
                  styles={customStyles}
                  value={profilesOptions?.find(
                    (option) => option.value === formData?.nominee?._id
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("nominee", selectedOption)
                  }
                />
              </Box>
            </Flex>
            <Flex alignItems="center">
              <Box width={"40%"}>
                <Text fontSize={12}>
                  Réviseur :
                </Text>
              </Box>
              <Box width={"100%"}>
                <Select
                  name="reviewer"
                  placeholder="Sélectionner le réviseur"
                  options={profilesOptions}
                  styles={customStyles}
                  value={profilesOptions?.find(
                    (option) => option.value === formData?.reviewer?._id
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("reviewer", selectedOption)
                  }
                />
              </Box>
            </Flex>
            <Flex gap={6} alignItems="center">
              <Text fontSize={12}>Date de révision :</Text>
              <Box width={200}>
                <Input
                  placeholder="Sélectionner une Date"
                  size="sm"
                  type="date"
                  value={
                    formData?.reviewer_date
                      ? formData?.reviewer_date.slice(0, 10) // extrait "2025-07-15" de "2025-07-15T00:00:00.000Z"
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange("reviewer_date", e.target.value)
                  }
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Box mt={8}>
        <GridItem colSpan={1}>
          <Text fontWeight="bold" fontSize={12}>
            Documents
            <span style={{ fontStyle: "italic" }}>
              {" "}
              (Importer vos documents dans l'espace ci-dessous)
            </span>
          </Text>
        </GridItem>
        <Box mt={4}>
          <DocumentUploader
            onMediaUpload={handleUploadLinks}
            initialDocuments={formData?.document}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
