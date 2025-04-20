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
  Textarea,
  Button,
  Flex,
  HStack,
  VStack,
  Text,
  Badge,
} from '@chakra-ui/react';
import { CheckCircleIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const History = () => {
  return (
    <Box className="container" fontSize="12px" p={4}>
      {/* TABLE PRINCIPALE */}
      <Table variant="simple" mb={6} size="sm">
        <Thead bg="blue.100">
          <Tr fontSize="10px">
            <Th>Status</Th>
            <Th>Trend</Th>
            <Th>0.00</Th>
            <Th>0.00</Th>
            <Th>Average</Th>
            <Th>R</Th>
            <Th>A</Th>
            <Th>Target</Th>
            <Th>A</Th>
            <Th>R</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <CheckCircleIcon color="green.400" />
            </Td>
            <Td>
              <ArrowForwardIcon />
            </Td>
            <Td>0.00</Td>
            <Td>0.00</Td>
            <Td>0.00</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td color="green.600">0.00</Td>
            <Td color="orange.500">5.00</Td>
            <Td color="red.500">6.00</Td>
          </Tr>
        </Tbody>
      </Table>

      {/* PANEL DES DÉTAILS */}
      <Flex gap={8} flexWrap="wrap">
        {/* Liste des périodes */}
        <Box flex="1">
          <Table variant="simple" size="sm">
            <Thead bg="gray.100">
              <Tr>
                <Th>Status</Th>
                <Th>Period</Th>
                <Th>Time</Th>
                <Th>Threshold Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {["29/12/2024", "29/11/2024", "30/10/2024", "30/09/2024"].map((date, idx) => (
                <Tr key={idx}>
                  <Td><CheckCircleIcon color="green.400" /></Td>
                  <Td>{date}</Td>
                  <Td></Td>
                  <Td>0.00</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Formulaire de modification */}
        <Box flex="1" bg="gray.50" p={4} borderRadius="md" boxShadow="md">
          <VStack align="start" spacing={3}>
            <HStack>
              <Text>Period :</Text>
              <Input size="sm" value="28/01/2025" readOnly />
            </HStack>

            <HStack>
              <Text>Value :</Text>
              <Input size="sm" placeholder="Enter value..." />
            </HStack>

            <Box w="100%">
              <HStack spacing={4} mb={2}>
                <Text fontWeight="bold" w="30px">R :</Text>
                <Input bg="red.400" color="white" size="sm" value="6.00" readOnly />
              </HStack>

              <HStack spacing={4} mb={2}>
                <Text fontWeight="bold" w="30px">A :</Text>
                <Input bg="orange.300" size="sm" value="5.00" readOnly />
              </HStack>

              <HStack spacing={4}>
                <Text fontWeight="bold" w="30px">G :</Text>
                <Input bg="green.400" size="sm" value="0" readOnly />
              </HStack>
            </Box>

            <Box w="100%">
              <Text>Comments :</Text>
              <Textarea size="sm" placeholder="Write a comment..." />
            </Box>

            <HStack>
            <Button fontSize="sm" colorScheme="blue" variant="outline">
          Document
        </Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">
          Amend
        </Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">
          Save
        </Button>
        <Button fontSize="sm" colorScheme="blue" variant="outline">
          Cancel
        </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default History;
