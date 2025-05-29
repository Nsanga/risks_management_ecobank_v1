import React from 'react';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Badge,
  Circle
} from '@chakra-ui/react';

const Test = () => {
  const data = [
    {
      entity: 'ECM-FICC (ENT00409)',
      keyIndicator: 'KI02618 Number of cancelled client trades',
      kiType: 'Numeric',
      thresholdType: 'Target - higher value is worse',
      frequency: 'Monthly',
      i: 3,
      ii: 3,
      iii: 11,
      avg: 5.67,
      status: 'Status',
      trend: 'Trend : Stable',
      statusColor: 'blue',
      trendColor: 'red'
    },
    {
      entity: 'ECM-FICC (ENT00409)',
      keyIndicator: 'KI02622 Number of approved limits not respected by FICC',
      kiType: 'Numeric',
      thresholdType: 'Target - higher value is worse',
      frequency: 'Monthly',
      i: 2,
      ii: 2,
      iii: 2,
      avg: 2.00,
      status: 'Status',
      trend: 'Trend : Worsening',
      statusColor: 'blue',
      trendColor: 'orange'
    },
    {
      entity: 'ECM-FICC (ENT00409)',
      keyIndicator: 'KI02621 Number of months where ALCO did not hold',
      kiType: 'Numeric',
      thresholdType: 'Target - higher value is worse',
      frequency: 'Monthly',
      i: 3,
      ii: 2,
      iii: 1,
      avg: 2.00,
      status: 'Status',
      trend: 'Trend : Stable',
      statusColor: 'blue',
      trendColor: 'orange'
    },
    {
      entity: 'ECM-FICC (ENT00409)',
      keyIndicator: 'KI02619 Number of days XAF blotter is not published',
      kiType: 'Numeric',
      thresholdType: 'Target - higher value is worse',
      frequency: 'Monthly',
      i: 1,
      ii: 1,
      iii: 1,
      avg: 1.00,
      status: 'Status',
      trend: 'Trend : Stable',
      statusColor: 'blue',
      trendColor: 'orange'
    },
    {
      entity: 'ECM-FICC (ENT00409)',
      keyIndicator: 'KI02620 Number of pending or unapproved PP',
      kiType: 'Numeric',
      thresholdType: 'Target - higher value is worse',
      frequency: 'Monthly',
      i: 1,
      ii: 1,
      iii: 1,
      avg: 1.00,
      status: 'Status',
      trend: '',
      statusColor: 'blue',
      trendColor: ''
    }
  ];

  const getStatusIndicator = (color) => {
    const colorMap = {
      'red': '#FF0000',
      'orange': '#FFA500',
      'blue': '#0000FF'
    };
    return <Circle size="8px" bg={colorMap[color]} />;
  };

  return (
    <Box p={4} bg="white">
      <Table variant="simple" size="sm" border="1px solid #ccc">
        <Thead>
          <Tr bg="gray.100">
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={2} py={1}>
              Entity
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={2} py={1}>
              Key Indicator
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={2} py={1}>
              KI Type
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={2} py={1}>
              Threshold Type
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={2} py={1}>
              Frequency
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={1} py={1} textAlign="center">
              I
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={1} py={1} textAlign="center">
              II
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={1} py={1} textAlign="center">
              III
            </Th>
            <Th border="1px solid #ccc" fontSize="xs" color="black" fontWeight="bold" px={2} py={1} textAlign="center">
              Avg
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <Tr>
                <Td border="1px solid #ccc" px={2} py={1} fontSize="xs" verticalAlign="top">
                  <Box>
                    <Box bg="blue.600" color="white" px={2} py={0.5} fontSize="xs" fontWeight="bold" mb={1}>
                      {row.status}
                    </Box>
                    <Text fontSize="xs">{row.entity}</Text>
                  </Box>
                </Td>
                <Td border="1px solid #ccc" px={2} py={1} fontSize="xs" verticalAlign="top">
                  <Box display="flex" alignItems="center" gap={2}>
                    {getStatusIndicator(row.trendColor)}
                    <Box>
                      {row.trend && (
                        <Box bg="blue.600" color="white" px={2} py={0.5} fontSize="xs" fontWeight="bold" mb={1}>
                          {row.trend}
                        </Box>
                      )}
                      <Text fontSize="xs">{row.keyIndicator}</Text>
                    </Box>
                  </Box>
                </Td>
                <Td border="1px solid #ccc" px={2} py={1} fontSize="xs" textAlign="center">
                  {row.kiType}
                </Td>
                <Td border="1px solid #ccc" px={2} py={1} fontSize="xs" textAlign="center">
                  {row.thresholdType}
                </Td>
                <Td border="1px solid #ccc" px={2} py={1} fontSize="xs" textAlign="center">
                  {row.frequency}
                </Td>
                <Td border="1px solid #ccc" px={1} py={1} fontSize="xs" textAlign="center">
                  {row.i}
                </Td>
                <Td border="1px solid #ccc" px={1} py={1} fontSize="xs" textAlign="center">
                  {row.ii}
                </Td>
                <Td border="1px solid #ccc" px={1} py={1} fontSize="xs" textAlign="center">
                  {row.iii}
                </Td>
                <Td border="1px solid #ccc" px={2} py={1} fontSize="xs" textAlign="center">
                  {row.avg}
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default Test;