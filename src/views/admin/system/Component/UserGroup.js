import React, { useEffect, useState } from 'react';
import { Button, Flex, Box, Text, Image } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomerSummaryCard from './CustomerSummaryCard';
import AddUserGroupModal from './AddUserGroupModal';
import Loader from '../../../../assets/img/loader.gif';
import RefreshButton from 'components/refreshButton';
import { listUserGroups } from 'redux/userGroup/action';
import { useDispatch } from 'react-redux';

const UserGroup = ({ userGroups, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserGroup, setSelectedUserGroup] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const dispatch = useDispatch();

    const openModal = (userGroup = null) => {
        setSelectedUserGroup(userGroup); // Set selected user group, or null for a new group
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleFormSubmit = (formData) => {
        setIsModalOpen(false);
    };

    const handleCardClick = (userGroup) => {
        openModal(userGroup); // Open the modal with the selected group
    };

    const handleRefresh = () => {
        // Active l'état de chargement
        setIsRefreshing(true);

        // Simule un délai avant l'actualisation (2 secondes)
        setTimeout(() => {
            dispatch(listUserGroups());
            setIsRefreshing(false);
        }, 1000);
    }

    return (
        <>
            <Box mb={4}>
                <Flex justifyContent="space-between" mb={4}>
                    <RefreshButton handleRefresh={handleRefresh} isRefreshing={isRefreshing} />
                    <Button
                        colorScheme='blue' style={{ fontSize: 14 }}
                        leftIcon={<AddIcon />}
                        onClick={() => openModal()}
                        fontSize={12}
                    >
                        Add New User Group
                    </Button>
                </Flex>

                {
                    loading ? (
                        <Flex alignItems='center' justifyContent='center'>
                            <Image src={Loader} alt="Loading..." height={50} width={50} />
                        </Flex>
                    ) : (
                        <>
                            {
                                userGroups.length === 0 ? (
                                    <Flex alignItems='center' justifyContent='center'>
                                        <Text color='gray.500' fontSize='2xl'>No data found</Text>
                                    </Flex>
                                ) : (
                                    <>
                                        {userGroups.map((group) => (
                                            <CustomerSummaryCard
                                                key={group._id}
                                                selectedUserGroup={group}
                                                onCardClick={() => handleCardClick(group)}
                                            />
                                        ))}
                                    </>
                                )
                            }
                        </>
                    )
                }


            </Box>

            {/* Modal pour ajouter/éditer un groupe d'utilisateurs */}
            <AddUserGroupModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleFormSubmit}
                loading={loading}
                selectedUserGroup={selectedUserGroup} // Pass selected group data to the modal
            />
        </>
    );
};

export default UserGroup;