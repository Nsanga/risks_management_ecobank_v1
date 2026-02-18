import { Box, Button, Flex, GridItem, Input, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Commentary = ({ commentaryData, onCommentaryChange }) => {
  console.log("commentaryData:", commentaryData); // Pour le débogage

  // Initialisation intelligente de l'état
  const [comment, setComment] = useState(() => {
    if (!commentaryData) return { comment: '' }; // Cas par défaut
    if (typeof commentaryData === 'string') return { comment: commentaryData }; // Cas string
    if (commentaryData.comment !== undefined) return commentaryData; // Cas objet avec propriété comment
    return { comment: '' }; // Fallback
  });

  const handleInputChange = (value) => {
    const newComment = { comment: value };
    setComment(newComment);
    onCommentaryChange(newComment); // Envoie toujours un objet au parent
  };

  // Initialisation au premier rendu
  useEffect(() => {
    onCommentaryChange(comment);
  }, []); // Seulement au montage

  return (
    <Box>
      <Flex direction="column" gap={4} flex="2">
        <Text fontWeight="bold" fontSize={12}>Commentaire</Text>
        <Textarea 
          size='sm' 
          value={comment.comment || ''} 
          onChange={(e) => handleInputChange(e.target.value)} 
          placeholder="Ajoutez votre commentaire ici..."
        />
      </Flex>
    </Box>
  );
};

export default Commentary;