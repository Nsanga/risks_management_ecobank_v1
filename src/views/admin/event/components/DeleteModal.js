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
import { deleteEvent, listEvents } from 'redux/events/action'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const DeleteModal = ({ selectedEntity, isDeleteDisabled }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [reason, setReason] = useState('')
    const dispatch = useDispatch()
    const history = useHistory();

    const handleDelete = async () => {
        await dispatch(deleteEvent(selectedEntity._id));
        onClose();
        setReason("")
        history.push(
            '/admin/events',
        );
        dispatch(listEvents());
    }

    const handleClose = () => {
        onClose();
        setReason("")
    }

    return (
        <>
            <Button
                leftIcon={<DeleteIcon color="white" />}
                colorScheme='red' onClick={onOpen} variant='solid'
                style={{ fontSize: 14 }}
                disabled={isDeleteDisabled}
            >
                Delete
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Delete Event
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>
                            Why do you want to delete this event?
                        </Text>
                        <Textarea
                            placeholder="Please provide a reason for deletion..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={handleDelete}
                            isDisabled={!reason.trim()} // Disable button if reason is empty or whitespace
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal