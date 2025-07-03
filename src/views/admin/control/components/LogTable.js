import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  VStack,
  Textarea,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const LogTable = () => {
  const [data, setData] = useState([
    { dateTime: '2024-09-26 12:00', user: 'John Doe', type: 'Info', comment: '' },
    { dateTime: '2024-09-26 12:30', user: 'Jane Smith', type: 'Erreur', comment: '' },
  ]); // Données initiales exemples
  const [comment, setComment] = useState(''); // Gérer le commentaire sélectionné
  const [selectedLog, setSelectedLog] = useState(null); // Suivre la ligne sélectionnée
  const [isEditing, setIsEditing] = useState(false); // Suivre l'état édition

  const handleAddComment = () => {
    const newLog = {
      dateTime: new Date().toLocaleString(),
      user: 'Nouvel utilisateur',
      type: 'Info',
      comment,
    };
    setData((prevData) => [...prevData, newLog]);
    setComment('');
  };

  const handleAmendComment = () => {
    if (selectedLog) {
      const newLog = {
        ...selectedLog,
        comment,
      };
      setData((prevData) => prevData.map(log => log === selectedLog ? newLog : log));
      setComment('');
      setSelectedLog(null);
      setIsEditing(false);
    }
  };

  const handleRowClick = (log) => {
    setSelectedLog(log);
    setComment(log.comment || ''); // Remplir le champ commentaire avec le commentaire existant
    setIsEditing(true); // Mode édition
  };

  const handleCancel = () => {
    setComment('');
    setSelectedLog(null);
    setIsEditing(false);
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th fontSize="12px">Date/Heure</Th>
                  <Th fontSize="12px">Utilisateur</Th>
                  <Th fontSize="12px">Type</Th>
                  <Th fontSize="12px">Commentaire</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.length === 0 ? (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      <Text fontSize="12px">Aucune donnée à afficher</Text>
                    </Td>
                  </Tr>
                ) : (
                  data.map((log, index) => (
                    <Tr 
                      key={index} 
                      onClick={() => handleRowClick(log)} 
                      bg={selectedLog === log ? 'blue.100' : undefined} // Highlight ligne sélectionnée
                      cursor="pointer"
                    >
                      <Td fontSize="12px">{log.dateTime}</Td>
                      <Td fontSize="12px">{log.user}</Td>
                      <Td fontSize="12px">{log.type}</Td>
                      <Td fontSize="12px">{log.comment}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold" fontSize="12px" mb={2}>Commentaire</Text>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tapez votre commentaire ici..."
              size="sm"
              h={100}
              overflowY="auto"
              bg="gray.100"
              p={2}
              fontSize="12px"
            />
          </Box>
        </SimpleGrid>

        <HStack spacing={4} justify="center">
          <Button 
            variant="outline"
            colorScheme="blue" 
            onClick={handleAddComment} 
            leftIcon={<AddIcon />} 
            isDisabled={!comment}
            fontSize="12px"
          >
            Ajouter commentaire
          </Button>
          <Button 
            variant="outline"
            colorScheme="yellow" 
            onClick={handleAmendComment} 
            leftIcon={<EditIcon />} 
            isDisabled={!isEditing || !comment}
            fontSize="12px"
          >
            Modifier commentaire
          </Button>
          <Button 
            variant="outline"
            colorScheme="green" 
            onClick={handleAmendComment} 
            leftIcon={<CheckIcon />} 
            isDisabled={!isEditing || !comment}
            fontSize="12px"
          >
            Enregistrer
          </Button>
          <Button 
            variant="outline"
            colorScheme="red" 
            onClick={handleCancel} 
            leftIcon={<CloseIcon />}
            fontSize="12px"
          >
            Annuler
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LogTable;
