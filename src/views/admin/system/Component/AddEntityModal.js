import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Select, Checkbox, Button, Box, Flex, Heading
} from '@chakra-ui/react';
import { AddEntity } from 'redux/entitiy/action';
import { useDispatch } from 'react-redux';
import { updateEntity } from 'redux/entitiy/action';

const AddEntityModal = ({ isOpen, onClose, selectedEntity, loading }) => {
  const [formValues, setFormValues] = useState({
    isActive: false,
    description: '',
    ram: '',
    createdOn: '',
    owner: '',
    nominee: '',
    reviewer: '',
    reviewDate: '',
    location: '',
    businessLine: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    console.log(formValues);
    dispatch(AddEntity(formValues));
    setFormValues({});
    onClose();
  };

  useEffect(() => {
    if (selectedEntity) {
      setFormValues(selectedEntity); // Pre-fill the form with selected user data
    }
  }, [selectedEntity]);

  const handleEdit = () => {
    console.log(formValues);
    dispatch(updateEntity(selectedEntity._id));
    setFormValues({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedEntity?.referenceId ? "Edit Entity" : "Add Entity"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={8}>
            <Box width='50%' mr={4}>
              <FormControl mb="4">
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>RAM</FormLabel>
                <Select
                  name="ram"
                  value={formValues.ram}
                  onChange={handleChange}
                >
                  {/* Add options here */}
                </Select>
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Created On</FormLabel>
                <Input
                  name="createdOn"
                  type="date"
                  value={formValues.createdOn}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Owner</FormLabel>
                <Input
                  name="owner"
                  value={formValues.owner}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Nominee</FormLabel>
                <Input
                  name="nominee"
                  value={formValues.nominee}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Reviewer</FormLabel>
                <Input
                  name="reviewer"
                  value={formValues.reviewer}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Review Date</FormLabel>
                <Input
                  name="reviewDate"
                  type="date"
                  value={formValues.reviewDate}
                  onChange={handleChange}
                />
              </FormControl>
                <Flex direction='row' gap={2} alignItems='center' mb="4">
                <Checkbox
                  name="isActive"
                  isChecked={formValues.isActive}
                  onChange={handleChange}
                />
                <Box>Entity Active</Box>
                </Flex>
            </Box>
            <Box width='50%' height={250}>
              <Heading size="md" mb={4}>
                Operational Models (Based on user views)
              </Heading>
              <FormControl mb="4">
                <FormLabel>Location</FormLabel>
                <Select
                  name="location"
                  value={formValues.location}
                  onChange={handleChange}
                >
                  {/* Add options here */}
                </Select>
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Business Line</FormLabel>
                <Select
                  name="businessLine"
                  value={formValues.businessLine}
                  onChange={handleChange}
                >
                  {/* Add options here */}
                </Select>
              </FormControl>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {/* <Button colorScheme="green" mr={3}>Documents</Button> */}
          <Button colorScheme="blue" mr={3} onClick={selectedEntity?.referenceId ? handleEdit : handleSave} isLoading={loading} >
            {selectedEntity?.referenceId ? "Edit" : "Save"}
          </Button>
          <Button colorScheme="red" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEntityModal;
