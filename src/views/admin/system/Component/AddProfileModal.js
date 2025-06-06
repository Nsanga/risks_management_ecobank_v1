import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  Button,
  Box, Collapse, Flex, ModalFooter
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ProfileDetails from './ProfileDetails';
import OperationalModelOptions from './OperationalModelOptions';
import { AddProfile } from 'redux/profile/action';
import { connect, useDispatch } from 'react-redux';
import { updateProfile } from 'redux/profile/action';

const AddProfileModal = ({ isOpen, onClose, loading, selectedUser, userGroups, profiles, entities }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    surname: '',
    jobTitle: '',
    location: '',
    telephone: '',
    email: '',
    userGroup: null,
    language: '',
    ccEmailTo: '',
    nominee: '',
    passwordExpiryDate: '2030-12-31',
    lockedOutReason: '',
    administrator: false,
    canAuthorize: false,
    activeUser: false,
    entity: [],
  });

  useEffect(() => {
    console.log("selectedUser:", selectedUser);
    console.log("userGroups:", userGroups);
    if (selectedUser && selectedUser.userId) {
      setIsEditMode(true);
      // setFormData({
      //   ...formData,
      //   ...selectedUser,
      // });
    } else {
      setIsEditMode(false);
      setFormData({
        userId: '',
        name: '',
        surname: '',
        jobTitle: '',
        location: '',
        telephone: '',
        email: '',
        userGroup: null,
        language: '',
        ccEmailTo: '',
        nominee: '',
        passwordExpiryDate: '2030-12-31',
        lockedOutReason: '',
        administrator: false,
        canAuthorize: false,
        activeUser: false
      });
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    console.log(formData);
    dispatch(AddProfile(formData));
    setFormData({
      userId: '',
      name: '',
      surname: '',
      jobTitle: '',
      location: '',
      telephone: '',
      email: '',
      userGroup: null,
      language: '',
      ccEmailTo: '',
      nominee: '',
      passwordExpiryDate: '2030-12-31',
      lockedOutReason: '',
      administrator: false,
      canAuthorize: false,
      activeUser: false
    });
    onClose();
  };

  useEffect(() => {

    if (selectedUser) {
      setFormData({
        ...selectedUser,
        passwordExpiryDate: selectedUser.passwordExpiryDate
          ? new Date(selectedUser.passwordExpiryDate).toISOString().split('T')[0]
          : '2030-12-31',
        userGroup: selectedUser.userGroup || null,
      });
    }
  }, [selectedUser, userGroups]);

  const handleEdit = () => {
    console.log(formData);
    dispatch(updateProfile(selectedUser._id, formData));
    setFormData({
      userId: '',
      name: '',
      surname: '',
      jobTitle: '',
      location: '',
      telephone: '',
      email: '',
      userGroup: null,
      language: '',
      ccEmailTo: '',
      nominee: '',
      passwordExpiryDate: '2030-12-31',
      lockedOutReason: '',
      administrator: false,
      canAuthorize: false,
      activeUser: false,
      lockedUser: false
    });
    onClose();
  };

  // useEffect(() => {
  //   if (selectedUser && selectedUser.userId) {
  //     setIsEditMode(true); // Mode édition
  //   } else {
  //     setIsEditMode(false); // Mode ajout
  //   }
  // }, [selectedUser]);

  const handleAmendClick = () => {
    setIsEditMode(false); // Désactiver le mode lecture seule après avoir cliqué sur "Amend"
  };

  const handleClose = () => {
    onClose();
    setIsEditMode(true);
  }

  useEffect(() => {
    if (isOpen && selectedUser?.userId) {
      setIsEditMode(true); // Mode édition si un utilisateur est sélectionné
    } else {
      setIsEditMode(false); // Mode ajout sinon
    }
  }, [isOpen, selectedUser]);

  const handleLockedUser = async () => {
    const updatedLockedUser = !formData.lockedUser;
    const updatedActiveUser = !formData.activeUser;

    // Met à jour l'état local du formulaire
    setFormData({ ...formData, lockedUser: updatedLockedUser });

    try {
      // Met à jour le profil dans le store
      await dispatch(updateProfile(selectedUser._id, { ...formData, lockedUser: updatedLockedUser, activeUser: updatedActiveUser }));
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  const username = selectedUser?.surname + " " + selectedUser?.name;

  const isSaveDisabled = !formData.userId || !formData.name || !formData.surname || !formData.telephone || !formData.email;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{!selectedUser?.userId ? "Add New Profile" : "Amend Profile"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box flex="1">
            <Flex gap={4}>
              <Button
                onClick={() => setIsDetailsVisible(true)}
                colorScheme={isDetailsVisible ? 'blue' : 'gray'}
                variant={isDetailsVisible ? 'solid' : 'outline'}
                leftIcon={<AddIcon />}
                fontSize={12}
                size="sm"
              >
                User Details
              </Button>
              <Button
                onClick={() => setIsDetailsVisible(false)}
                colorScheme={!isDetailsVisible ? 'blue' : 'gray'}
                variant={!isDetailsVisible ? 'solid' : 'outline'}
                leftIcon={<AddIcon />}
                fontSize={12}
                size="sm"
              >
                User Entity Views
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                leftIcon={<AddIcon />}
                fontSize={12}
                size="sm"
              >
                User
              </Button>
            </Flex>
            <Box mt={4}>
              <Collapse in={isDetailsVisible}>
                <ProfileDetails
                  formData={formData}
                  handleInputChange={handleInputChange}
                  isReadOnly={isEditMode}
                  handleAmendClick={handleAmendClick}
                  handleLockedUser={handleLockedUser}
                  profiles={profiles}
                  userGroups={userGroups}
                  onClose={onClose} 
                  username={username}
                  selectedUser={selectedUser}
                />
              </Collapse>
              <Collapse in={!isDetailsVisible}>
                <OperationalModelOptions formData={formData} handleInputChange={handleInputChange} entities={entities} />
              </Collapse>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
        <Button colorScheme="red"  mr={3} onClick={handleClose}>Cancel</Button>
          {
            !selectedUser?.userId ?
              (
                <Button colorScheme="blue" isLoading={loading} onClick={handleSave} fontSize={12} disabled={isSaveDisabled}>
                  Save
                </Button>
              ) : null
          }
          {
            selectedUser?.userId && !isEditMode ? (
              <Button colorScheme="blue" isLoading={loading} onClick={handleEdit} fontSize={12}>
                Save
              </Button>
            ) : null
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ ProfileReducer }) => ({
  profiles: ProfileReducer.profiles,
  loading: ProfileReducer.loading,
});

export default connect(mapStateToProps)(AddProfileModal);
