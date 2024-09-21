import React from 'react';
import {
  Box, FormControl, FormLabel, Input, Textarea, Checkbox, Select, Button, HStack, Flex
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon, CloseIcon, EditIcon, ArrowBackIcon } from '@chakra-ui/icons';

function RiskForm({ riskData }) {
  if (!riskData) {
    return <div>No Risk Data Selected</div>; // Fallback if no risk is selected
  }

  return (
    <Box w="100%" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
        {/* Left Column */}
        <Box flex="1" mr={{ md: 4 }}>
          <FormControl>
            <FormLabel>Owner</FormLabel>
            <HStack spacing={2} alignItems="center">
              <Input value={riskData.owner} isReadOnly />
              <Checkbox size="sm">Owner Email</Checkbox>
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nominee</FormLabel>
            <Input value={riskData.nominee} isReadOnly />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Reviewer</FormLabel>
            <Input value={riskData.reviewer} isReadOnly />
          </FormControl>

          <FormControl mt={4} display="flex" alignItems="center">
            <Checkbox isChecked={riskData.isActive} isReadOnly>
              Active Risk
            </Checkbox>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea value={riskData.description} isReadOnly />
          </FormControl>

        </Box>

        {/* Right Column with shadow and buttons */}
        <Box flex="1" width={{ base: "100%", md: "40%" }} height={250} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
          <FormControl>
            <FormLabel>Frequency</FormLabel>
            <Select value={riskData.frequency || ''} isReadOnly>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </Select>
          </FormControl>

          <FormControl mt={1}> {/* Reduced margin */}
            <FormLabel>Remind One</FormLabel>
            <Input type="date" value={riskData.remindDate || ''} isReadOnly />
          </FormControl>

          {/* Buttons in Right Column */}
          <Flex justifyContent="center" mt={8}>
            <HStack spacing={4} w="100%" justify="center">
              <Button colorScheme="blue" variant="solid" width="auto" minWidth="120px">
                Sign Off/add next
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>

      {/* Buttons Section */}
      <HStack spacing={4} mt={6}>
        <Button colorScheme="blue" variant="outline" leftIcon={<ArrowBackIcon />}>
          Home
        </Button>
        <Button colorScheme="green" variant="outline" leftIcon={<CheckIcon />}>
          Approve
        </Button>
        <Button colorScheme="yellow" variant="outline" leftIcon={<CloseIcon />}>
          Unapprove
        </Button>
        <Button colorScheme="teal" variant="outline" leftIcon={<EditIcon />}>
          Save
        </Button>
        <Button colorScheme="teal" variant="outline" leftIcon={<EditIcon />}>
          Amend
        </Button>
        <Button colorScheme="red" variant="outline" leftIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button colorScheme="red" variant="outline" leftIcon={<CheckIcon />}>
          Save and Approve
        </Button>
      </HStack>
    </Box>
  );
}

export default RiskForm;
