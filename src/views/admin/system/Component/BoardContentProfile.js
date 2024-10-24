import React, { useEffect, useState } from 'react';
import {
    FormControl, InputGroup, InputLeftElement, Input, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Button,
    Box, Text, Flex, Image
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, LockIcon } from '@chakra-ui/icons';
import AddProfileModal from './AddProfileModal';
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { connect, useDispatch } from 'react-redux';
import { listProfiles } from 'redux/profile/action';
import Loader from '../../../../assets/img/loader.gif';
import { deleteProfile } from 'redux/profile/action';
import DeleteModal from './DeleteModal';

const BoardContentProfile = ({ profiles, loading, userGroups }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const closeModal = () => setIsModalOpen(false);
    const closeModalDelete = () => setIsModalDeleteOpen(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProfiles());
    }, [dispatch]);

    console.log('list des users', profiles)


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter users based on the search term
    const filteredUsers = profiles.filter(user =>
        user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {loading ? (
                <Flex alignItems='center' justifyContent='center'>
                    <Image src={Loader} alt="Loading..." height={50} width={50} />
                </Flex>
            ) : (
                filteredUsers.length === 0 ? (
                    <Flex alignItems='center' justifyContent='center'>
                        <Text color='gray.500' fontSize='2xl'>No data found</Text>
                    </Flex>
                ) : (
                    <Box flex="1">
                        {/* Search Bar with Icon */}
                        <FormControl mb="4">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon color="blue.500" />}
                                />
                                <Input
                                    fontSize={12}
                                    placeholder="Search by name, location, userId or status"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </InputGroup>
                        </FormControl>

                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th fontSize={12}>User ID</Th>
                                        <Th fontSize={12}>Name</Th>
                                        <Th fontSize={12}>Location</Th>
                                        <Th fontSize={12}>Status</Th>
                                        <Th fontSize={12}>Active</Th>
                                        <Th></Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {filteredUsers.map(user => (
                                        <Tr
                                            key={user?.id}
                                            onClick={() => {
                                                setSelectedUser(user); // Set the selected user if needed
                                                setIsModalOpen(true);
                                            }}
                                            _hover={{ backgroundColor: "gray.100" }}
                                            cursor="pointer"
                                        >
                                            <Td fontSize={12}>{user?.userId}</Td>
                                            <Td fontSize={12}>{user?.name}</Td>
                                            <Td fontSize={12}>{user?.location}</Td>
                                            <Td  fontSize={12} color={user?.activeUser === true ? 'green.500' : 'red.500'}>{user?.activeUser === true ? 'Logged' : user?.lockedUser === true ? 'Blocked' : 'Pending'}</Td>
                                            <Td fontSize={12}>
                                                <Box
                                                    w="12px"
                                                    h="12px"
                                                    borderRadius="full"
                                                    bg={user?.activeUser === true ? 'green.500' : 'red.500'}
                                                />
                                            </Td>
                                            {user?.lockedUser === true ?
                                                (
                                                    <Td fontSize={12}>
                                                        <LockIcon color='red' />
                                                    </Td>
                                                ) : null
                                            }

                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>

                        {selectedUser && (
                            <AddProfileModal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                selectedUser={selectedUser}
                                userGroups={userGroups}
                            />
                        )}
                    </Box>
                ))}
        </>

    );
};

export default BoardContentProfile;
