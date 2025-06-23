import React, { useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Box,
  Flex,
  border,
  Input,
} from "@chakra-ui/react";
import Select from "react-select";
import MultiSelectCheckbox from "./MultipleSelectCustom";

// Composant pour le formulaire Incident Loss Report
const IncidentLossReportForm = ({
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
        Incident Loss Report
      </Heading>

      <FormControl display={"flex"} flexDirection="column" gap={4}>
        <Box display="flex" alignItems="center" w="100%">
          <FormLabel mb="0" minW="120px">
            Select Entity
          </FormLabel>
          <Box flex="1">
            <MultiSelectCheckbox
              name="entity"
              options={entitiesOptions}
              value={formData.entity}
              onChange={handleSelectChange}
              placeholder="Select Entity"
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" w="100%">
          <FormLabel mb="0" minW="120px">
            Start Date
          </FormLabel>
          <Input
            fontSize={12}
            type="date"
            name="lastOperation"
            // value={formData.lastOperation}
          />
        </Box>

        <Box display="flex" alignItems="center" w="100%">
          <FormLabel mb="0" minW="120px">
            Start Date
          </FormLabel>
          <Input
            fontSize={12}
            type="date"
            name="lastOperation"
            // value={formData.lastOperation}
          />
        </Box>
      </FormControl>

      <Button onClick={handleOpenView} colorScheme="blue" size="lg">
        {loading ? "Loading..." : "View Report"}
      </Button>
    </VStack>
  );
};

export default IncidentLossReportForm;
