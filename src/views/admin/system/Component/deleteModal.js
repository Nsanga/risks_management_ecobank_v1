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

const DeleteModal = ({ selectedUser, selectedEntity, onClick }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [reason, setReason] = useState('')
    const dispatch = useDispatch()

    const handleDelete = () => {
        console.log(`Deleting user: ${selectedUser._id}, Reason: ${reason}`);
        dispatch(deleteProfile(selectedUser._id));
    };

    const handleDeleteEntity = () => {
        console.log(`Deleting entity: ${selectedEntity?._id}, Reason: ${reason}`);
        dispatch(deleteEntity(selectedEntity?._id));
    };

    return (
        <>
            <IconButton
                aria-label="Delete user"
                icon={<DeleteIcon color="red" />}
                size="sm"
                colorScheme="none"
                onClick={onOpen} // Open the delete modal
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete {selectedEntity?._id ? 'Entity' : 'Profile'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>
                            {selectedEntity?._id ?
                                "Voulez-vous supprimer cette entité?" :
                                "Voulez-vous supprimer ce profil utilisateur?"
                            }
                        </Text>
                        <Textarea
                            placeholder="Please provide a reason for deletion..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={selectedEntity?._id ? handleDeleteEntity : handleDelete}
                            isDisabled={!reason.trim()} // Disable button if reason is empty or whitespace
                        >
                            Delete
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal
