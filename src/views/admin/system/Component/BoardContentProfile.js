import React, { useEffect, useState } from 'react';
import {
    FormControl, InputGroup, InputLeftElement, Input, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Button,
    Box, Text, Flex, Image
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import AddProfileModal from './AddProfileModal';
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { connect, useDispatch } from 'react-redux';
import { listProfiles } from 'redux/profile/action';
import Loader from '../../../../assets/img/loader.gif';
import { deleteProfile } from 'redux/profile/action';
import DeleteModal from './deleteModal';

const BoardContentProfile = ({ profiles, loading }) => {
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
                                        <Th>User ID</Th>
                                        <Th>Name</Th>
                                        <Th>Location</Th>
                                        <Th>Status</Th>
                                        <Th>Active</Th>
                                        <Th></Th> {/* Empty column for the trash icon */}
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
                                            <Td>{user?.userId}</Td>
                                            <Td>{user?.name}</Td>
                                            <Td>{user?.location}</Td>
                                            <Td color={user?.activeUser === true ? 'green.500' : 'red.500'}>{user?.activeUser === true ? 'Logged' : 'Pending'}</Td>
                                            <Td>
                                                <Box
                                                    w="12px"
                                                    h="12px"
                                                    borderRadius="full"
                                                    bg={user?.activeUser === true ? 'green.500' : 'red.500'}
                                                />
                                            </Td>
                                            <Td>
                                                <DeleteModal
                                                    selectedUser={user}
                                                    onClick={(e) => e.stopPropagation()} // Stop event propagation
                                                />
                                            </Td>
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
                            />
                        )}
                    </Box>
                ))}
        </>

    );
};

const mapStateToProps = ({ ProfileReducer }) => ({
    profiles: ProfileReducer.profiles,
    loading: ProfileReducer.loading,
});

export default connect(mapStateToProps)(BoardContentProfile);
