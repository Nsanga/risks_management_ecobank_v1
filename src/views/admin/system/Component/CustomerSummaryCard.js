import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const CustomCard = ({ children, onClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      cursor="pointer"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const CustomerSummaryCard = ({ groupName, roles, onEdit }) => {
  return (
    <CustomCard onClick={onEdit}>
      <Flex direction="column" alignItems="flex-start">
        <Text fontWeight="bold">{groupName}</Text>
              </Flex>
    </CustomCard>
  );
};

export default CustomerSummaryCard;
