import React from "react";
import { Box, Heading, Table, Thead, Tr, Th, Text, Flex, Image, Tbody, Td } from "@chakra-ui/react";
import Loader from "../../../../assets/img/loader.gif";

const EventRecoveriesTable = ({ reports, loading }) => {
  return (
    <Box p={6}>
      <Heading as="h3" size="md" mb={2} p={2}>
        Event Recoveries
      </Heading>
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : (
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
          <Tbody>
            {reports.map((item, idx) => (
              <Tr key={idx}>
                <Td style={{ border: "1px solid gray" }}>EVT{item.num_ref}</Td>
                <Td style={{ border: "1px solid gray" }}>
                  {item.details.entityOfDetection.description}
                </Td>
                <Td style={{ border: "1px solid gray" }}>
                  {item.financials.data.actualRecovery?.total || 0}
                </Td>
                <Td style={{ border: "1px solid gray" }}>
                  {item.additionnalInfo.find(info => info.category === "Causes")?.description || ""}
                </Td>
                <Td style={{ border: "1px solid gray" }}>
                  {item.additionnalInfo.find(info => info.category === "Causes")?.topLevel || ""}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default EventRecoveriesTable;