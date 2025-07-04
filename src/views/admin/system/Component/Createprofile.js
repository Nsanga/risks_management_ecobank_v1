import React, { useEffect, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddProfileModal from './AddProfileModal';
import BoardContentProfile from './BoardContentProfile';
import { IoRefresh } from 'react-icons/io5';
import { connect, useDispatch } from 'react-redux';
import { listProfiles } from 'redux/profile/action';

const CreateProfile = ({ userGroups, profiles, entities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProfiles());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(listProfiles());
    }

    return (
        <>
            <Flex justifyContent='space-between' mb={4}>
                <Button variant="solid" color='green' leftIcon={<IoRefresh />} onClick={handleRefresh} fontSize={12}>
                    Refresh List
                </Button>
                <Button colorScheme='blue' style={{ fontSize: 14 }} leftIcon={<AddIcon />} onClick={openModal} fontSize={12}>
                    Add New user
                </Button>
            </Flex>
            {/* Render the modal and pass isOpen and onClose props */}
            <AddProfileModal isOpen={isModalOpen} onClose={closeModal} userGroups={userGroups} profiles={profiles} entities={entities} />
            <BoardContentProfile userGroups={userGroups} profiles={profiles} />
        </>
    );
};

const mapStateToProps = ({ProfileReducer }) => ({
    profiles: ProfileReducer.profiles,
    loading: ProfileReducer.loading,
  });
  
  export default connect(mapStateToProps)(CreateProfile);
