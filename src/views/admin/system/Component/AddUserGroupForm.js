import React, { useState } from 'react';
import { FormControl, FormLabel, Button, Flex, Box, Input } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md'; // Import edit icon
import Select from 'react-select';
import DeleteModal from './DeleteModal'; // Import your DeleteModal component

const AddUserGroupForm = ({ onSubmit, formData, isReadOnly, handleAmendClick, isAmending, handleDeleteClick }) => {
  const [groupName, setGroupName] = useState(formData.groupName || '');
  const [roles, setRoles] = useState(formData.roles || []);

  const roleOptions = [
    {
      label: 'Admin',
      options: [
        { value: 'admin-management', label: 'Management' },
        { value: 'admin-hr', label: 'HR' },
        { value: 'admin-it', label: 'IT' },
      ],
    },
    {
      label: 'User',
      options: [
        { value: 'user-sales', label: 'Sales' },
        { value: 'user-support', label: 'Support' },
        { value: 'user-development', label: 'Development' },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ groupName, roles });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align="center" gap={4}>
        {isReadOnly && !isAmending && (
          <Box>
            <Button
              colorScheme="blue"
              onClick={handleAmendClick}
              leftIcon={<MdEdit />}
              mr={4} // Adds margin-right to the button
            >
              Amend
            </Button>
            <DeleteModal
              selectedUser={{ _id: groupName }}
              onClick={handleDeleteClick}
              disabled={isAmending}
            />
          </Box>
        )}
      </Flex>

      <FormControl id="group-name" isRequired mt={4}>
        <FormLabel>Group Name</FormLabel>
        <Input
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          isReadOnly={isReadOnly}
        />
      </FormControl>

      <FormControl id="role" isRequired mt={4}>
        <FormLabel>Role</FormLabel>
        <Select
          isMulti
          options={roleOptions}
          value={roles}
          onChange={(selectedOptions) => setRoles(selectedOptions)}
          placeholder="Select roles, departments, and sub-departments"
          closeMenuOnSelect={false}
          isDisabled={isReadOnly}
        />
      </FormControl>
    </form>
  );
};

export default AddUserGroupForm;
