import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const FinancesEvent = ({ financesData }) => {
  return (
    <Box>
      <Table variant="simple">
        <Thead height="10px">
          <Tr height="10px">
            <Th textAlign="start"></Th>
            <Th textAlign="start" fontSize={10}>Total</Th>
            <Th textAlign="start" fontSize={10}>Direct</Th>
            <Th textAlign="start" fontSize={10}>Amendes réglementaires</Th>
            <Th textAlign="start" fontSize={10}>Réduction de valeur d’actif</Th>
            <Th textAlign="start" fontSize={10}>Autre</Th>
          </Tr>
        </Thead>
        <Tbody>
          {financesData.map(row => (
            <Tr key={row.id} height="30px">
              <Td fontSize={12} width='15%' height="10px">{row.name}</Td>
              <Td height="10px" fontSize={12}>
              {row.total || 0}
                </Td>
              {row.values.map((value, index) => (
                <Td key={index} height="10px">
                  <Text fontSize={12}>{value || 0}</Text>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FinancesEvent;
