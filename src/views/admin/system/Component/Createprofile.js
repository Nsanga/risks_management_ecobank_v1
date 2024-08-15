import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddProfileModal from './AddProfileModal';
import BoardContentProfile from './BoardContentProfile';

const CreateProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Flex justifyContent="flex-end" mb={4}>
                <Button variant="outline" color='blue' leftIcon={<AddIcon />} onClick={openModal}>
                    Add New Profile
                </Button>
            </Flex>
            {/* Render the modal and pass isOpen and onClose props */}
            <AddProfileModal isOpen={isModalOpen} onClose={closeModal} />
            <BoardContentProfile />
        </>
    );
};

export default CreateProfile;
