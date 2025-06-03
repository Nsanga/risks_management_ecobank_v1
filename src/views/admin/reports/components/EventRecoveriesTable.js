import React from "react";
import { Box, Heading, Table, Thead, Tr, Th, Text } from "@chakra-ui/react";

const EventRecoveriesTable = () => {
  return (
    <Box p={6}>
      <Heading as="h3" size="md" mb={2} bg="gray.100" p={2}>
        Event Recoveries
      </Heading>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr bg="blue.500">
            <Th color="white" textAlign="center">
              Event Reference
            </Th>
            <Th color="white" textAlign="center">
              Detection Entity
            </Th>
            <Th color="white" textAlign="center">
              Gross Recovery
            </Th>
            <Th color="white" textAlign="center">
              Causal Category
            </Th>
            <Th color="white" textAlign="center">
              Top Level Causal Category
            </Th>
          </Tr>
        </Thead>
      </Table>
    </Box>
  );
};

export default EventRecoveriesTable;