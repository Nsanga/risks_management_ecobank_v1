import React from 'react';
import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const CustomCard = ({ children }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      {children}
    </Box>
  );
};

const CustomerSummaryCard = () => {
  return (
    <CustomCard>
      {/* Flex container for text and icons */}
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        {/* Texte à gauche */}
        <Box flex="1">
          <Text>
            View a summary of all your customers over the last month.
          </Text>
        </Box>
      </Flex>
    </CustomCard>
  );
};

export default CustomerSummaryCard;
