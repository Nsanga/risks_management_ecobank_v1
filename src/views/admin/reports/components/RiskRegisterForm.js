import React, { useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Box,
} from "@chakra-ui/react";
import Select from "react-select";
import MultiSelectCheckbox from "./MultipleSelectCustom";

// Composant pour le formulaire Risk Register
const RiskRegisterForm = ({ handleOpenView, entities, loading, onSelectionChange }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formData, setFormData] = useState({
    entity: [],
  });

  const handleSelectChange = (name, selectedOption) => {
    const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
    const selectedEntities = selectedOption ? selectedOption.map(option => option.fullEntity) : [];

    setSelectedEntity(selectedEntities);

    const updatedFormData = {
      ...formData,
      [name]: selectedValues,
    };

    setFormData(updatedFormData);

    // Notifier le parent des nouvelles sélections
    if (onSelectionChange) {
      onSelectionChange({
        selectedEntities: updatedFormData.entity,
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
      maxHeight: "200px",
      overflowY: "auto",
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
        Risk Register Form
      </Heading>

      <FormControl>
        <FormLabel>Select Entity</FormLabel>
        <Box w="100%">
        <MultiSelectCheckbox
            name="entity"
            options={entitiesOptions}
            value={formData.entity}
            onChange={handleSelectChange}
            placeholder="Select Entity"
          />
        </Box>
      </FormControl>

      <Button onClick={handleOpenView} colorScheme="blue" size="lg">
        {loading ? "Loading..." : "View report"}
      </Button>
    </VStack>
  );
};

export default RiskRegisterForm;