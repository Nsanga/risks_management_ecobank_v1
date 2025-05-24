import React, { useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Select from "react-select";

// Composant pour le formulaire Control List
const ControlListForm = ({ handleOpenView }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formData, setFormData] = useState({
    session: "", // ✅ ajout
    entity: "",  // ✅ ajout
  });

  const entities = useSelector(state => state.EntityReducer.entities);

  const sessionOptions = [
    { value: "mensuel", label: "Mensuelle" },
    { value: "trimestrielle", label: "Trimestrielle" },
  ];

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
            value={entitiesOptions?.find(
              (ent) => ent.value === formData.entity
            )}
            onChange={(selectedOption) =>
              handleSelectChange("entity", selectedOption)
            }
          />
        </Box>
      </FormControl>

      <Button onClick={handleOpenView} colorScheme="blue" size="lg">
        View report
      </Button>
    </VStack>
  );
};

export default ControlListForm;
