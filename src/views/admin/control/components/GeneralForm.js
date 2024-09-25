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
  Text,
} from '@chakra-ui/react';

const GeneralForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Box className="form-container" p={4} borderWidth={1} borderRadius="lg" as="form" onSubmit={handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        {/* Left section */}
        <Box bg="white" p={6} rounded="md" shadow="md">
          
          {/* Checkbox section moved here */}
          <Flex justifyContent="space-between" mb={4}>
            <Checkbox fontWeight="bold" mb={2}
              name="keyControl" 
              isChecked={formData.keyControl} 
              onChange={handleChange} 
            >
              Key Control
            </Checkbox>
            <Checkbox fontWeight="bold" mb={2}
              name="activeControl" 
              isChecked={formData.activeControl} 
              onChange={handleChange} 
            >
              Active Control
            </Checkbox>
          </Flex>

          <FormControl mb={4}>
          <Text fontWeight="bold" mb={2}>Control Library Reference</Text>
            <Input 
              type="text" 
              name="controlRef" 
              value={formData.controlRef} 
              onChange={handleChange} 
              isDisabled
            />
          </FormControl>

          <FormControl mb={4}>
          <Text fontWeight="bold" mb={2}>Control Category</Text>
            <Input 
              type="text" 
              name="controlCategory" 
              value={formData.controlCategory} 
              onChange={handleChange}
              isDisabled
            />
          </FormControl>
          
          <FormControl mb={4}>
          <Text fontWeight="bold" mb={2}>Description</Text>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              isDisabled 
            />
          </FormControl>
          
          <Flex mb={4}>
            <FormControl mr={4}>
            <Text fontWeight="bold" mb={2}>Nominee</Text>
              <Input 
                type="text" 
                name="nominee" 
                value={formData.nominee} 
                onChange={handleChange}
                isDisabled 
              />
            </FormControl>
            <FormControl>
              <FormLabel>Reviewer</FormLabel>
              <Input 
                type="text" 
                name="reviewer" 
                value={formData.reviewer} 
                onChange={handleChange}
                isDisabled 
              />
            </FormControl>
          </Flex>

          <FormControl mb={4}>
          <Text fontWeight="bold" mb={2}>Review Date</Text>
            <Input 
              type="date" 
              name="reviewDate" 
              value={formData.reviewDate} 
              onChange={handleChange} 
              isDisabled
            />
          </FormControl>
        </Box>

        {/* Right section */}
        <Box flex="1" width={{ base: "100%", md: "100%" }} height={350} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
        <Text fontWeight="bold" mb={2}>Operation:</Text>
          <Flex direction="column">
            <FormControl mb={2}>
            <Text fontWeight="bold" mb={2}>Frequency</Text>
              <Input 
                type="text" 
                name="frequency" 
                value={formData.frequency} 
                onChange={handleChange}
                isDisabled 
              />
            </FormControl>
            <FormControl mb={2}>
            <Text fontWeight="bold" mb={2}>Last Operator</Text>
              <Input 
                type="text" 
                name="lastOperator" 
                value={formData.lastOperator} 
                onChange={handleChange} 
                isDisabled
              />
            </FormControl>
            <FormControl mb={2}>
            <Text fontWeight="bold" mb={2}>Next Operation</Text>
              <Input 
                type="text" 
                name="nextOperation" 
                value={formData.nextOperation} 
                onChange={handleChange} 
                isDisabled
              />
            </FormControl>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default GeneralForm;
