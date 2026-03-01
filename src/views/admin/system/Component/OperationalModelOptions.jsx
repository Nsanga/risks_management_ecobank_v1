import React from 'react';
import { Box, Button, FormControl, FormLabel, Flex, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Select from "react-select";

const OperationalModelOptions = ({ formData, onSelectAll, onUnselectAll, onCopyViews, entities }) => {

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

    const handleSelectChange = (name, selectedOption) => {
        let newValue;
        
        if (name === "entity") {
          const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
          const selectedEntities = selectedOption ? selectedOption.map(option => option.fullEntity) : [];
    
          newValue = selectedValues;
        } else {
          newValue = selectedOption ? selectedOption.value : null;
        }
    
        const updatedFormData = {
          ...formData,
          [name]: newValue,
        };
      };

    return (
        <Box p={6} >
            <Text mb={4}>
                Select the operational model items for this user.
                <br />
                <strong>IMPORTANT:</strong> At least one operational model must be selected per category.
            </Text>
            <Flex direction="column" gap={4}>
                <Flex justify="space-between" mb={4}>
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        size="sm"
                        fontSize={12}
                        aria-label="Select all items"
                        onClick={onSelectAll}
                    >
                        Select All
                    </Button>
                    <Button
                        leftIcon={<MinusIcon />}
                        colorScheme="red"
                        size="sm"
                        fontSize={12}
                        aria-label="Unselect all items"
                        onClick={onUnselectAll}
                    >
                        Unselect All
                    </Button>
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="teal"
                        size="sm"
                        aria-label="Copy user views"
                        onClick={onCopyViews}
                        fontSize={12}
                    >
                        Copy User Views
                    </Button>
                </Flex>
                <Box mt={4}>
                    <FormControl>
                        <FormLabel>Select Entity</FormLabel>
                        <Box w="100%">
                            <Select
                                options={entitiesOptions}
                                styles={customStyles}
                                placeholder="Select Entity"
                                isMulti={true} // ✅ Active la sélection multiple
                                value={entitiesOptions?.filter(
                                    (ent) => (formData.entity || []).includes(ent.value)
                                )}
                                onChange={(selectedOption) =>
                                    handleSelectChange("entity", selectedOption)
                                }
                            />
                        </Box>
                    </FormControl>
                </Box>
            </Flex>
        </Box>
    )
};

export default OperationalModelOptions;
