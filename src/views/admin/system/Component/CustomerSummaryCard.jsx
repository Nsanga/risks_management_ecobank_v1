import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const CustomCard = ({ children, onClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      onClick={onClick}
      cursor="pointer"
      mb={4}
    >
      {children}
    </Box>
  );
};

const CustomerSummaryCard = ({ selectedUserGroup, onCardClick }) => {
  return (
    <CustomCard onClick={onCardClick}>
      <Box flex="1">
        <Text fontSize={12}>{selectedUserGroup.groupName}</Text>
      </Box>
    </CustomCard>
  );
};

export default CustomerSummaryCard;
