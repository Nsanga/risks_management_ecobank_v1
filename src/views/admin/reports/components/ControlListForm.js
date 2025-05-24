import React, { useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Heading,
} from "@chakra-ui/react";

// Composant pour le formulaire Control List
const ControlListForm = ({ handleOpenView }) => {
  const [formData, setFormData] = useState({
  
  session: "", // ✅ ajout
    entity: "",  // ✅ ajout
  });

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" color="blue.600">
        Control List Form
      </Heading>

      <FormControl>
        <FormLabel>Session </FormLabel>
        <Select
          value={formData.session}
          onChange={(e) =>
            setFormData({ ...formData, session: e.target.value })
          }
          placeholder="session"
        >
          <option value="entity">1: Data for selected Entity</option>
          <option value="owner">2: Data for selected Owner</option>
          <option value="all">3: All Data</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Select Entity</FormLabel>
        <Select
          value={formData.entity}
          onChange={(e) =>
            setFormData({ ...formData, entity: e.target.value })
          }
          placeholder="Select Entity"
        >
          <option value="ENT00409">ENT00409 ECM-FICC</option>
          <option value="ENT00510">ENT00510 ECM-EUR</option>
        </Select>
      </FormControl>

      <Button onClick={handleOpenView} colorScheme="blue" size="lg">
        View report
      </Button>
    </VStack>
  );
};

export default ControlListForm;
