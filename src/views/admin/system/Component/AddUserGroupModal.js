import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Flex, Box, VStack, Input } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import DeleteModal from './deleteModal';
const AddUserGroupModal = ({ isOpen, onClose, selectedUserGroup }) => {
    const [isEditMode, setIsEditMode] = useState(!selectedUserGroup); // Default to true if no group is selected
    const [groupName, setGroupName] = useState('');
    const [roles, setRoles] = useState([]);

    const roleOptions = [
        // Your role options here
    ];

    const handleAmendClick = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {
        // Handle save logic
    };

    const handleEdit = () => {
        // Handle edit logic
    };

    const handleClose = () => {
        onClose();
        setIsEditMode(!selectedUserGroup); // Reset edit mode based on whether a group is selected
    };

    useEffect(() => {
        if (selectedUserGroup) {
            setGroupName(selectedUserGroup?.name || '');
            setRoles(selectedUserGroup?.roles || []);
            setIsEditMode(false); // Set to read-only mode if a group is selected
        } else {
            setGroupName('');
            setRoles([]);
            setIsEditMode(true); // Allow editing if no group is selected
        }
    }, [selectedUserGroup]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedUserGroup?._id ? "Amend User Group" : "Add User Group"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex mb={4} align="center" gap={4}>
                        <DeleteModal 
                            selectedUserGroup={selectedUserGroup} 
                            disabled={!selectedUserGroup || isEditMode} 
                        />
                        <Button 
                            leftIcon={<EditIcon color="white" />} 
                            colorScheme='blue' 
                            style={{ fontSize: 14 }} 
                            onClick={handleAmendClick} 
                            disabled={!selectedUserGroup || isEditMode}
                        >
                            Amend
                        </Button>
                    </Flex>
                    <VStack spacing={4} align="stretch">
                        <FormControl id="group-name" isRequired>
                            <FormLabel>Group Name</FormLabel>
                            <Input
                                name="group_name"
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                isReadOnly={!isEditMode}
                            />
                        </FormControl>

                        <FormControl id="role" isRequired>
                            <FormLabel>Role</FormLabel>
                            <Select
                                isMulti
                                options={roleOptions}
                                value={roles}
                                onChange={(selectedOptions) => setRoles(selectedOptions)}
                                placeholder="Select roles for user group"
                                closeMenuOnSelect={false}
                                isReadOnly={!isEditMode}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    {!selectedUserGroup?._id && (
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                    )}
                    {selectedUserGroup?._id && isEditMode && (
                        <Button colorScheme="blue" mr={3} onClick={handleEdit}>
                            Save
                        </Button>
                    )}
                    <Button colorScheme="red" mr={3} onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


export default AddUserGroupModal;
