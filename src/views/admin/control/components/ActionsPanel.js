import React, { useState } from 'react';
import { Box, Flex, Grid, Button, Input, Textarea, Table, Thead, Tbody, Tr, Th, Td, useToast, Text } from '@chakra-ui/react';
import { AddIcon, EditIcon, CalendarIcon, CloseIcon, DeleteIcon, CheckIcon, RepeatIcon, WarningIcon, ArrowDownIcon } from '@chakra-ui/icons';

function ActionsPanel() {
  const [actions, setActions] = useState([]);
  const [formData, setFormData] = useState({
    owner: '',
    nominee: '',
    reviewer: '',
    reviewDate: '',
    targetDate: '',
    cost: '',
    description: '',
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAction = () => {
    const newAction = { ...formData, actionRef: `RSG${Math.random().toString(36).substr(2, 5).toUpperCase()}` };
    setActions(prev => [...prev, newAction]);
    setFormData({
      owner: '',
      nominee: '',
      reviewer: '',
      reviewDate: '',
      targetDate: '',
      cost: '',
      description: '',
    });
    toast({
      title: "Action ajoutée.",
      description: "Votre action a été ajoutée avec succès.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="container" p={4}>
      {/* Conteneur Flex pour les deux panneaux */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={6} mb={4}>
        {/* Panneau gauche */}
        <Box className="left-panel" flex="1">
          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th fontSize="12px">Réf. Action</Th>
                <Th fontSize="12px">Description</Th>
                <Th fontSize="12px">Date cible / Achèvement</Th>
              </Tr>
            </Thead>
            <Tbody>
              {actions.length === 0 ? (
                <Tr>
                  <Td colSpan="3" textAlign="center" fontSize="12px">Aucune donnée à afficher</Td>
                </Tr>
              ) : (
                actions.map((action, index) => (
                  <Tr key={index}>
                    <Td fontSize="12px">{action.actionRef}</Td>
                    <Td fontSize="12px">{action.description}</Td>
                    <Td fontSize="12px">{action.targetDate}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>

        {/* Panneau droit */}
        <Box className="right-panel" flex="1">
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2} fontSize="12px">Propriétaire :</Text>
              <Input name="owner" value={formData.owner} onChange={handleInputChange} fontSize="12px" />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2} fontSize="12px">Candidat :</Text>
              <Input name="nominee" value={formData.nominee} onChange={handleInputChange} fontSize="12px" />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2} fontSize="12px">Vérificateur :</Text>
              <Input name="reviewer" value={formData.reviewer} onChange={handleInputChange} fontSize="12px" />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2} fontSize="12px">Date de révision :</Text>
              <Input name="reviewDate" type="date" value={formData.reviewDate} onChange={handleInputChange} fontSize="12px" />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2} fontSize="12px">Date cible :</Text>
              <Input name="targetDate" type="date" value={formData.targetDate} onChange={handleInputChange} fontSize="12px" />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb={2} fontSize="12px">Coût :</Text>
              <Input name="cost" type="number" placeholder="0.00" value={formData.cost} onChange={handleInputChange} fontSize="12px" />
            </Flex>
          </Grid>

          {/* Description */}
          <Box mb={4}>
            <Text fontWeight="bold" mb={2} fontSize="12px">Description :</Text>
            <Textarea placeholder="Focus de l'action" name="description" value={formData.description} onChange={handleInputChange} fontSize="12px" />
          </Box>
        </Box>
      </Flex>

      {/* Panneau des boutons sous les deux panneaux */}
      <Flex justify="space-between" wrap="nowrap" gap={2} mb={4}>
        <Button colorScheme="blue" variant="outline" leftIcon={<AddIcon />} size="sm" onClick={handleAddAction} fontSize="12px">Ajouter action</Button>
        <Button colorScheme="yellow" variant="outline" leftIcon={<EditIcon />} size="sm" fontSize="12px">Modifier action</Button>
        <Button colorScheme="teal" variant="outline" leftIcon={<CalendarIcon />} size="sm" fontSize="12px">Modifier date cible</Button>
        <Button colorScheme="red" variant="outline" leftIcon={<CloseIcon />} size="sm" fontSize="12px">Fermer</Button>
        <Button colorScheme="gray" variant="outline" leftIcon={<DeleteIcon />} size="sm" fontSize="12px">Annuler</Button>
        <Button colorScheme="green" variant="outline" leftIcon={<CheckIcon />} size="sm" fontSize="12px">Enregistrer</Button>
        <Button colorScheme="orange" variant="outline" leftIcon={<WarningIcon />} size="sm" fontSize="12px">Annuler</Button>
        <Button colorScheme="purple" variant="outline" leftIcon={<RepeatIcon />} size="sm" fontSize="12px">Réouvert</Button>
        <Button colorScheme="pink" variant="outline" leftIcon={<ArrowDownIcon />} size="sm" fontSize="12px">Annulé</Button>
        <Button colorScheme="cyan" variant="outline" leftIcon={<CalendarIcon />} size="sm" fontSize="12px">Réouvert fermé</Button>
      </Flex>
    </Box>
  );
}

export default ActionsPanel;
