import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, SimpleGrid, Heading, Box, Checkbox, Textarea, Text, Button, Flex } from '@chakra-ui/react';
import Select from 'react-select';
import { EditIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import DeleteModal from './deleteModal';

const ProfileDetails = ({ formData, selectedUser, handleInputChange, isReadOnly, handleAmendClick, userGroups, handleLockedUser, profiles, username, onClose, entities }) => {
    
    const userGroupOptions = userGroups.map(group => ({
        value: group._id,
        label: group.groupName
    }));

    const profilesOptions = profiles
        .filter(profile => profile.activeUser)  // Filtrer les profils actifs
        .map(profile => ({
            value: profile.email,
            label: `${profile.name} ${profile.surname}`
        }));

    const handleSelectChange = (name, selectedOption) => {
        handleInputChange({ target: { name, value: selectedOption.value } });
    };

    const toggleLockStatus = () => {
        handleLockedUser();
    };

    const entitiesOptions = entities?.map((entity, index) => ({
        key: `${entity._id}-${index}`,
        value: entity._id,
        label: `ENT${entity.referenceId} CAM - ${entity.description}`,
        description: entity.description,
        fullEntity: entity,
    }));

    const selectedEntity = entitiesOptions.find(
        option => option.value === (formData.entity?._id || formData.entity)
    );

    const roleOptions = [
        {
            value: "inputeurs",
            label: "Inputeur (Nominé)",
            description: "Initie les tests",
        },
        {
            value: "validated",
            label: "Validateur (Owner)",
            description: "Valide les tests",
        },
        {
            value: "admin",
            label: "Admin (Chef de Société)",
            description: "Crée les entités, valide les tests, gère les opérations (buld-amend, copy, remove...)",
        },
        {
            value: "superAdmin",
            label: "Super Admin",
            description: "Accès complet (base de données + tous les droits)",
        },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: "12px",
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: "12px",
            maxHeight: "200px", // Définir une hauteur maximale pour le menu
            overflowY: "auto", // Activer le défilement vertical
        }),
        option: (provided) => ({
            ...provided,
            fontSize: "12px",
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: "12px",
        }),
    };

    return (
        <Box flex="1">
            <SimpleGrid columns={2} spacing={4}>
                <FormControl display="flex" alignItems="center" ml={4}>
                    <Box display="flex" alignItems="center" mr={4}>
                        <Checkbox
                            name="activeUser"
                            mr={2}
                            isChecked={formData.activeUser}
                            onChange={(e) => handleInputChange({ target: { name: 'activeUser', value: e.target.checked } })}
                            isReadOnly={isReadOnly || formData.lockedUser}
                        />
                        <FormLabel mb="0" mr={2} fontSize={12}>Active user</FormLabel>
                    </Box>
                    {username !== localStorage.getItem('username') ?
                        (
                            <>
                                {selectedUser && (
                                    <>
                                        <Button
                                            leftIcon={<EditIcon color="white" />}
                                            colorScheme='blue'
                                            style={{ fontSize: 14 }}
                                            onClick={handleAmendClick}
                                            disabled={!isReadOnly || formData.lockedUser}
                                        >
                                            Amend
                                        </Button>
                                        <Box display="flex" alignItems="center" mr={4} onClick={toggleLockStatus} cursor="pointer">
                                            <Button
                                                leftIcon={formData.lockedUser ? <LockIcon /> : <UnlockIcon />}
                                                colorScheme={formData.lockedUser ? "yellow" : "green"}
                                                fontSize={12}
                                                onClick={toggleLockStatus}
                                                disabled={!isReadOnly}
                                                ml={4}
                                            >
                                                {formData.lockedUser ? "Unlocked User" : "Locked User"}
                                            </Button>
                                        </Box>
                                        <Box display="flex" alignItems="center" mr={4} cursor="pointer">
                                            <DeleteModal selectedUser={formData} disabled={!isReadOnly} onCloseAddProfileModal={onClose} />
                                        </Box>
                                    </>
                                )}
                            </>
                        ) : null}

                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>User ID <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Name <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Surname</FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Job Title</FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Location</FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Telephone <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input
                        fontSize={12}
                        type="number"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Email <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input
                        fontSize={12}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isReadOnly={selectedUser ? true : false}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>User Group</FormLabel>
                    <Select
                        name="userGroup"
                        options={userGroupOptions}
                        value={userGroupOptions.find(option => option.value === formData.userGroup)}
                        onChange={(selectedOption) => handleSelectChange('userGroup', selectedOption)}
                        isDisabled={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Language</FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>CC Email To</FormLabel>
                    <Select
                        name="ccEmailTo"
                        options={profilesOptions}
                        value={profilesOptions.find(option => option.value === formData.ccEmailTo) || null}
                        onChange={(selectedOption) => handleSelectChange('ccEmailTo', selectedOption)}
                        isDisabled={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Nominee</FormLabel>
                    <Select
                        name="nominee"
                        options={profilesOptions}
                        value={profilesOptions.find(option => option.value === formData.nominee) || null}
                        onChange={(selectedOption) => handleSelectChange('nominee', selectedOption)}
                        isDisabled={isReadOnly}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Password Expiry Date</FormLabel>
                    <Input
                        fontSize={12}
                        type="date"
                        name="passwordExpiryDate"
                        value={formData.passwordExpiryDate}
                        onChange={handleInputChange}
                        isReadOnly
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={12}>Locked Out Reason</FormLabel>
                    <Input
                        fontSize={12}
                        type="text"
                        name="lockedOutReason"
                        value={formData.lockedOutReason}
                        onChange={handleInputChange}
                        isReadOnly={isReadOnly}
                    />
                </FormControl>
                <Box display="flex" alignItems="center">
                    <FormLabel fontSize={12} mb="0" mr={2}>Administrator</FormLabel>
                    <Checkbox
                        name="administrator"
                        isChecked={formData.administrator}
                        onChange={(e) => handleInputChange({ target: { name: 'administrator', value: e.target.checked } })}
                        isReadOnly={isReadOnly}
                    />
                </Box>
                <Box display="flex" alignItems="center" ml={4}>
                    <FormLabel fontSize={12} mb="0" mr={2}>Can Authorise</FormLabel>
                    <Checkbox
                        name="canAuthorize"
                        isChecked={formData.canAuthorize}
                        onChange={(e) => handleInputChange({ target: { name: 'canAuthorize', value: e.target.checked } })}
                        isReadOnly={isReadOnly}
                    />
                </Box>

                <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mt={4} backgroundColor="white">
                    <Heading as="h3" size="sm" mb={4} textAlign="left">Entity</Heading>
                    <FormControl>
                        <FormLabel>Select Entity <span style={{ color: 'red' }}>*</span></FormLabel>
                        <Box w="100%">
                            <Select
                                name="entity"
                                isDisabled={isReadOnly}
                                options={entitiesOptions}
                                styles={customStyles}
                                placeholder="Select Entity"
                                value={selectedEntity ? {
                                    ...selectedEntity,
                                    label: selectedEntity.label, // Même format que les options
                                } : null}
                                onChange={(entitiesOptions) => handleSelectChange('entity', entitiesOptions)}
                            />
                        </Box>
                    </FormControl>
                </Box>

                <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mt={4} backgroundColor="white">
                    <Heading as="h3" size="sm" mb={4} textAlign="left">Role <span style={{ color: 'red' }}>*</span></Heading>
                    <FormControl>
                        <FormLabel>Select user role</FormLabel>
                        <Box w="100%">
                            <Select
                                name="role"
                                isDisabled={isReadOnly}
                                options={roleOptions}
                                styles={customStyles}
                                placeholder="Select role"
                                value={roleOptions.find(option => option.value === formData.role)}
                                onChange={(roleOptions) => handleSelectChange('role', roleOptions)}
                            />
                        </Box>
                    </FormControl>
                </Box>

                <Box gridColumn="span 2">
                    <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mt={4} backgroundColor="white">
                        <Heading as="h3" size="sm" mb={4} textAlign="left">Regulatory</Heading>
                        <SimpleGrid columns={2} spacing={4}>
                            <FormControl>
                                <FormLabel fontSize={12}>Reference</FormLabel>
                                <Input
                                    fontSize={12}
                                    type="text"
                                    name="reference"
                                    value={formData.reference}
                                    onChange={handleInputChange}
                                    isReadOnly={isReadOnly}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={12}>Status Date</FormLabel>
                                <Input
                                    fontSize={12}
                                    type="date"
                                    name="statusDate"
                                    value={formData.statusDate}
                                    onChange={handleInputChange}
                                    isReadOnly={isReadOnly}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={12}>Status</FormLabel>
                                <Select
                                    name="status"
                                    options={[]}
                                    value={formData.status}
                                    onChange={(selectedOption) => handleSelectChange('status', selectedOption)}
                                    isDisabled={isReadOnly}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={12}>Review Date</FormLabel>
                                <Input
                                    fontSize={12}
                                    type="date"
                                    name="reviewDate"
                                    value={formData.reviewDate}
                                    onChange={handleInputChange}
                                    isReadOnly={isReadOnly}
                                />
                            </FormControl>
                        </SimpleGrid>
                        <FormControl mt={4}>
                            <FormLabel fontSize={12}>Notes</FormLabel>
                            <Textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Enter notes here..."
                                isReadOnly={isReadOnly}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default ProfileDetails;
