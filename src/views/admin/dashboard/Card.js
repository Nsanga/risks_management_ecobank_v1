import React from 'react';
import { Box, Text, Stack, Heading, Icon, Flex } from '@chakra-ui/react';

const Card = ({ title, description, icon, color }) => {
  return (
    <Box>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <Box p="6">
          <Stack spacing="3">
            <Heading size="sm">{title}</Heading>
            <Flex alignItems='center' gap={2}>
              <Icon as={icon} color={color} h='15px' w='15px' />
              <Text fontSize="sm" fontWeight='semibold'>{description}</Text>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
