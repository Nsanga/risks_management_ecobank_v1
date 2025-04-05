import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
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
          // Calculer le total des pertes
          const totalLoss = event?.financials.find((f) => f.name === "Total")?.values.reduce((acc, val) => acc + val, 0);

          return (
            <Flex
              direction="column"
              p={5}
              shadow="md"
              borderRadius={15}
              borderWidth="1px"
              mt={4}
              key={event.num_ref} // Utilisez une clé unique
              cursor='pointer'
              onClick={() => handleViewEvent(event)}
            >
              <Flex direction="row" justifyContent="space-between">
                <Flex direction="row" alignItems="center">
                  <Text fontWeight="bold" mr={10} color='blue' fontSize={12}>
                    EVT{event.num_ref}
                  </Text>
                  <Text fontWeight="bold" mr={10} fontSize={12}>
                    {truncateText(event?.details.description, 90)}
                    {totalLoss > 0 && (
                      <span> (Total Loss: {totalLoss} {event?.details.rate})</span>
                    )}
                  </Text>
                </Flex>
                <Badge variant='solid' colorScheme={event?.approved ? 'blue' : 'red'}>
                  {event?.approved ? "Approved" : "Unapproved"}
                </Badge>
              </Flex>
            </Flex>
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