import React, { useEffect, useState } from 'react';
import { Button, Flex, Box, Text, Image } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomerSummaryCard from './CustomerSummaryCard';
import AddUserGroupModal from './AddUserGroupModal';
import Loader from '../../../../assets/img/loader.gif';

const UserGroup = ({ userGroups, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserGroup, setSelectedUserGroup] = useState(null);

    const openModal = (userGroup = null) => {
        setSelectedUserGroup(userGroup); // Set selected user group, or null for a new group
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleFormSubmit = (formData) => {
        console.log("Form Data Submitted: ", formData);
        setIsModalOpen(false);
    };

    const handleCardClick = (userGroup) => {
        openModal(userGroup); // Open the modal with the selected group
    };

    return (
        <>
            <Box mb={4}>
                <Flex justifyContent="flex-end" mb={4}>
                    <Button
                        variant="outline" color='blue'
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
