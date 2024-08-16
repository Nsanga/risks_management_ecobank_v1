import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

const AddUserGroupForm = ({ onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a formData object to be passed to the parent onSubmit function
    const formData = { groupName, description };
    onSubmit(formData); // Pass the data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl id="group-name" isRequired>
          <FormLabel>Group Name</FormLabel>
          <Input
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormControl>

        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        {/* Bouton "Save" avec la variante outline */}
        <Button variant="outline" colorScheme="blue" type="submit" width="full">
          Save
        </Button>
      </VStack>
    </form>
  );
};

export default AddUserGroupForm;
