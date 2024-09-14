import React, { useState } from 'react';
import { 
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
  ModalFooter, FormControl, FormLabel, Input, useDisclosure, Flex, 
  Box, Select, RadioGroup, Radio, HStack, Table, Thead, Tbody, Tr, Th, Td 
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function AddControl() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // Mock table data for risks and controls
  const risksData = [
    {
      refId: 'R001',
      description: 'Risk related to system performance',
      owner: 'John Doe',
      nominee: 'Jane Doe',
      reviewer: 'Alice',
      category: 'Performance',
      exposure: 'Low'
    },
    {
      refId: 'R002',
      description: 'Security vulnerability in application',
      owner: 'Mike Ross',
      nominee: 'Harvey Specter',
      reviewer: 'Rachel Zane',
      category: 'Security',
      exposure: 'High'
    }
  ];

  const controlsData = [
    {
      refId: 'C001',
      description: 'Control on system updates',
      owner: 'Amanda Paul',
      nominee: 'Chris Evert',
      reviewer: 'Nick',
      category: 'Update',
      exposure: 'Medium'
    },
    {
      refId: 'C002',
      description: 'Control on security patches',
      owner: 'Mike Tyson',
      nominee: 'Bruce Wayne',
      reviewer: 'Clark Kent',
      category: 'Security',
      exposure: 'High'
    }
  ];

  // State for toggling between risks and controls
  const [showRisks, setShowRisks] = useState(true);

  return (
    <>
      <Flex direction="column" justifyContent="flex-end" align="flex-end" mb={5} w="100%">
        <Button
          variant="outline"
          color="blue"
          leftIcon={<AddIcon />}
          onClick={onOpen}
        >
          Add Control
        </Button>

        {/* Layout container with fields */}
        <Box w="100%" p={4} mt={4} borderWidth="1px" borderRadius="lg">
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <FormControl mr={4} maxW="250px">
              <FormLabel>Entity</FormLabel>
              <Select placeholder="Select entity">
                <option value="entity1">Entity 1</option>
                <option value="entity2">Entity 2</option>
              </Select>
            </FormControl>

            <FormControl mr={4} maxW="150px">
              <FormLabel>RAM</FormLabel>
              <Input isDisabled placeholder="RAM Value" />
            </FormControl>

            <FormControl maxW="150px">
              <FormLabel>Owner</FormLabel>
              <Input isDisabled placeholder="Owner Name" />
            </FormControl>
          </Flex>

          {/* Toggle between Risks and Controls */}
          <Flex direction="row" align="center" mb={4}>
            <FormLabel mr={4}>Show:</FormLabel>
            <RadioGroup
              defaultValue="Risks"
              onChange={(value) => setShowRisks(value === 'Risks')}
            >
              <HStack spacing={4}>
                <Radio value="Risks">Risks</Radio>
                <Radio value="Controls">Controls</Radio>
                <Radio value="Events">Events</Radio>
                <Radio value="Actions">Actions</Radio>
                <Radio value="Kits">Kits</Radio>
                <Radio value="Obligations">Obligations</Radio>
              </HStack>
            </RadioGroup>
          </Flex>

          {/* Filters */}
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <FormControl mr={4} maxW="200px">
              <FormLabel>Filter on</FormLabel>
              <Select placeholder="All Approval State">
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </Select>
            </FormControl>

            <FormControl mr={4} maxW="150px">
              <FormLabel>Status</FormLabel>
              <Select placeholder="Select Status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </FormControl>

            <FormControl mr={4} maxW="150px">
              <FormLabel>Number of Risks</FormLabel>
              <Input type="number" placeholder="0" />
            </FormControl>

            <FormControl maxW="250px">
              <FormLabel>Total Annual Residual Exposure</FormLabel>
              <Input placeholder="$0.00" />
            </FormControl>
          </Flex>
        </Box>

        {/* Displaying the table below based on the selection */}
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Reference Id</Th>
              <Th>Description</Th>
              <Th>Owner</Th>
              <Th>Nominee</Th>
              <Th>Reviewer</Th>
              <Th>Category</Th>
              <Th>Residual Exposure</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(showRisks ? risksData : controlsData).map((row, index) => (
              <Tr key={index}>
                <Td>{row.refId}</Td>
                <Td>{row.description}</Td>
                <Td>{row.owner}</Td>
                <Td>{row.nominee}</Td>
                <Td>{row.reviewer}</Td>
                <Td>{row.category}</Td>
                <Td>{row.exposure}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>

      {/* Modal for adding a new control */}
      <Modal isOpen={isOpen} initialFocusRef={initialRef} finalFocusRef={finalRef} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Control</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Control Name</FormLabel>
              <Input ref={initialRef} placeholder="Control Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description of the Control" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddControl;
