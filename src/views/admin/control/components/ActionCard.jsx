import React from 'react';
import { 
  Box, 
  Text, 
  Grid, 
  Badge, 
  Flex, 
  Progress, 
  Tooltip,
  useColorModeValue,
  Icon,
  HStack,
  VStack
} from '@chakra-ui/react';
import { 
  FiCalendar, 
  FiUser, 
  FiTrendingUp, 
  FiInfo,
  FiClipboard
} from 'react-icons/fi';

const ActionCard = ({ actions }) => {
  // Couleurs selon le theme
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headerColor = useColorModeValue('gray.600', 'gray.400');
  const shadow = useColorModeValue('sm', 'dark-lg');

  // Fonction pour obtenir la couleur selon l'évolution
  const getEvolutionColor = (evolution) => {
    const colors = {
      'Terminé': { color: 'green', scheme: 'green', progress: 100 },
      'En cours': { color: 'blue', scheme: 'blue', progress: 60 },
      'En retard': { color: 'red', scheme: 'red', progress: 30 },
      'À démarrer': { color: 'orange', scheme: 'orange', progress: 10 },
      'Planifié': { color: 'purple', scheme: 'purple', progress: 20 }
    };
    return colors[evolution] || { color: 'gray', scheme: 'gray', progress: 0 };
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Non défini';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <VStack spacing={4} align="stretch">
      {actions.map((action) => {
        const evolutionInfo = getEvolutionColor(action.evolutionAction);
        
        return (
          <Box
            key={action._id}
            borderWidth="1px"
            borderRadius="xl"
            p={5}
            boxShadow={shadow}
            bg={cardBg}
            borderColor={borderColor}
            transition="all 0.3s ease"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              borderColor: 'blue.200'
            }}
            position="relative"
            overflow="hidden"
          >
            {/* Barre de progression latérale */}
            <Box
              position="absolute"
              left="0"
              top="0"
              bottom="0"
              width="4px"
              bg={`${evolutionInfo.color}.400`}
            />
            
            <Grid
              templateColumns={{
                base: "1fr",
                md: "minmax(120px, 1fr) minmax(200px, 2fr) minmax(150px, 1fr) minmax(150px, 1fr) auto",
                lg: "100px minmax(250px, 1.5fr) minmax(180px, 1fr) minmax(180px, 1fr) minmax(150px, 1fr) auto"
              }}
              gap={{ base: 3, md: 4 }}
              alignItems="start"
            >
              {/* Référence */}
              <VStack align="start" spacing={1}>
                <Flex align="center" color={headerColor}>
                  <Icon as={FiClipboard} mr={1} boxSize={3} />
                  <Text fontSize="xs" fontWeight="medium">
                    Référence
                  </Text>
                </Flex>
                <Badge
                  colorScheme="blue"
                  fontSize="sm"
                  px={2}
                  py={1}
                  borderRadius="md"
                  variant="subtle"
                >
                  ACT{action.reference}
                </Badge>
              </VStack>

              {/* Description */}
              <VStack align="start" spacing={1}>
                <Flex align="center" color={headerColor}>
                  <Icon as={FiInfo} mr={1} boxSize={3} />
                  <Text fontSize="xs" fontWeight="medium">
                    Description
                  </Text>
                </Flex>
                <Tooltip label={action.descriptionAction} hasArrow>
                  <Text 
                    fontSize="sm" 
                    fontWeight="medium"
                    noOfLines={2}
                    lineHeight="short"
                    cursor="help"
                  >
                    {action.descriptionAction}
                  </Text>
                </Tooltip>
              </VStack>

              {/* Délai */}
              <VStack align="start" spacing={1}>
                <Flex align="center" color={headerColor}>
                  <Icon as={FiCalendar} mr={1} boxSize={3} />
                  <Text fontSize="xs" fontWeight="medium">
                    Délai
                  </Text>
                </Flex>
                <Flex align="center">
                  <Text fontSize="sm" fontWeight="medium">
                    {formatDate(action.delaisAction)}
                  </Text>
                  {action.delaisAction && new Date(action.delaisAction) < new Date() && 
                   action.evolutionAction !== 'Terminé' && (
                    <Badge
                      colorScheme="red"
                      size="sm"
                      ml={2}
                      fontSize="xs"
                    >
                      Retard
                    </Badge>
                  )}
                </Flex>
                {action.delaisAction && (
                  <Text fontSize="xs" color="gray.500">
                    {Math.ceil((new Date(action.delaisAction) - new Date()) / (1000 * 60 * 60 * 24))} jours
                  </Text>
                )}
              </VStack>

              {/* Propriétaire */}
              <VStack align="start" spacing={1}>
                <Flex align="center" color={headerColor}>
                  <Icon as={FiUser} mr={1} boxSize={3} />
                  <Text fontSize="xs" fontWeight="medium">
                    Propriétaire
                  </Text>
                </Flex>
                <Badge
                  colorScheme="purple"
                  fontSize="sm"
                  px={2}
                  py={1}
                  borderRadius="md"
                  variant="subtle"
                  maxW="150px"
                  noOfLines={1}
                >
                  {action.proprioAction}
                </Badge>
              </VStack>

              {/* Évolution */}
              <VStack align="start" spacing={2} width="100%">
                <Flex align="center" color={headerColor}>
                  <Icon as={FiTrendingUp} mr={1} boxSize={3} />
                  <Text fontSize="xs" fontWeight="medium">
                    Évolution
                  </Text>
                </Flex>
                <VStack spacing={1} width="100%">
                  <Badge
                    colorScheme={evolutionInfo.scheme}
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="full"
                    width="fit-content"
                  >
                    {action.evolutionAction}
                  </Badge>
                  <Progress 
                    value={evolutionInfo.progress} 
                    colorScheme={evolutionInfo.scheme}
                    size="sm" 
                    width="100%"
                    borderRadius="full"
                    bg="gray.100"
                  />
                </VStack>
              </VStack>

              {/* Indicateur de statut (mobile) */}
              <Box
                display={{ base: 'block', md: 'none' }}
                position="absolute"
                top="3"
                right="3"
                width="8px"
                height="8px"
                borderRadius="full"
                bg={`${evolutionInfo.color}.400`}
              />
            </Grid>

            {/* Informations supplémentaires pour mobile */}
            <Flex
              display={{ base: 'flex', md: 'none' }}
              justify="space-between"
              mt={3}
              pt={3}
              borderTop="1px solid"
              borderColor={borderColor}
            >
              <HStack spacing={4}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color={headerColor}>Délai</Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {formatDate(action.delaisAction)}
                  </Text>
                </VStack>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color={headerColor}>Propriétaire</Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {action.proprioAction}
                  </Text>
                </VStack>
              </HStack>
            </Flex>
          </Box>
        );
      })}
    </VStack>
  );
};

export default ActionCard;