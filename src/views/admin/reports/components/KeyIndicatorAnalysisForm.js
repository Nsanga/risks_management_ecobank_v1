import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Heading,
} from '@chakra-ui/react';

// Composant pour le formulaire Key Indicator Analysis
const KeyIndicatorAnalysisForm = ({handleViewReport}) => {
   const [formData, setFormData] = useState({
    
    session: "", // ✅ ajout
      entity: "",  // ✅ ajout
    });

  return (
     <VStack spacing={4} align="stretch">
       <Heading size="md" color="blue.600">
         key indicator List Form
       </Heading>
 
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

      <Button colorScheme="green" size="lg" onClick={handleViewReport} >
        View report
      </Button>
    </VStack>
  );
};

export default KeyIndicatorAnalysisForm;