import React from 'react';
import { FormControl, FormLabel, Input, SimpleGrid, Heading, Box, Checkbox, Textarea, Text } from '@chakra-ui/react';
import Select from 'react-select';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import DeleteModal from './deleteModal';

const nomineeOptions = [
    { label: 'John Doe', value: 'john.doe@example.com' },
    { label: 'Jane Smith', value: 'jane.smith@example.com' },
    { label: 'Mike Johnson', value: 'mike.johnson@example.com' },
];

const ccEmailOptions = [
    { label: 'Alice Brown', value: 'alice.brown@example.com' },
    { label: 'Bob Davis', value: 'bob.davis@example.com' },
    { label: 'Charlie Evans', value: 'charlie.evans@example.com' },
];

const userGroupOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
];

const ProfileDetails = ({ formData, handleInputChange }) => {
    const isUserLocked = () => formData.lockedUser;

    const handleSelectChange = (name, selectedOption) => {
        if (!isUserLocked()) {
            handleInputChange({ target: { name, value: selectedOption.value } });
        }
    };
    const toggleLockStatus = () => {
        handleInputChange({ target: { name: 'lockedUser', value: !formData.lockedUser } });
    };

    return (
        <Box flex="1">
            <SimpleGrid columns={2} spacing={4}>
                <FormControl display="flex" alignItems="center">
                    <Box display="flex" alignItems="center" mr={4}>
                        <Checkbox
                            name="activeUser" mr={2}
                            isChecked={formData.activeUser}
                            onChange={(e) => handleInputChange({ target: { name: 'activeUser', value: e.target.checked } })}
                        />
                        <FormLabel mb="0" mr={2}>Active user</FormLabel>

                    </Box>
                    <Box display="flex" alignItems="center" mr={4} onClick={toggleLockStatus} cursor="pointer">
                        {formData.lockedUser ? (
                            <>
                                <LockIcon color="black" ml={2} />
                                <FormLabel mb="0" mr={2}>Locked User</FormLabel>
                            </>
                        ) : (
                            <>
                                <UnlockIcon color="black" ml={2} />
                                <FormLabel mb="0" mr={2}>Unlocked User</FormLabel>
                            </>
                        )}
                    </Box>
                    <Box display="flex" alignItems="center" mr={4}  cursor="pointer">
         
                        <DeleteModal selectedUser={formData}/>
                        <Text>Delete</Text>
                        
                    </Box>
                </FormControl>
                <FormControl>
                    <FormLabel>User ID</FormLabel>
                    <Input
                        type="text"
                        name="userId"
                        value={formData.userId || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Surname</FormLabel>
                    <Input
                        type="text"
                        name="surname"
                        value={formData.surname || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Telephone</FormLabel>
                    <Input
                        type="number"
                        name="telephone"
                        value={formData.telephone || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>User Group</FormLabel>
                    <Select
                        name="userGroup"
                        options={userGroupOptions || ''}
                        onChange={(selectedOption) => handleSelectChange('userGroup', selectedOption)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Input
                        type="text"
                        name="language"
                        value={formData.language || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>CC Email To</FormLabel>
                    <Select
                        name="ccEmailTo"
                        options={ccEmailOptions}
                        onChange={(selectedOption) => handleSelectChange('ccEmailTo', selectedOption)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Nominee</FormLabel>
                    <Select
                        name="nominee"
                        options={nomineeOptions}
                        onChange={(selectedOption) => handleSelectChange('nominee', selectedOption)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password Expiry Date</FormLabel>
                    <Input
                        type="date"
                        name="passwordExpiryDate"
                        value={formData.passwordExpiryDate || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Locked Out Reason</FormLabel>
                    <Input
                        type="text"
                        name="lockedOutReason"
                        value={formData.lockedOutReason || ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <FormLabel mb="0" mr={2}>Administrator</FormLabel>
                        <Checkbox
                            name="administrator"
                            isChecked={formData.administrator}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                handleInputChange({ target: { name: 'administrator', value: isChecked } });
                                handleInputChange({ target: { name: 'role', value: isChecked ? 'admin' : 'user' } });
                            }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" ml={4}>
                        <FormLabel mb="0" mr={2}>Can Authorise</FormLabel>
                        <Checkbox
                            name="canAuthorise"
                            isChecked={formData.canAuthorise}
                            onChange={(e) => handleInputChange({ target: { name: 'canAuthorise', value: e.target.checked } })}
                        />
                    </Box>
                </FormControl>


                {/* Add Regulatory Box below the "Administrator" and "Can Authorise" fields */}
                <Box gridColumn="span 2">
                    <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mt={4} backgroundColor="white">
                        <Heading as="h3" size="sm" mb={4} textAlign="left">Regulatory</Heading>
                        <SimpleGrid columns={2} spacing={4}>
                            <FormControl>
                                <FormLabel>Reference</FormLabel>
                                <Input
                                    type="text"
                                    name="reference"
                                    value={formData.reference || ''}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Status Date</FormLabel>
                                <Input
                                    type="date"
                                    name="statusDate"
                                    value={formData.statusDate || ''}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    name="status"
                                    value={formData.status || ''}
                                    onChange={handleInputChange}
                                >
                                    {/* Options go here */}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Review Date</FormLabel>
                                <Input
                                    type="date"
                                    name="reviewDate"
                                    value={formData.reviewDate || ''}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </SimpleGrid>
                        <FormControl mt={4}>
                            <FormLabel>Notes</FormLabel>
                            <Textarea
                                name="notes"
                                value={formData.notes || ''}
                                onChange={handleInputChange}
                                placeholder="Enter notes here..."
                            />
                        </FormControl>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default ProfileDetails;