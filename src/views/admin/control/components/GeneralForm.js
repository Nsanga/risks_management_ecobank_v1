import React from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  SimpleGrid,
  Button,
  useToast,
} from '@chakra-ui/react';

const GeneralForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Box className="form-container" p={4} borderWidth={1} borderRadius="lg" as="form" onSubmit={handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        {/* Left section */}
        <Box bg="white" p={6} rounded="md" shadow="md">
          
          {/* Checkbox section moved here */}
          <Flex justifyContent="space-between" mb={4}>
            <Checkbox 
              name="keyControl" 
              isChecked={formData.keyControl} 
              onChange={handleChange} 
            >
              Key Control
            </Checkbox>
            <Checkbox 
              name="activeControl" 
              isChecked={formData.activeControl} 
              onChange={handleChange} 
            >
              Active Control
            </Checkbox>
          </Flex>

          <FormControl mb={4}>
            <FormLabel>Control Library Reference</FormLabel>
            <Input 
              type="text" 
              name="controlRef" 
              value={formData.controlRef} 
              onChange={handleChange} 
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Control Category</FormLabel>
            <Input 
              type="text" 
              name="controlCategory" 
              value={formData.controlCategory} 
              onChange={handleChange} 
            />
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
            />
          </FormControl>
          
          <Flex mb={4}>
            <FormControl mr={4}>
              <FormLabel>Nominee</FormLabel>
              <Input 
                type="text" 
                name="nominee" 
                value={formData.nominee} 
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl>
              <FormLabel>Reviewer</FormLabel>
              <Input 
                type="text" 
                name="reviewer" 
                value={formData.reviewer} 
                onChange={handleChange} 
              />
            </FormControl>
          </Flex>

          <FormControl mb={4}>
            <FormLabel>Review Date</FormLabel>
            <Input 
              type="date" 
              name="reviewDate" 
              value={formData.reviewDate} 
              onChange={handleChange} 
            />
          </FormControl>
        </Box>

        {/* Right section */}
        <Box flex="1" width={{ base: "100%", md: "100%" }} height={350} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
          <FormLabel>Operation:</FormLabel>
          <Flex direction="column">
            <FormControl mb={2}>
              <FormLabel>Frequency</FormLabel>
              <Input 
                type="text" 
                name="frequency" 
                value={formData.frequency} 
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Last Operator</FormLabel>
              <Input 
                type="text" 
                name="lastOperator" 
                value={formData.lastOperator} 
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Next Operation</FormLabel>
              <Input 
                type="text" 
                name="nextOperation" 
                value={formData.nextOperation} 
                onChange={handleChange} 
              />
            </FormControl>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default GeneralForm;
