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
    console.log("actions::", actions.actions);
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
             fontSize="12px"
             marginBottom={4}
             key={action._id}
         >
             <Stack spacing={3}>
                 <Heading size="sm">Référence: ACT{action.reference}</Heading>
                 <Text>{action.descriptionAction}</Text>
                 <Divider />
                 <Flex justify="space-between">
                     <Text fontWeight="bold">Délai:</Text>
                     <Text>{action.delaisAction}</Text>
                 </Flex>
                 <Flex justify="space-between">
                     <Text fontWeight="bold">Propriétaire:</Text>
                     <Text>{action.proprioAction}</Text>
                 </Flex>
                 <Flex justify="space-between" wrap="wrap">
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