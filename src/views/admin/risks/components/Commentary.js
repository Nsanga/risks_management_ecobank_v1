import { Box, Button, Flex, GridItem, Input, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Commentary = ({ commentaryData, onCommentaryChange }) => {
  const [comment, setComment] = useState(commentaryData || {});

  const handleInputChange = (field, value) => {
    setComment(prevData => {
      const newData = { ...prevData, [field]: value };
      onCommentaryChange(newData); // Notify parent about changes
      return newData;
    });
  };

  useEffect(() => {
    if (commentaryData) {
      setComment(commentaryData.comment || "");
    }
  }, [commentaryData]);

  useEffect(() => {
    if (comment) {
      onCommentaryChange(comment);
    }
  }, []);

  return (
    <Box>
      <Flex direction="column" gap={4} flex="2">
        <Text fontWeight="bold" fontSize={12}>Commentaire</Text>
        <Textarea size='sm' value={comment.commentary} onChange={(e) => handleInputChange('commentary', e.target.value)} />
      </Flex>
    </Box>
  );
}

export default Commentary;
