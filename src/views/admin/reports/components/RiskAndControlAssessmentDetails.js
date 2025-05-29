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

const RiskAndControlAssessmentDetails = ({
  handleOpenView,
  entities,
  loading,
  onSelectionChange,
}) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formData, setFormData] = useState({
    entity: [],
  });

  const handleSelectChange = (name, selectedOption) => {
    const selectedValues = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    const selectedEntities = selectedOption
      ? selectedOption.map((option) => option.fullEntity)
      : [];

    setSelectedEntity(selectedEntities);

    const updatedFormData = {
      ...formData,
      [name]: selectedValues,
    };

    setFormData(updatedFormData);

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
        Risk and Control Assessment Details
      </Heading>

      <FormControl>
        <FormLabel>Select Entity</FormLabel>
        <Box w="100%">
          <Select
            options={entitiesOptions}
            styles={customStyles}
            placeholder="Select Entity"
            isMulti={true}
            value={entitiesOptions?.filter((ent) =>
              formData.entity.includes(ent.value)
            )}
            onChange={(selectedOption) =>
              handleSelectChange("entity", selectedOption)
            }
          />
        </Box>
      </FormControl>

      <Button onClick={handleOpenView} colorScheme="blue" size="lg">
        {loading ? "Loading..." : "View report"}
      </Button>
    </VStack>
  );
};

export default RiskAndControlAssessmentDetails;