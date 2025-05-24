import React, { useState } from 'react';
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';
import Select from "react-select";
import { useSelector } from 'react-redux';

// Composant pour le formulaire Key Indicator Analysis
const KeyIndicatorAnalysisForm = ({ handleViewReport }) => {
  const [formData, setFormData] = useState({
    session: "", // ✅ ajout
    entity: "",  // ✅ ajout
  });
  const [selectedEntity, setSelectedEntity] = useState(null);

  const entities = useSelector(state => state.EntityReducer.entities);

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null,
    }));

    if (selectedOption) {
      setSelectedEntity(selectedOption.fullEntity);
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

      <Button colorScheme="green" size="lg" onClick={handleViewReport} >
        View report
      </Button>
    </VStack>
  );
};

export default KeyIndicatorAnalysisForm;