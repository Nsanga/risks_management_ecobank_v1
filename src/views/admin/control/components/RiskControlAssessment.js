// src/components/RiskControlAssessment.js

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const RiskControlAssessment = () => {
  const [formData, setFormData] = useState({
    performance: "Not Assessed",
    efficiency: "Not Assessed",
    design: "Acceptable",
    assessedBy: "Georges MOUMPOU",
    assessedOn: "12/02/2025",
    dueOn: "13/01/2025",
    cost: "",
    currency: "USD",
    notes: "",
  });

  return (
    <Box p={6} bg="gray.100" borderRadius="md" maxW="90vw" mx="auto">
      {/* Container Grid */}
      <Grid templateColumns="1fr 1fr" gap={6} alignItems="start">
        {/* Left Column (Table) */}
        <GridItem>
          <Box bg="white" p={4} borderRadius="md" boxShadow="md" maxWidth="100%">
            <Table variant="simple" size="sm" width="100%">
              <Thead bg="gray.200">
                <Tr>
                  <Th w="10%">Ref</Th>
                  <Th w="20%">Assessed On</Th>
                  <Th w="20%">Due On</Th>
                  <Th w="10%">CF%</Th>
                  <Th w="20%">Design</Th>
                  <Th w="20%">Performance</Th>
                  <Th w="10%">Attested</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>null</Td>
                  <Td>28/09/2024</Td>
                  <Td>28/08/2024</Td>
                  <Td>0%</Td>
                  <Td>Acceptable</Td>
                  <Td>Unsatisfactory</Td>
                  <Td>
                    <Checkbox isChecked={true} isReadOnly />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </GridItem>

        {/* Right Column (Form) */}
        <GridItem>
          <Box bg="white" p={6} borderRadius="md" boxShadow="md">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Performance</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.performance}
                    onChange={(e) => setFormData({ ...formData, performance: e.target.value })}
                  >
                    <option>Not Assessed</option>
                    <option>Good</option>
                    <option>Unsatisfactory</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Efficiency</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.efficiency}
                    onChange={(e) => setFormData({ ...formData, efficiency: e.target.value })}
                  >
                    <option>Not Assessed</option>
                    <option>Good</option>
                    <option>Unsatisfactory</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Design</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.design}
                    onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                  >
                    <option>Acceptable</option>
                    <option>Not Acceptable</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Assessed By</FormLabel>
                  <Input
                    fontSize="sm"
                    type="text"
                    value={formData.assessedBy}
                    onChange={(e) => setFormData({ ...formData, assessedBy: e.target.value })}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Assessed On</FormLabel>
                  <Input
                    fontSize="sm"
                    type="date"
                    value={formData.assessedOn}
                    onChange={(e) => setFormData({ ...formData, assessedOn: e.target.value })}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Due On</FormLabel>
                  <Input
                    fontSize="sm"
                    type="date"
                    value={formData.dueOn}
                    onChange={(e) => setFormData({ ...formData, dueOn: e.target.value })}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Cost</FormLabel>
                  <Input
                    fontSize="sm"
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Currency</FormLabel>
                  <Select
                    fontSize="sm"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel fontSize="sm">Notes</FormLabel>
                  <Textarea
                    fontSize="sm"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
      </Grid>

      {/* Buttons */}
      <Flex justifyContent="center" gap={4} mt={6}>
        <Button fontSize="sm" colorScheme="blue" variant="outline">
          Amend Assess
        </Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">
          UnAttest Assess
        </Button>
        <Button fontSize="sm" colorScheme="green" variant="outline">
          Save
        </Button>
        <Button fontSize="sm" colorScheme="red" variant="outline">
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

export default RiskControlAssessment;
