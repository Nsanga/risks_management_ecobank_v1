import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Select, Checkbox, Button, Box, Flex, Heading,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { AddEntity } from 'redux/entitiy/action';
import { useDispatch } from 'react-redux';
import { updateEntity } from 'redux/entitiy/action';
import DeleteModal from './DeleteModal';
import { EditIcon } from '@chakra-ui/icons';

const AddEntityModal = ({ isOpen, onClose, selectedEntity, loading }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    isActive: true,
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
    const updatedValues = {
      ...formValues,
      description: `CAM - ${formValues.description}` // Ajoutez le préfixe avant d'enregistrer
    };
    console.log(updatedValues);
    dispatch(AddEntity(updatedValues));
    setFormValues({});
    onClose();
  };

  useEffect(() => {
    if (selectedEntity && isEditMode) {
      setFormValues(selectedEntity); // Pré-remplir le formulaire uniquement en mode édition
    } else {
      setFormValues({}); // Réinitialiser le formulaire
    }
  }, [selectedEntity, isEditMode]);

  useEffect(() => {
    // Initialiser la date du jour dans createdOn lors du montage du composant ou lorsque selectedEntity change
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    setFormValues(prevValues => ({
      ...prevValues,
      createdOn: prevValues.createdOn || today
    }));
  }, [isOpen, selectedEntity]);


  const handleEdit = () => {
    console.log(formValues);
    dispatch(updateEntity(selectedEntity._id));
    setFormValues({});
    onClose();
  };

  const handleAmendClick = () => {
    setIsEditMode(false); // Désactiver le mode lecture seule après avoir cliqué sur "Amend"
  };

  useEffect(() => {
    if (isOpen && selectedEntity?.referenceId) {
      setIsEditMode(true); // Mode édition si un utilisateur est sélectionné
    } else {
      setIsEditMode(false); // Mode ajout sinon
    }
  }, [isOpen, selectedEntity]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedEntity?.referenceId ? "Amend Entity" : "Add Entity"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4} mb={8} alignItems='center'>
            <Flex direction='row' gap={2} alignItems='center'>
              <Checkbox
                name="isActive"
                isChecked={formValues.isActive}
                onChange={handleChange}
                isReadOnly={isEditMode}
              />
              <Box>Entity Active</Box>
            </Flex>
            <DeleteModal selectedEntity={formValues} disabled={!isEditMode} />
            <Button leftIcon={<EditIcon color="white" />} colorScheme='blue' style={{ fontSize: 14 }} onClick={handleAmendClick}
              disabled={!isEditMode}>Amend</Button>
          </Flex>
          <Flex gap={8}>
            <Box width='50%' mr={4}>
            <FormControl mb="4">
                <FormLabel>Description</FormLabel>
                <InputGroup >
                  <InputLeftElement width={70}>
                    <Box >CAM - </Box>
                  </InputLeftElement>
                  <Input
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    isReadOnly={isEditMode}
                    pl="4rem"
                    pb={0.5}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mb="4">
                <FormLabel>RAM</FormLabel>
                <Input
                  value={formValues.ram}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Created On</FormLabel>
                <Input
                  name="createdOn"
                  type="date"
                  value={formValues.createdOn}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Owner</FormLabel>
                <Input
                  name="owner"
                  value={formValues.owner}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Nominee</FormLabel>
                <Input
                  name="nominee"
                  value={formValues.nominee}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Reviewer</FormLabel>
                <Input
                  name="reviewer"
                  value={formValues.reviewer}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Review Date</FormLabel>
                <Input
                  name="reviewDate"
                  type="date"
                  value={formValues.reviewDate}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
            </Box>
            <Box width='50%' height={250}>
              <Heading size="md" mb={4}>
                Operational Models (Based on user views)
              </Heading>
              <FormControl mb="4">
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  type="text"
                  value={formValues.location || 'CAMEROUN'}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Business Line</FormLabel>
                <Select
                  name="businessLine"
                  value={formValues.businessLine}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                >
                  {/* Add options here */}
                </Select>
              </FormControl>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {
            !selectedEntity?.referenceId ?
              (
                <Button colorScheme="blue" mr={3} isLoading={loading} onClick={handleSave}>
                  Save
                </Button>
              ) : null
          }
          {
            selectedEntity?.referenceId && !isEditMode ? (
              <Button colorScheme="blue" mr={3} isLoading={loading} onClick={handleEdit}>
                Save
              </Button>
            ) : null
          }
          <Button colorScheme="red" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEntityModal;
