import { Button, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
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

    const dispatch = useDispatch()

    const handleDelete = () => {
        console.log(selectedUser);
        dispatch(deleteProfile(selectedUser._id));
    };

    const handleDeleteEntity = () => {
        console.log(selectedEntity);
        dispatch(deleteEntity(selectedEntity?._id));
    };

    return (
        <>
            <IconButton
                aria-label="Delete user"
                icon={<DeleteIcon color="red" />}
                size="sm"
                colorScheme="none"
                onClick={(e) => {
                onOpen();   
                }}
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            {selectedEntity?._id ?
                                "Voulez-vous supprimer cette entité?" :
                                "Voulez-vous supprimer ce profil utilisateur?"
                            }
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' colorScheme='red' onClick={selectedEntity?._id ? handleDeleteEntity : handleDelete}>Delete</Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal
