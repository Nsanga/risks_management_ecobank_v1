import { Badge, Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from "react-router-dom";
import Loader from '../../../../assets/img/loader.gif'

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  return text.substring(0, maxLength) + '...';
};

const CardDetails = ({ events, loading }) => {
  const history = useHistory();
  const handleViewEvent = (event) => {
    history.push({
      pathname: '/admin/event',
      state: { event, loading }
    });
  }
  const hasEvents = events.length > 0;
  return (
    <>
      {loading ? (
        <Flex alignItems='center' justifyContent='center'>
          <Image src={Loader} alt="Loading..." height={50} width={50} />
        </Flex>
      ) : hasEvents ? (
        events.map((event) => {
          const totalLoss = event?.financials.totalConverted;
          
          return (
            <Box
              p={2}
              shadow="md"
              borderRadius="md"
              borderWidth="1px"
              mt={4}
              key={event.num_ref}
              cursor="pointer"
              onClick={() => handleViewEvent(event)}
            >
              <Grid 
                templateColumns="100px 1fr 120px 120px 120px"
                gap={4}
                alignItems="center"
              >
                {/* Colonne Référence */}
                <Text fontWeight="bold" color="blue.500" fontSize="sm">
                  EVT{event.num_ref}
                </Text>
                
                {/* Colonne Description */}
                <Text fontSize="sm" noOfLines={1}>
                  {event?.details.description}
                </Text>
                
                {/* Colonne Montant */}
                <Text fontWeight="bold" fontSize="sm" textAlign="left">
                  {totalLoss > 0 ? `${totalLoss.toFixed(2)}` : '-'}
                </Text>
                
                {/* Colonne Taux */}
                <Text fontSize="sm" textAlign="left">
                  {event?.financials.currency || '-'}
                </Text>
                
                {/* Colonne Statut */}
                <Badge 
                  variant="solid" 
                  colorScheme={event?.approved ? 'green' : 'red'}
                  justifySelf="flex-end"
                  fontSize="sm"
                >
                  {event?.approved ? "Approuvé" : "Non approuvé"}
                </Badge>
              </Grid>
            </Box>
          );
        })
      ) : (
        <Flex alignItems='center' justifyContent='center'>
          <Text fontSize='12px'>No events found</Text>
        </Flex>
      )}
    </>
  );
};

export default CardDetails;