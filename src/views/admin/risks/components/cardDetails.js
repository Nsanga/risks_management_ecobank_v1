import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Loader from '../../../../assets/img/loader.gif'

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  return text.substring(0, maxLength) + '...';
};

const CardDetails = ({ events, loading }) => {
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
              <Flex direction="column" p={5} shadow="md" borderRadius={15} borderWidth="1px" mt={4} key={index}>
                <Flex direction="row" justifyContent="space-between">
                  <Flex direction="row" alignItems="center">
                    <Text fontWeight="bold" mr={10} style={{ color: 'blue' }} fontSize={14}>EVT{event.num_ref}</Text>
                    <Text fontWeight="bold" mr={10} fontSize={14}>{truncateText(event?.details.description, 90)}</Text>
                  </Flex>
                  <Box p={1} shadow='md' borderWidth='1px' borderColor={event?.approved === true ? 'blue' : 'red'}>
                    <Text style={{ color: event?.approved === true ? 'blue' : 'red' }} fontSize={14}>{event?.approved === true ? "Approved" : "Unapproved"} </Text>
                  </Box>
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