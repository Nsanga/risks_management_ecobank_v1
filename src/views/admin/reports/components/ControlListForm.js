import React, { useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Select from "react-select";

const ControlListForm = ({ handleOpenView, entities, loading, onSelectionChange }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formData, setFormData] = useState({
    session: "", // ✅ ajout
    entity: [],  // ✅ ajout
  });

  const sessionOptions = [
    { value: "q1", label: "Q1" },
    { value: "q2", label: "Q2" },
    { value: "q3", label: "Q3" },
    { value: "q4", label: "Q4" },
  ];

  const handleSelectChange = (name, selectedOption) => {
    let newValue;
    
    if (name === "entity") {
      const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
      const selectedEntities = selectedOption ? selectedOption.map(option => option.fullEntity) : [];

      newValue = selectedValues;
      setSelectedEntity(selectedEntities);
    } else {
      newValue = selectedOption ? selectedOption.value : null;
    }

    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };

    setFormData(updatedFormData);
    
    // Notifier le parent des nouvelles sélections
    if (onSelectionChange) {
      onSelectionChange({
        selectedEntities: updatedFormData.entity,
        selectedSession: updatedFormData.session
      });
    }
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

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" color="blue.600">
        Control List Form
      </Heading>

      <FormControl>
        <FormLabel>Session </FormLabel>
        <Box w="100%">
          <Select
            options={sessionOptions}
            styles={customStyles}
            placeholder="Select session"
            value={sessionOptions?.find(
              (option) => option.value === formData.session
            )}
            onChange={(selectedOption) =>
              handleSelectChange("session", selectedOption)
            }
          />
        </Box>
      </FormControl>

      <FormControl>
        <FormLabel>Select Entity</FormLabel>
        <Box w="100%">
          <Select
            options={entitiesOptions}
            styles={customStyles}
            placeholder="Select Entity"
            isMulti={true} // ✅ Active la sélection multiple
            value={entitiesOptions?.filter(
              (ent) => formData.entity.includes(ent.value)
            )}
            onChange={(selectedOption) =>
              handleSelectChange("entity", selectedOption)
            }
          />
        </Box>
      </FormControl>

      <Button onClick={handleOpenView} colorScheme="blue" size="lg">
        {loading ? 'Loading...' : 'View report' } 
      </Button>
    </VStack>
  );
};

export default ControlListForm;
