import React, { useState } from 'react';
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Box,
} from '@chakra-ui/react';
import Select from "react-select";
import { useSelector } from 'react-redux';

// Composant pour le formulaire Key Indicator Analysis
const KeyIndicatorAnalysisForm = ({ handleViewReport, entities, loading, onSelectionChange }) => {
  const [formData, setFormData] = useState({
    session: "", // ✅ ajout
    entity: [],  // ✅ ajout
  });
  const [selectedEntity, setSelectedEntity] = useState(null);

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
        key indicator List Form
      </Heading>

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

      <Button colorScheme="green" size="lg" onClick={handleViewReport} >
      {loading ? 'Loading...' : 'View report' } 
      </Button>
    </VStack>
  );
};

export default KeyIndicatorAnalysisForm;