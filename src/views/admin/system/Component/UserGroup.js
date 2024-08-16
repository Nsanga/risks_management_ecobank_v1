import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Flex, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddUserGroupForm from './AddUserGroupForm';
import CustomerSummaryCard from './CustomerSummaryCard';

const UserGroup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleFormSubmit = (formData) => {
        console.log("Form Data Submitted: ", formData);
        onClose();
    };

    return (
        <>
            {/* Conteneur pour le bouton et la carte */}
            <Box mb={4}>
                {/* Aligner le bouton à droite */}
                <Flex justifyContent="flex-end" mb={4}>
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onOpen}
                    >
                        Add New User Group
                    </Button>
                </Flex>

                {/* Placer la carte en dessous du bouton */}
                <CustomerSummaryCard />
            </Box>

            {/* Modal pour ajouter un nouveau groupe d'utilisateurs */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New User Group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddUserGroupForm onSubmit={handleFormSubmit} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserGroup;
