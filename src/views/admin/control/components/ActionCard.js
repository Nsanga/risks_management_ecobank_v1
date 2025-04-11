import React from 'react';
import { Box, Text, Grid, Badge } from '@chakra-ui/react';

const ActionCard = ({ actions }) => {
    return (
        <>
            {actions.map((action) => (
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={3}
                    boxShadow="sm"
                    bg="white"
                    mb={3}
                    key={action._id}
                >
                    <Grid
                        templateColumns="100px minmax(250px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr)"
                        gap={3}
                        alignItems="center"
                    >
                        {/* Référence */}
                        <Box>
                            <Text fontSize="xs" color="gray.500" mb={1}>
                                Référence
                            </Text>
                            <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                                ACT{action.reference}
                            </Text>
                        </Box>

                        {/* Description */}
                        <Box>
                            <Text fontSize="xs" color="gray.500" mb={1}>
                                Description
                            </Text>
                            <Text fontSize="sm" noOfLines={1} title={action.descriptionAction}>
                                {action.descriptionAction}
                            </Text>
                        </Box>

                        {/* Délai */}
                        <Box>
                            <Text fontSize="xs" color="gray.500" mb={1}>
                                Délai
                            </Text>
                            <Text fontSize="sm" noOfLines={1}>
                                {action.delaisAction}
                            </Text>
                        </Box>

                        {/* Propriétaire */}
                        <Box>
                            <Text fontSize="xs" color="gray.500" mb={1}>
                                Propriétaire
                            </Text>
                            <Text fontSize="sm" noOfLines={1}>
                                {action.proprioAction}
                            </Text>
                        </Box>

                        {/* Évolution */}
                        <Box>
                            <Text fontSize="xs" color="gray.500" mb={1}>
                                Évolution
                            </Text>
                            <Badge
                                colorScheme={
                                    action.evolutionAction === 'Terminé' ? 'green' :
                                        action.evolutionAction === 'En cours' ? 'blue' : 'orange'
                                }
                                fontSize="xs"
                                noOfLines={1}
                                maxW="100px"
                                display="inline-block"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                            >
                                {action.evolutionAction}
                            </Badge>
                        </Box>
                    </Grid>
                </Box>
            ))}
        </>
    );
};

export default ActionCard;