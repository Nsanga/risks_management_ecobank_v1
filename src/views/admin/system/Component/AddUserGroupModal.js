import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Flex, Box, VStack, Input } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import DeleteModal from './deleteModal';

const AddUserGroupModal = ({ isOpen, onClose, selectedUserGroup }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [roles, setRoles] = useState([]);

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

    const handleAmendClick = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {

    };

    const handleEdit = () => {

    };

    const handleClose = () => {
        onClose();
        setIsEditMode(false); 
    }

    useEffect(() => {
        if (selectedUserGroup) {
            setGroupName(selectedUserGroup?.name || '');
            setRoles(selectedUserGroup?.roles || []);
        } else {
            setGroupName('');
            setRoles([]);
            setIsEditMode(true)
        }
    }, [selectedUserGroup]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedUserGroup?._id ? "Amend User Group" : "Add User Group"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex mb={4} align="center" gap={4}>
                        <DeleteModal selectedUserGroup={selectedUserGroup} disabled={isEditMode}
                        />
                        <Button leftIcon={<EditIcon color="white" />} colorScheme='blue' style={{ fontSize: 14 }} onClick={handleAmendClick} disabled={isEditMode}>
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
                                closeMenuOnSelect={false} // Keeps the dropdown open for multiple selections
                                isReadOnly={!isEditMode}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    {
                        !selectedUserGroup?._id ?
                            (
                                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                                    Save
                                </Button>
                            ) : null
                    }
                    {
                        selectedUserGroup?._id && isEditMode ? (
                            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
                                Save
                            </Button>
                        ) : null
                    }
                    <Button colorScheme="red" mr={3} onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddUserGroupModal;
