import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box, Flex, Select, Text } from '@chakra-ui/react';
import moment from 'moment';

const Finances = ({
  approved,
  closed,
  targetClosure,
  owner,
  nominee,
  reviewer,
  reviewerDate
}) => {

  return (
    <Box p={5} shadow='md' borderWidth='1px'>
      <Flex justifyContent='space-between' pt={5}>
        <Flex flexDirection='column' gap={2}>
          <Flex gap={20} alignItems="center">
            <Text fontSize={12}>Approved  :</Text>
            <Box width={200} >
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{approved === null ? "" : moment(approved).format('DD/MM/YYYY')}</Text>
            </Box>
          </Flex>
          <Flex gap={14} alignItems="center">
            <Text fontSize={12}>Closed Date :</Text>
            <Box width={200} marginLeft={3}>
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{closed === null ? "" : moment(closed).format('DD/MM/YYYY')}</Text>
            </Box>
          </Flex>
          <Flex gap={6} alignItems="center">
            <Text fontSize={12}>Target Closure Date :</Text>
            <Box width={200}>
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{targetClosure}</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex flexDirection='column' gap={2}>
          <Flex gap={10} alignItems="center">
            <Text fontSize={12}>Owner : </Text>
            <Box width={200} marginLeft={1}>
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{owner}</Text>
            </Box>
          </Flex>
          <Flex gap={8} alignItems="center">
            <Text fontSize={12}>Nominee : </Text>
            <Box width={200} >
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{nominee}</Text>
            </Box>
          </Flex>
          <Flex gap={10} alignItems="center">
            <Text fontSize={12}>Reviewer :</Text>
            <Box width={200} marginLeft={1}>
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{reviewer}</Text>
            </Box>
          </Flex>
          <Flex gap={6} alignItems="center">
            <Text fontSize={12}>Reviewer Date :</Text>
            <Box width={200}>
              <Text fontSize={12} style={{ color: 'blue', fontWeight: 'bold' }}>{reviewerDate === null ? "" : moment(reviewerDate).format('DD/MM/YYYY')}</Text> 
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Finances;
