import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  HStack,
  VStack,
  Button,
  Text,
  Checkbox,
} from '@chakra-ui/react';

const Action = () => {
  return (
    <Box className="container" fontSize="12px" p={4}>
      <Flex gap={6} flexWrap="wrap">
        {/* TABLE DES ACTIONS */}
        <Box flex="1" minW="45%">
          <Table variant="simple" size="sm">
            <Thead bg="blue.100">
              <Tr>
                <Th>Action Ref.</Th>
                <Th>Description</Th>
                <Th>Target / Completion Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td colSpan={3} textAlign="center">
                  No data to display
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        {/* FORMULAIRE D'INFORMATION */}
        <Box flex="1" minW="50%">
          <VStack align="start" spacing={3}>
            <Flex gap={4} w="100%">
              <Box flex="1">
                <Text fontWeight="bold">Action Ref:</Text>
                <Input size="sm" isReadOnly />
              </Box>
              <Box flex="1">
                <Text fontWeight="bold">Originating Risk Ref:</Text>
                <Input size="sm" isReadOnly />
              </Box>
              <Box flex="1">
                <Text fontWeight="bold">Action State:</Text>
                <Input size="sm" isReadOnly />
              </Box>
            </Flex>

            <Flex gap={4} w="100%">
              <Box flex="1">
                <Text>Source:</Text>
                <Input size="sm" isReadOnly value="Compliance" />
              </Box>
              <Box flex="1">
                <Text>Priority:</Text>
                <Input size="sm" value="1: High" isReadOnly />
              </Box>
              <Box flex="1">
                <Text>Reference:</Text>
                <Input size="sm" />
              </Box>
            </Flex>

            <Box w="100%">
              <Text>Description:</Text>
              <Input size="sm" />
            </Box>

            {/* Onglets */}
            <Tabs variant="solid-rounded" colorScheme="blue" w="100%">
              <TabList>
                <Tab>Commentary</Tab>
                <Tab>Progress</Tab>
                <Tab>Log</Tab>
                <Tab>Action Focus</Tab>
              </TabList>
              <TabPanels>
                <TabPanel><Textarea size="sm" placeholder="Commentary..." /></TabPanel>
                <TabPanel><Textarea size="sm" placeholder="Progress..." /></TabPanel>
                <TabPanel><Textarea size="sm" placeholder="Log..." /></TabPanel>
                <TabPanel><Textarea size="sm" placeholder="Action Focus..." /></TabPanel>
              </TabPanels>
            </Tabs>

            {/* Bas du formulaire */}
            <Flex gap={4} flexWrap="wrap" w="100%">
              <Box flex="1">
                <Text>Owner:</Text>
                <Input size="sm" />
              </Box>
              <Box flex="1">
                <Text>Nominee:</Text>
                <Input size="sm" />
              </Box>
              <Box flex="1">
                <Text>Reviewer:</Text>
                <Input size="sm" />
              </Box>
              <Box flex="1">
                <Text>Review Date:</Text>
                <Input size="sm" type="date" />
              </Box>
            </Flex>

            <Flex gap={4} flexWrap="wrap" w="100%">
  <HStack spacing={2}>
    <Checkbox />
    <Text mb="0" whiteSpace="nowrap">Target Date:</Text>
    <Input size="sm" type="date" />
  </HStack>
  <HStack spacing={2}>
    <Text mb="0" whiteSpace="nowrap">Cost:</Text>
    <Input size="sm" />
    </HStack>
    <HStack spacing={2}>
    <Text mb="0" whiteSpace="nowrap">Currency:</Text>
    <Select size="sm" defaultValue="USD">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="XAF">XAF</option>
    </Select>
    </HStack>
</Flex>

          </VStack>
        </Box>
      </Flex>

      {/* BOUTONS ACTIONS */}
      <Flex justify="center" gap={3} mt={6} wrap="wrap">
        <Button fontSize="sm" colorScheme="blue" variant="outline">+ Add Action</Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">✎ Amend Action</Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">📅 Amend Action Target Date</Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">⛔ Void</Button>
        <Button fontSize="sm" colorScheme="green" variant="outline">✔ Close</Button>
        <Button fontSize="sm" colorScheme="green" variant="outline">🔄 Reopen Closed</Button>
        <Button fontSize="sm" colorScheme="green" variant="outline">🔄 Reopen Voided</Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">💾 Save</Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">✖ Cancel</Button>
      </Flex>
    </Box>
  );
};

export default Action;
