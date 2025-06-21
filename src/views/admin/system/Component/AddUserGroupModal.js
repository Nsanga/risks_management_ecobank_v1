import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Flex, Box, VStack, Input } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { AddUserGroup } from 'redux/userGroup/action';
import { updateUserGroup } from 'redux/userGroup/action';
import DeleteModal from 'views/admin/event/components/DeleteModal';

const AddUserGroupModal = ({ isOpen, onClose, selectedUserGroup, loading }) => {
    const [isEditMode, setIsEditMode] = useState(!selectedUserGroup);
    const [groupName, setGroupName] = useState('');
    const [roles, setRoles] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();

    const roleOptions = [
        { value: 'admin-management', label: 'Management' },
        { value: 'admin-hr', label: 'HR' },
        { value: 'admin-it', label: 'IT' },
        { value: 'user-sales', label: 'Sales' },
        { value: 'user-support', label: 'Support' },
        { value: 'user-development', label: 'Development' },
    ];

    const handleAmendClick = () => {
        setIsEditMode(true);
    };

    const handleSave = async () => {
        const roleValues = roles.map(role => role.value);

        const formData = {
            groupName,
            roles: roleValues // Envoyer uniquement le tableau des valeurs des rôles
        };

        try {
            await dispatch(AddUserGroup(formData)); // Assume AddUserGroup returns a promise
            onClose(); // Close the modal after saving
        } catch (error) {
            console.error("Error saving user group:", error);
        } finally {
        }
    };

    const handleEdit = async () => {
        // Extraire seulement les valeurs des rôles sélectionnés
        const roleValues = roles.map(role => role.value);

        const formData = {
            groupName,
            roles: roleValues // Envoyer uniquement le tableau des valeurs des rôles
        };


        try {
            await dispatch(updateUserGroup(selectedUserGroup._id, formData)); // Supposons que updateUserGroup retourne une promesse
            onClose(); // Fermer la modal après l'enregistrement
        } catch (error) {
            console.error("Error updating user group:", error);
        } finally {
        }
    };

    const handleClose = () => {
        onClose();
        setIsEditMode(!selectedUserGroup);
    };

    useEffect(() => {
        if (isOpen) {  // Ajout de la vérification pour réinitialiser l'état lors de l'ouverture de la modal
            if (selectedUserGroup) {
                setGroupName(selectedUserGroup.groupName || '');

                const formattedRoles = selectedUserGroup.roles.map(role => ({
                    label: role,
                    value: role
                })) || [];

                setRoles(formattedRoles);
                setIsEditMode(false);
            } else {
                setGroupName('');
                setRoles([]);
                setIsEditMode(true);
            }
        }
    }, [selectedUserGroup, isOpen]);

    const handleOpenDeleteModal = () => {
        handleClose(); // Fermer la modal principale
        setTimeout(() => setDeleteModalOpen(true), 300); // Ouvrir la modal de suppression après un délai
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedUserGroup?._id ? "Amend User Group" : "Add User Group"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedUserGroup && (
                            <Flex mb={4} align="center" gap={4}>
                                <DeleteModal
                                    selectedUserGroup={selectedUserGroup}
                                    disabled={!selectedUserGroup || isEditMode}
                                    onClick={handleOpenDeleteModal}
                                    onCloseAddUserGroupModal={onClose}
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
                        )}
                        <VStack spacing={4} align="stretch">
                            <FormControl id="group-name" isRequired>
                                <FormLabel fontSize={12}>Group Name</FormLabel>
                                <Input
                                    fontSize={12}
                                    name="group_name"
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    isReadOnly={!isEditMode}
                                />
                            </FormControl>

                            <FormControl id="role">
                                <FormLabel fontSize={12}>Role</FormLabel>
                                <Select
                                    fontSize={12}
                                    isMulti
                                    options={roleOptions}
                                    value={roles}
                                    onChange={(selectedOptions) => setRoles(selectedOptions)}
                                    placeholder="Select roles for user group"
                                    closeMenuOnSelect={false}
                                    isDisabled={!isEditMode}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        {!selectedUserGroup?._id && (
                            <Button colorScheme="blue" isLoading={loading} onClick={handleSave}>
                                Save
                            </Button>
                        )}
                        {selectedUserGroup?._id && isEditMode && (
                            <Button colorScheme="blue" isLoading={loading} onClick={handleEdit}>
                                Save
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const mapStateToProps = ({ UserGroupReducer }) => ({
    userGroups: UserGroupReducer.userGroups,
    loading: UserGroupReducer.loading,
});

export default connect(mapStateToProps)(AddUserGroupModal);