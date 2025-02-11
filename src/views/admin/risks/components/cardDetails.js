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
  return (
    <>
      {
        loading ? (
          <Flex alignItems='center' justifyContent='center'>
            <Image src={Loader} alt="Loading..." height={50} width={50} />
          </Flex>
        ) : (
          events.length === 0 ? (
            <Flex alignItems='center' justifyContent='center'>
              <Text color='gray.500' fontSize='2xl'>No events found</Text>
            </Flex>
          ) : (
            events.map((event, index) => (
              <Flex direction="column" p={5} shadow="md" borderRadius={15} borderWidth="1px" mt={4} key={index} cursor='pointer' onClick={() => handleViewEvent(event)}>
                <Flex direction="row" justifyContent="space-between">
                  <Flex direction="row" alignItems="center">
                    <Text fontWeight="bold" mr={10} style={{ color: 'blue' }} fontSize={12}>EVT{event.num_ref}</Text>
                    <Text fontWeight="bold" mr={10} fontSize={12}>{truncateText(event?.details.description, 90)}</Text>
                  </Flex>
                  <Badge variant='solid' colorScheme={event?.approved === true ? 'blue' : 'red'}>
                    {event?.approved === true ? "Approved" : "Unapproved"}
                  </Badge>
                </Flex>
              </Flex>
            ))
          )
        )
      }
    </>
  );
};

export default CardDetails;