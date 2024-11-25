import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const AdditionalInfoEvent = ({ additionalData, categories }) => {
    console.log("additional info::::::", additionalData)
  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={12}>Category</Th>
            <Th fontSize={12}>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(additionalData).map((index) => (
            <Tr key={index}>
              <Td fontSize={12}>{categories[index]}</Td>
              <Td fontSize={12}>{additionalData[index]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default AdditionalInfoEvent;
