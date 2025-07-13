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
  Text,
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
    start_date: "",
    end_date: "",
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
        selectedStartDate: updatedFormData.start_date,
        selectedEndDate: updatedFormData.end_date,
        selectedEntities: updatedFormData.entity,
      });
    }
  };

  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedFormData = {
  //     ...formData,
  //     [name]: value,
  //   };

  //   setFormData(updatedFormData);

  //   // Notifier le parent des nouvelles sélections
  //   if (onSelectionChange) {
  //     onSelectionChange({
  //       selectedStartDate: updatedFormData.start_date,
  //       selectedEndDate: updatedFormData.end_date,
  //       selectedEntities: updatedFormData.entity,
  //     });
  //   }
  // };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    let updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Correction automatique si incohérence
    if (
      name === "start_date" &&
      formData.end_date &&
      value > formData.end_date
    ) {
      updatedFormData.end_date = value;
    }

    if (
      name === "end_date" &&
      formData.start_date &&
      value < formData.start_date
    ) {
      updatedFormData.start_date = value;
    }

    setFormData(updatedFormData);

    // Notifier le parent si besoin
    if (onSelectionChange) {
      onSelectionChange({
        selectedStartDate: updatedFormData.start_date,
        selectedEndDate: updatedFormData.end_date,
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

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" color="blue.600">
        Incident Loss Form
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
            name="start_date"
            max={formData.end_date || undefined} // limite max dynamique
            value={formData.start_date}
            onChange={handleDateChange}
          />
        </Box>

        <Box display="flex" alignItems="center" w="100%">
          <FormLabel mb="0" minW="120px">
            End Date
          </FormLabel>
          <Input
            fontSize={12}
            type="date"
            name="end_date"
            min={formData.start_date || "1970-01-01"} // limite min dynamique
            max={new Date().toISOString().split("T")[0]} // pas au-delà d'aujourd'hui
            value={formData.end_date}
            onChange={handleDateChange}
          />
        </Box>

        {formData.start_date &&
          formData.end_date &&
          formData.start_date > formData.end_date && (
            <Text fontSize="sm" color="red.500">
              Les dates ne correspondent pas
            </Text>
          )}
      </FormControl>

      <Button
        onClick={handleOpenView}
        colorScheme="blue"
        size="lg"
        disabled={
          !formData.entity?.length || !formData.start_date || !formData.end_date
        }
      >
        {loading ? "Loading..." : "View Report"}
      </Button>
    </VStack>
  );
};

export default IncidentLossReportForm;
