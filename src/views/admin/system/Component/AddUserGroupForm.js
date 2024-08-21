import React, { useState } from 'react';
import { FormControl, FormLabel, Button, VStack } from '@chakra-ui/react';
import Select from 'react-select';

const AddUserGroupForm = ({ onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [roles, setRoles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { groupName, roles };
    onSubmit(formData);
  };

  // Example options for roles, departments, and sub-departments
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

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl id="group-name" isRequired>
          <FormLabel>Group Name</FormLabel>
          <Select
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormControl>

        <FormControl id="role" isRequired>
          <FormLabel>Role</FormLabel>
          <Select
            isMulti
            options={roleOptions}
            value={roles}
            onChange={(selectedOptions) => setRoles(selectedOptions)}
            placeholder="Select roles, departments, and sub-departments"
            closeMenuOnSelect={false} // Keeps the dropdown open for multiple selections
          />
        </FormControl>
      </VStack>
    </form>
  );
};

export default AddUserGroupForm;
