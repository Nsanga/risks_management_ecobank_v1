import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react'

const CommentaryEvent = ({commentaryData}) => {
  return (
    <Box>
      <Flex direction="column" gap={4} flex="2">
        <Text fontWeight="bold" fontSize={14}>Commentary</Text>
        <Text color='blue' fontSize={14}>{commentaryData.commentary}</Text>
      </Flex>
    </Box>
  );
}

export default CommentaryEvent;
