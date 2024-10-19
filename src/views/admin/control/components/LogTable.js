import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  VStack,
  Textarea,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const LogTable = () => {
  const [data, setData] = useState([
    { dateTime: '2024-09-26 12:00', user: 'John Doe', type: 'Info', comment: '' },
    { dateTime: '2024-09-26 12:30', user: 'Jane Smith', type: 'Error', comment: '' },
  ]); // Sample initial data
  const [comment, setComment] = useState(''); // Manage selected comment
  const [selectedLog, setSelectedLog] = useState(null); // Track selected log
  const [isEditing, setIsEditing] = useState(false); // Track editing state

  const handleAddComment = () => {
    const newLog = {
      dateTime: new Date().toLocaleString(),
      user: 'New User',
      type: 'Info',
      comment,
    };
    setData((prevData) => [...prevData, newLog]);
    setComment('');
  };

  const handleAmendComment = () => {
    if (selectedLog) {
      const newLog = {
        ...selectedLog,
        comment,
      };
      setData((prevData) => prevData.map(log => log === selectedLog ? newLog : log));
      setComment('');
      setSelectedLog(null);
      setIsEditing(false);
    }
  };

  const handleRowClick = (log) => {
    setSelectedLog(log);
    setComment(log.comment || ''); // Populate comment field with existing comment
    setIsEditing(true); // Set editing mode
  };

  const handleCancel = () => {
    setComment('');
    setSelectedLog(null);
    setIsEditing(false);
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th fontSize="12px">Date/Time</Th>
                  <Th fontSize="12px">User</Th>
                  <Th fontSize="12px">Type</Th>
                  <Th fontSize="12px">Comment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.length === 0 ? (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      <Text fontSize="12px">No data to display</Text>
                    </Td>
                  </Tr>
                ) : (
                  data.map((log, index) => (
                    <Tr 
                      key={index} 
                      onClick={() => handleRowClick(log)} 
                      bg={selectedLog === log ? 'blue.100' : undefined} // Highlight selected row
                    >
                      <Td fontSize="12px">{log.dateTime}</Td>
                      <Td fontSize="12px">{log.user}</Td>
                      <Td fontSize="12px">{log.type}</Td>
                      <Td fontSize="12px">{log.comment}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold" fontSize="12px">Comment</Text>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
              size="sm"
              h={100}
              overflowY="auto"
              bg="gray.100"
              p={2}
              fontSize="12px"
            />
          </Box>
        </SimpleGrid>

        <HStack spacing={4} justify="center">
          <Button variant="outline"
            colorScheme="blue" 
            onClick={handleAddComment} 
            leftIcon={<AddIcon />} 
            isDisabled={!comment}
            fontSize="12px"
          >
            Add Comment
          </Button>
          <Button variant="outline"
            colorScheme="yellow" 
            onClick={handleAmendComment} 
            leftIcon={<EditIcon />} 
            isDisabled={!isEditing || !comment}
            fontSize="12px"
          >
            Amend Comment
          </Button>
          <Button variant="outline"
            colorScheme="green" 
            onClick={handleAmendComment} 
            leftIcon={<CheckIcon />} 
            isDisabled={!isEditing || !comment}
            fontSize="12px"
          >
            Save
          </Button>
          <Button variant="outline"
            colorScheme="red" 
            onClick={handleCancel} 
            leftIcon={<CloseIcon />}
            fontSize="12px"
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LogTable;
