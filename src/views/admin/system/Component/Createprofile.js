import React, { useEffect, useState } from 'react';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddProfileModal from './AddProfileModal';
import BoardContentProfile from './BoardContentProfile';
import { IoRefresh } from 'react-icons/io5';
import { connect, useDispatch } from 'react-redux';
import { listProfiles } from 'redux/profile/action';
import RefreshButton from 'components/refreshButton';

const CreateProfile = ({ userGroups, profiles, entities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProfiles());
    }, [dispatch]);

    const handleRefresh = () => {
        // Active l'état de chargement
        setIsRefreshing(true);

        // Simule un délai avant l'actualisation (2 secondes)
        setTimeout(() => {
            dispatch(listProfiles());
            setIsRefreshing(false);
        }, 1000);
    }

    return (
        <>
            <Flex justifyContent='space-between' mb={4}>
                <RefreshButton handleRefresh={handleRefresh} isRefreshing={isRefreshing} />
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

const mapStateToProps = ({ ProfileReducer }) => ({
    profiles: ProfileReducer.profiles,
    loading: ProfileReducer.loading,
});

export default connect(mapStateToProps)(CreateProfile);
