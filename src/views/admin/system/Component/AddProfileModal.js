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

const AddProfileModal = ({ isOpen, onClose, loading, selectedUser }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    console.log(formData);
    dispatch(AddProfile(formData));
    setFormData({});
    onClose();
  };

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser); // Pre-fill the form with selected user data
    }
  }, [selectedUser]);

  const handleEdit = () => {
    console.log(formData);
    dispatch(updateProfile(selectedUser._id));
    setFormData({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{!selectedUser?.userId ? "Add New Profile" : "Edit Profile"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box flex="1">
            <Flex gap={4}>
              <Button
                onClick={() => setIsDetailsVisible(true)}
                colorScheme={isDetailsVisible ? 'blue' : 'gray'}
                variant={isDetailsVisible ? 'solid' : 'outline'}
                leftIcon={<AddIcon />}
                fontSize="sm"
                size="sm"
              >
                User Details
              </Button>
              <Button
                onClick={() => setIsDetailsVisible(false)}
                colorScheme={!isDetailsVisible ? 'blue' : 'gray'}
                variant={!isDetailsVisible ? 'solid' : 'outline'}
                leftIcon={<AddIcon />}
                fontSize="sm"
                size="sm"
              >
                User Entity Views
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                leftIcon={<AddIcon />}
                fontSize="sm"
                size="sm"
              >
                User Entities
              </Button>
            </Flex>
            <Box mt={4}>
              <Collapse in={isDetailsVisible}>
                <ProfileDetails formData={formData} handleInputChange={handleInputChange} />
              </Collapse>
              <Collapse in={!isDetailsVisible}>
                <OperationalModelOptions formData={formData} handleInputChange={handleInputChange} />
              </Collapse>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} isLoading={loading} onClick={!selectedUser?.userId ? handleSave : handleEdit}>
            {!selectedUser?.userId ? "Save" : "Edit"}
          </Button>
          <Button colorScheme="red" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ ProfileReducer }) => ({
  profiles: ProfileReducer.profiles,
  loading: ProfileReducer.loading,
});

export default connect(mapStateToProps)(AddProfileModal);;
