import React from 'react';
import {
  Box, FormControl, FormLabel, Input, Textarea, Checkbox, Select
} from '@chakra-ui/react';

function RiskForm({ riskData }) {
  if (!riskData) {
    return <div>No Risk Data Selected</div>; // Fallback if no risk is selected
  }

  return (
    <Box w="100%" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
      <FormControl>
        <FormLabel>Owner</FormLabel>
        <Input value={riskData.owner} isReadOnly />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Nominee</FormLabel>
        <Input value={riskData.nominee} isReadOnly />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Reviewer</FormLabel>
        <Input value={riskData.reviewer} isReadOnly />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={riskData.description} isReadOnly />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Category</FormLabel>
        <Input value={riskData.category} isReadOnly />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Residual Exposure</FormLabel>
        <Input value={riskData.exposure} isReadOnly />
      </FormControl>

      <FormControl mt={4} display="flex" alignItems="center">
        <Checkbox mr={2} isChecked>Active Risk</Checkbox>
      </FormControl>
    </Box>
  );
}

export default RiskForm;
