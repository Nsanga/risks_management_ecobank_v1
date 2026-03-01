import { 
    Box, 
    Flex, 
    Image, 
    Radio, 
    RadioGroup, 
    Stack, 
    Text,
    useToast,
    SlideFade
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { connect, useDispatch } from 'react-redux';
  import { listActions } from 'reduxStore/actions/action';
  import ActionCard from '../control/components/ActionCard';
  import Loader from '../../../assets/img/loader.gif';
  
  const Actions = ({ actions, loading }) => {
      const dispatch = useDispatch();
      const toast = useToast();
      const [filter, setFilter] = useState('ALL');
      const [filterLoading, setFilterLoading] = useState(false);
      const [localLoading, setLocalLoading] = useState(false);
  
      // Fonction pour charger les actions avec un filtre
      const loadActionsWithFilter = async (selectedFilter) => {
          setFilterLoading(true);
          setLocalLoading(true);
          
          try {
              await dispatch(listActions(selectedFilter));
          } catch (error) {
              toast({
                  title: "Erreur",
                  description: "Impossible de charger les actions",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
              });
          } finally {
              setFilterLoading(false);
              setLocalLoading(false);
          }
      };
  
      // Chargement initial
      useEffect(() => {
          loadActionsWithFilter('ALL');
      }, [dispatch]);
  
      // Gestion du changement de filtre
      const handleFilterChange = (newFilter) => {
          setFilter(newFilter);
          loadActionsWithFilter(newFilter);
      };
  
      // Obtenir le texte du filtre pour l'affichage
      const getFilterText = () => {
          const filterTexts = {
              'ALL': 'toutes les actions',
              'RCSA': 'RCSA',
              'KRI': 'KRI'
          };
          return filterTexts[filter] || 'les actions';
      };
  
      return (
          <Box mt={4}>
              {/* En-tête avec filtres */}
              <Flex 
                  justifyContent="space-between" 
                  alignItems="center" 
                  mb={6} 
                  mt={24}
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px"
                  borderColor="gray.100"
              >
                  <Box>
                      <Text fontSize="xl" fontWeight="bold" color="gray.700">
                          Actions
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                          Gestion des actions de contrôle
                      </Text>
                  </Box>
                  
                  <RadioGroup 
                      onChange={handleFilterChange} 
                      value={filter}
                      isDisabled={filterLoading}
                  >
                      <Stack direction="row" spacing={4}>
                          <Radio value="ALL" colorScheme="purple" size="md">
                              <Flex alignItems="center">
                                  Tous
                                  {filter === 'ALL' && filterLoading && (
                                      <Box ml={2} w="12px" h="12px">
                                          <Image 
                                              src={Loader} 
                                              alt="loading..." 
                                              height={12} 
                                              width={12} 
                                          />
                                      </Box>
                                  )}
                              </Flex>
                          </Radio>
                          <Radio value="RCSA" colorScheme="blue" size="md">
                              <Flex alignItems="center">
                                  RCSA
                                  {filter === 'RCSA' && filterLoading && (
                                      <Box ml={2} w="12px" h="12px">
                                          <Image 
                                              src={Loader} 
                                              alt="loading..." 
                                              height={12} 
                                              width={12} 
                                          />
                                      </Box>
                                  )}
                              </Flex>
                          </Radio>
                          <Radio value="KRI" colorScheme="green" size="md">
                              <Flex alignItems="center">
                                  KRI
                                  {filter === 'KRI' && filterLoading && (
                                      <Box ml={2} w="12px" h="12px">
                                          <Image 
                                              src={Loader} 
                                              alt="loading..." 
                                              height={12} 
                                              width={12} 
                                          />
                                      </Box>
                                  )}
                              </Flex>
                          </Radio>
                      </Stack>
                  </RadioGroup>
              </Flex>
  
              {/* États de chargement */}
              {(loading || localLoading) ? (
                  <Flex 
                      alignItems="center" 
                      justifyContent="center" 
                      py={20}
                      flexDirection="column"
                  >
                      <Image 
                          src={Loader} 
                          alt="Chargement..." 
                          height={50} 
                          width={50} 
                          mb={4}
                      />
                      <Text color="gray.500" fontSize="lg">
                          Chargement des actions {getFilterText()}...
                      </Text>
                  </Flex>
              ) : actions.length === 0 ? (
                  <SlideFade in={true} offsetY="20px">
                      <Flex 
                          alignItems="center" 
                          justifyContent="center" 
                          py={20}
                          flexDirection="column"
                          bg="white"
                          borderRadius="lg"
                          boxShadow="sm"
                          border="1px"
                          borderColor="gray.100"
                      >
                          <Box textAlign="center" maxW="md">
                              <Text fontSize="2xl" color="gray.400" mb={2}>
                                  📋
                              </Text>
                              <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={2}>
                                  Aucune action disponible
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                  {filter === "ALL" 
                                      ? "Aucune action n'a été créée pour le moment." 
                                      : `Aucune action disponible pour la catégorie ${filter}.`
                                  }
                              </Text>
                          </Box>
                      </Flex>
                  </SlideFade>
              ) : (
                  <SlideFade in={true} offsetY="20px">
                      <Box>
                          {/* En-tête des résultats */}
                          <Flex 
                              alignItems="center" 
                              justifyContent="space-between" 
                              mb={4}
                              p={3}
                              bg="blue.50"
                              borderRadius="md"
                          >
                              <Text fontSize="sm" color="blue.700" fontWeight="medium">
                                  {actions.length} action{actions.length > 1 ? 's' : ''} {filter === 'ALL' ? 'au total' : `pour ${getFilterText()}`}
                              </Text>
                              {filterLoading && (
                                  <Flex alignItems="center">
                                      <Box w="16px" h="16px" mr={2}>
                                          <Image 
                                              src={Loader} 
                                              alt="loading..." 
                                              height={16} 
                                              width={16} 
                                          />
                                      </Box>
                                      <Text fontSize="xs" color="blue.600">
                                          Mise à jour...
                                      </Text>
                                  </Flex>
                              )}
                          </Flex>
                          
                          {/* Cartes d'actions */}
                          <ActionCard actions={actions} />
                      </Box>
                  </SlideFade>
              )}
          </Box>
      );
  };
  
  const mapStateToProps = ({ ActionReducer }) => ({
      actions: ActionReducer.actions,
      loading: ActionReducer.loading,
  });
  
  export default connect(mapStateToProps)(Actions);