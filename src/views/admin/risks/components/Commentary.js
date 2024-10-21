import { Box, Button, Flex, GridItem, Input, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Commentary = ({ event, onCommentaryChange }) => {
  const [comment, setComment] = useState({
    commentary: '',
  });

  useEffect(() => {
    if (event) {
      setComment({
        commentary: event?.details.descriptionDetailled || '',
      })
    }
  }, [event]);

  const handleInputChange = (field, value) => {
    setComment(prevData => {
      const newData = { ...prevData, [field]: value };
      onCommentaryChange(newData); // Notify parent about changes
      return newData;
    });
  };
  return (
    <Box>
      <Flex direction="column" gap={4} flex="2">
        <Text fontWeight="bold" fontSize={12}>Commentary</Text>
        <Textarea size='sm' value={comment.commentary} onChange={(e) => handleInputChange('commentary', e.target.value)} />
      </Flex>
    </Box>
  );
}

export default Commentary;
