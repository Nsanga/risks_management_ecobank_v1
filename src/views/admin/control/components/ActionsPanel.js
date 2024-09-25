import React, { useState } from 'react';
import { Box, Flex, Grid, Button, Input, Textarea, Table, Thead, Tbody, Tr, Th, Td, useToast, Text } from '@chakra-ui/react';
import { AddIcon, EditIcon, CalendarIcon, CloseIcon, DeleteIcon, CheckIcon, TimeIcon, RepeatIcon, WarningIcon, ArrowDownIcon } from '@chakra-ui/icons';

function ActionsPanel() {
  const [actions, setActions] = useState([]);
  const [formData, setFormData] = useState({
    owner: '',
    nominee: '',
    reviewer: '',
    reviewDate: '',
    targetDate: '',
    cost: '',
    description: '',
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAction = () => {
    const newAction = { ...formData, actionRef: `RSG${Math.random().toString(36).substr(2, 5).toUpperCase()}` };
    setActions(prev => [...prev, newAction]);
    setFormData({
      owner: '',
      nominee: '',
      reviewer: '',
      reviewDate: '',
      targetDate: '',
      cost: '',
      description: '',
    });
    toast({
      title: "Action Added.",
      description: "Your action has been successfully added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="container" p={4}>
      {/* Flex container for both panels */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={6} mb={4}>
        {/* Left Panel */}
        <Box className="left-panel" flex="1">
          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Action Ref.</Th>
                <Th>Description</Th>
                <Th>Target / Completion</Th>
              </Tr>
            </Thead>
            <Tbody>
              {actions.length === 0 ? (
                <Tr>
                  <Td colSpan="3" textAlign="center">No data to display</Td>
                </Tr>
              ) : (
                actions.map((action, index) => (
                  <Tr key={index}>
                    <Td>{action.actionRef}</Td>
                    <Td>{action.description}</Td>
                    <Td>{action.targetDate}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>

        {/* Right Panel */}
        <Box className="right-panel" flex="1">
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2}>Owner:</Text>
              <Input name="owner" value={formData.owner} onChange={handleInputChange} />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2}>Nominee:</Text>
              <Input name="nominee" value={formData.nominee} onChange={handleInputChange} />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2}>Reviewer:</Text>
              <Input name="reviewer" value={formData.reviewer} onChange={handleInputChange} />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2}>Review Date:</Text>
              <Input name="reviewDate" type="date" value={formData.reviewDate} onChange={handleInputChange} />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2}>Target Date:</Text>
              <Input name="targetDate" type="date" value={formData.targetDate} onChange={handleInputChange} />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2}>Cost:</Text>
              <Input name="cost" type="number" placeholder="0.00" value={formData.cost} onChange={handleInputChange} />
            </Flex>
          </Grid>

          {/* Description */}
          <Box mb={4}>
            <Text fontWeight="bold" mb={2}>Description:</Text>
            <Textarea placeholder="Action focus" name="description" value={formData.description} onChange={handleInputChange} />
          </Box>
        </Box>
      </Flex>

      {/* Button panel under both panels */}
      <Flex justify="space-between" wrap="nowrap" gap={2} mb={4}>
        <Button colorScheme="blue" variant="outline" leftIcon={<AddIcon />} size="sm" onClick={handleAddAction}>Add Action</Button>
        <Button colorScheme="yellow" variant="outline" leftIcon={<EditIcon />} size="sm">Amend Action</Button>
        <Button colorScheme="teal" variant="outline" leftIcon={<CalendarIcon />} size="sm">Amend Target Date</Button>
        <Button colorScheme="red" variant="outline" leftIcon={<CloseIcon />} size="sm">Close</Button>
        <Button colorScheme="gray" variant="outline" leftIcon={<DeleteIcon />} size="sm">Void</Button>
        <Button colorScheme="green" variant="outline" leftIcon={<CheckIcon />} size="sm">Save</Button>
        <Button colorScheme="orange" variant="outline" leftIcon={<WarningIcon />} size="sm">Cancel</Button>
        <Button colorScheme="purple" variant="outline" leftIcon={<RepeatIcon />} size="sm">Reopened</Button>
        <Button colorScheme="pink" variant="outline" leftIcon={<ArrowDownIcon />} size="sm">Voided</Button>
        <Button colorScheme="cyan" variant="outline" leftIcon={<CalendarIcon />} size="sm">Reopened Closed</Button>
      </Flex>
    </Box>
  );
}

export default ActionsPanel;
