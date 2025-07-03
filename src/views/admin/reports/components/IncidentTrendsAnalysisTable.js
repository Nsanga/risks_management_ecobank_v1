import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
} from "@chakra-ui/react";

const IncidentTrendsAnalysisTable = () => {
  return (
    <Box p={6}>
      <Heading as="h3" size="md" mb={2} p={2}>
        Incident Trends Analysis Table
      </Heading>
      <Table variant="simple" size="sm" border="1px solid #ccc">
        <Thead bg="blue.500">
          <Tr>
            <Th color="white" textAlign="center" rowSpan={2}>
              Year
            </Th>
            <Th color="white" textAlign="center" rowSpan={2}>
              Month
            </Th>
            <Th color="white" textAlign="center" colSpan={2}>
              Actual Loss
            </Th>
            <Th color="white" textAlign="center" colSpan={2}>
              Total
            </Th>
          </Tr>
          <Tr bg="blue.500">
            <Th color="white" textAlign="center">
              No. of Events
            </Th>
            <Th color="white" textAlign="center">
              Total Losses
            </Th>
            <Th color="white" textAlign="center">
              No. of Events
            </Th>
            <Th color="white" textAlign="center">
              Total Losses
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td textAlign="center">2023</Td>
            <Td textAlign="center">Jul</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">7962</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">7962</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td colSpan={2} textAlign="center">
              Total
            </Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">7962</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">7962</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default IncidentTrendsAnalysisTable;
