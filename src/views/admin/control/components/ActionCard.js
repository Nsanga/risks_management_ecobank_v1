import React from 'react';
import {
    Box,
    Text,
    Stack,
    Heading,
    Badge,
    Flex,
    Divider,
} from '@chakra-ui/react';

const ActionCard = ({
    actions
}) => {
    return (
        <>
        {actions.map((action) => (
             <Box
             borderWidth="1px"
             borderRadius="lg"
             overflow="hidden"
             p={4}
             boxShadow="md"
             bg="white"
             key={action._id}
         >
             <Stack spacing={3}>
                 <Heading size="md">Référence: {action.reference}</Heading>
                 <Text fontSize="lg">{action.descriptionAction}</Text>
                 <Divider />
                 <Flex justify="space-between">
                     <Text fontWeight="bold">Délai:</Text>
                     <Text>{action.delaisAction}</Text>
                 </Flex>
                 <Flex justify="space-between">
                     <Text fontWeight="bold">Propriétaire:</Text>
                     <Text>{action.proprioAction}</Text>
                 </Flex>
                 <Flex justify="space-between">
                     <Text fontWeight="bold">Évolution:</Text>
                     <Badge colorScheme="green">{action.evolutionAction}</Badge>
                 </Flex>
             </Stack>
         </Box>
        ))}
        </>
    );
};

export default ActionCard;