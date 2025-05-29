import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';

const data = [
  {
    keyIndicator: 'KI02818 Number of cancelled client trades',
    kiType: 'Numeric',
    thresholdType: 'Target - higher value is worse',
    frequency: 'Monthly',
    I: 3,
    II: 3,
    III: 11,
    avg: 5.67,
    thresholds: { r1: 0, a1: 0, target: 0, a2: 1, r2: 2 },
    trend: 'Stable',
  },
  {
    keyIndicator: 'KI02821 Number of months where ALCO did not hold',
    kiType: 'Numeric',
    thresholdType: 'Target - higher value is worse',
    frequency: 'Monthly',
    I: 3,
    II: 2,
    III: 1,
    avg: 2.0,
    thresholds: { r1: 0, a1: 0, target: 0, a2: 3, r2: 4 },
    trend: 'Worsening',
  },
  // ...ajoute d'autres lignes ici
];

const getTrendColor = (trend) => {
  switch (trend) {
    case 'Stable':
      return 'green';
    case 'Worsening':
      return 'red';
    case 'Improving':
      return 'blue';
    default:
      return 'gray';
  }
};

const KITrendTable = () => {
  return (
    <VStack spacing={6} align="stretch" p={5}>
      <Heading size="lg">CR101 KI with Trend</Heading>

      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>Entity</Th>
              <Th>Key Indicator</Th>
              <Th>KI Type</Th>
              <Th>Threshold Type</Th>
              <Th>Frequency</Th>
              <Th>I</Th>
              <Th>II</Th>
              <Th>III</Th>
              <Th>Avg</Th>
              <Th colSpan={5} textAlign="center">Threshold</Th>
              <Th>Trend</Th>
            </Tr>
            <Tr>
              <Th colSpan={9}></Th>
              <Th>(-)R</Th>
              <Th>(-)A</Th>
              <Th>Target</Th>
              <Th>(+)A</Th>
              <Th>(+)R</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, idx) => (
              <Tr key={idx}>
                <Td>ECM-FICC (ENT00409)</Td>
                <Td>{row.keyIndicator}</Td>
                <Td>{row.kiType}</Td>
                <Td>{row.thresholdType}</Td>
                <Td>{row.frequency}</Td>
                <Td>{row.I}</Td>
                <Td>{row.II}</Td>
                <Td>{row.III}</Td>
                <Td>{row.avg}</Td>
                <Td>{row.thresholds.r1}</Td>
                <Td>{row.thresholds.a1}</Td>
                <Td>{row.thresholds.target}</Td>
                <Td>{row.thresholds.a2}</Td>
                <Td>{row.thresholds.r2}</Td>
                <Td>
                  <Badge colorScheme={getTrendColor(row.trend)}>
                    {row.trend}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default KITrendTable;
