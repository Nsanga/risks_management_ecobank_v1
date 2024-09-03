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
import { deleteEvent } from 'redux/events/action'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const DeleteModal = ({ event, disabled }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [reason, setReason] = useState('')
    const dispatch = useDispatch()
    const history = useHistory();

    const handleDelete = () => {
        dispatch(deleteEvent(event._id));
        onClose();
        history.push(
            '/admin/risks',
        );
    }

    return (
        <>
            <Button
                leftIcon={<DeleteIcon color="white" />}
                colorScheme='red' onClick={onOpen} variant='solid'
                style={{ fontSize: 14 }}
                disabled={disabled}
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
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={handleDelete}
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