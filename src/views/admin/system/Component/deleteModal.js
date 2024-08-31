import React, { useState } from 'react'
import {
    Button,
    IconButton,
    Textarea,
    useDisclosure,
    Text
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { deleteProfile } from 'redux/profile/action'
import { deleteEntity } from 'redux/entitiy/action'
import { deleteUserGroup } from 'redux/userGroup/action'

const DeleteModal = ({ selectedUser, selectedEntity, selectedUserGroup, disabled, onCloseAddUserGroupModal, onCloseAddEntityModal, onCloseAddProfileModal }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [reason, setReason] = useState('')
    const dispatch = useDispatch()

    const handleDelete = () => {
                dispatch(deleteProfile(selectedUser._id));
        onClose();
        if (onCloseAddProfileModal) {
            onCloseAddProfileModal(); // Fermer la modal AddUserGroupModal
        }
    };

    const handleDeleteEntity = () => {
                dispatch(deleteEntity(selectedEntity?._id));
        onClose();
        if (onCloseAddEntityModal) {
            onCloseAddEntityModal(); // Fermer la modal AddUserGroupModal
        }
    };

    const handleDeleteUserGroup = () => {
                dispatch(deleteUserGroup(selectedUserGroup?._id));
        onClose();
        if (onCloseAddUserGroupModal) {
            onCloseAddUserGroupModal(); // Fermer la modal AddUserGroupModal
        }
    };

    return (
        <>
            <Button
                leftIcon={<DeleteIcon color="white" />}
                colorScheme='red' onClick={onOpen} variant='solid'
                style={{ fontSize: 14 }}
                disabled={disabled}
                fontSize={14}
            >
                Delete
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={14}>
                        Delete {selectedEntity?._id ? 'Entity' : (selectedUserGroup?._id ? 'user group' : 'Profile')}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2} fontSize={14}>
                            {selectedEntity?._id ?
                                "Why do you want to delete this entity?" :
                                (selectedUserGroup?._id ? "Why do you want to delete this user group?" :
                                    "Why do you want to delete this user?")
                            }
                        </Text>
                        <Textarea
                            placeholder="Please provide a reason for deletion..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            fontSize={14}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={selectedEntity?._id ? handleDeleteEntity : (selectedUserGroup?._id ? handleDeleteUserGroup : handleDelete)}
                            isDisabled={!reason.trim()} 
                            fontSize={14}
                        >
                            Delete
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose} fontSize={14}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal