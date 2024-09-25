import React from 'react';
import {
  Box, FormControl, FormLabel, Input, Textarea, Checkbox, Select, Button, HStack, Flex,
  Text
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon, CloseIcon, EditIcon, ArrowBackIcon } from '@chakra-ui/icons';

function RiskForm({ riskData }) {
  if (!riskData) {
    return <div>No Risk Data Selected</div>; // Fallback if no risk is selected
  }

  return (
    <Box bg="white" p={6} rounded="md" shadow="md">
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
        {/* Left Column */}
        <Box flex="1" mr={{ md: 4 }}>
          <FormControl>
            <Text fontWeight="bold" mb={2}>Owner</Text>
            <HStack spacing={2} alignItems="center">
              <Input value={riskData.owner} isReadOnly isDisabled />
              <Checkbox size="sm" fontWeight="bold" mb={2}>Owner Email</Checkbox>
            </HStack>
          </FormControl>

          <FormControl mt={4}>
          <Text fontWeight="bold" mb={2}>Nominee</Text>
            <Input value={riskData.nominee} isReadOnly isDisabled />
          </FormControl>

          <FormControl mt={4}>
          <Text fontWeight="bold" mb={2}>Reviewer</Text>
            <Input value={riskData.reviewer} isReadOnly isDisabled/>
          </FormControl>

          <FormControl mt={4} display="flex" alignItems="center">
            <Checkbox isChecked={riskData.isActive} isReadOnly fontWeight="bold" mb={2}>
              Active Risk
            </Checkbox>
          </FormControl>

          <FormControl mt={4}>
          <Text fontWeight="bold" mb={2}>Description</Text>
            <Textarea value={riskData.description} isReadOnly isDisabled/>
          </FormControl>

        </Box>

        {/* Right Column with shadow and buttons */}
        <Box flex="1" width={{ base: "100%", md: "40%" }} height={250} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
          <FormControl>
          <Text fontWeight="bold" mb={2}>Frequency</Text>
            <Select value={riskData.frequency || ''} isReadOnly>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </Select>
          </FormControl>

          <FormControl mt={1}> {/* Reduced margin */}
          <Text fontWeight="bold" mb={2}>Remind One</Text>
            <Input type="date" value={riskData.remindDate || ''} isReadOnly />
          </FormControl>

          {/* Buttons in Right Column */}
          <Flex justifyContent="flex-end" mt={8}>
              <Button colorScheme="blue" variant="solid" width="auto" minWidth="120px">
                Sign Off/add next
              </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Buttons Section */}
      <HStack spacing={4} mt={6} justify='center'>
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
