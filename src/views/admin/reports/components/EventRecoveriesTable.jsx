import React from "react";
import { Box, Heading, Table, Thead, Tr, Th, Text, Flex, Image, Tbody, Td } from "@chakra-ui/react";
import Loader from "../../../../assets/img/loader.gif";
import moment from "moment";

const EventRecoveriesTable = ({ reports, loading }) => {
  const executed_by = localStorage.getItem("username") || "inconnu";
  const executed_time = moment().format("DD/MM/YYYY HH:mm:ss");
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
                  {item.details.entityOfDetection?.description}
                </Td>
                <Td style={{ border: "1px solid gray" }}>
                  {item.financials?.data?.actualRecovery?.total || 0}
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
      {!loading && (
        <Flex alignItems="center" justifyContent="end">
          <Text fontSize="12px" mt={4}>
            Exécuté Par {executed_by} {executed_time}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default EventRecoveriesTable;