import React, { useState } from 'react';
import {
  Box, Flex, Button, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import CustomerSummaryCard from './CustomerSummaryCard';
import AddUserGroupForm from './AddUserGroupForm';
import DeleteModal from './DeleteModal';

const UserGroup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState('');
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAmending, setIsAmending] = useState(false);

  const handleFormSubmit = (data) => {
    setGroupName(data.groupName);
    setRoles(data.roles);
    setIsAmending(false); // Reset amending state after save
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
    onOpen();
  };

  const handleAmendClick = () => {
    setIsAmending(true);
  };

  const handleDeleteClick = () => {
    console.log('Delete action triggered');
    // Implement your delete logic here
  };

  return (
    <>
      <Box mb={4}>
        <Flex justifyContent="flex-end" mb={4}>
          <Button
            variant="outline"
            colorScheme="blue"
            leftIcon={<EditIcon />}
            onClick={() => { setIsEditing(false); setIsAmending(false); onOpen(); }}
          >
            Add New User Group
          </Button>
        </Flex>

        {/* Show Card with Group Info */}
        {groupName && (
          <CustomerSummaryCard
            groupName={groupName}
            roles={roles}
            onEdit={handleEdit}
          />
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={() => { setIsAmending(false); onClose(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit User Group' : 'Add New User Group'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddUserGroupForm
              onSubmit={handleFormSubmit}
              formData={{ groupName, roles }}
              isReadOnly={!isAmending && isEditing}
              handleAmendClick={handleAmendClick}
              isAmending={isAmending}
            />
          </ModalBody>
          <ModalFooter>
              <>
                <Button
                  colorScheme="blue"
                  onClick={() => document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                  mr={4}
                >
                  Save
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Cancel
                </Button>
              </>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserGroup;
