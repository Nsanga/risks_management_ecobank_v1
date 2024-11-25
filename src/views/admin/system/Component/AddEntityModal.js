import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Checkbox, Button, Box, Flex, Heading,
  InputGroup,
  InputLeftElement,
  Text
} from '@chakra-ui/react';
import { AddEntity } from 'redux/entitiy/action';
import { useDispatch } from 'react-redux';
import { updateEntity } from 'redux/entitiy/action';
import { EditIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import DeleteModal from 'views/admin/event/components/DeleteModal';

const AddEntityModal = ({ isOpen, onClose, selectedEntity, loading, profiles }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    entityActive: true,
    description: '',
    ram: '',
    createdOn: '',
    owner: '',
    nominee: null,
    reviewer: null,
    reviewDate: '',
    location: 'CAMEROUN',
    businessLine: ''
  });
  console.log(selectedEntity)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : null
    }));
  };

  const profilesOptions = profiles
    .filter(profile => profile.activeUser)  // Filtrer les profils actifs
    .map(profile => ({
      value: profile._id,
      label: `${profile.name} ${profile.surname}`
    }));

  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedValues = {
      ...formValues,
    };
    console.log(updatedValues);
    dispatch(AddEntity(updatedValues));
    setFormValues({
      entityActive: true,
      description: '',
      ram: '',
      createdOn: '',
      owner: '',
      nominee: null,
      reviewer: null,
      reviewDate: '',
      location: 'CAMEROUN',
      businessLine: ''
    });
    onClose();
  };

  useEffect(() => {
    if (selectedEntity) {
      setFormValues({
        ...selectedEntity,
        createdOn: new Date(selectedEntity.createdOn).toISOString().split('T')[0] || '',
        reviewDate: new Date(selectedEntity.reviewDate).toISOString().split('T')[0] || '',
      }); // Pré-remplir le formulaire uniquement en mode édition
    } else {
      setFormValues({
        entityActive: true,
        description: '',
        ram: '',
        createdOn: '',
        owner: '',
        nominee: null,
        reviewer: null,
        reviewDate: '',
        location: 'CAMEROUN',
        businessLine: ''
      }); // Réinitialiser le formulaire
    }
  }, [selectedEntity]);

  useEffect(() => {
    // Initialiser la date du jour dans createdOn lors du montage du composant ou lorsque selectedEntity change
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    setFormValues(prevValues => ({
      ...prevValues,
      createdOn: prevValues.createdOn || today,
    }));
  }, [isOpen, selectedEntity]);

  useEffect(() => {
    if (selectedEntity) {
      setFormValues(prevState => ({
        ...prevState,
        owner: selectedEntity.owner ? selectedEntity.owner._id : null,
        nominee: selectedEntity.nominee ? selectedEntity.nominee._id : null,
        reviewer: selectedEntity.reviewer ? selectedEntity.reviewer._id : null
      }));
    }
  }, [selectedEntity]);
  


  const handleEdit = () => {
    console.log(formValues);
    dispatch(updateEntity(selectedEntity._id, formValues));
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

  const isSaveDisabled = !formValues.description || !formValues.ram || !formValues.owner || !formValues.reviewDate || !formValues.location;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>
          <Flex justifyContent='space-between'>
            <Text>{selectedEntity?.referenceId ? "Amend Entity" : "Add Entity"}</Text>
            <Flex gap={4} mb={8} alignItems='center'>
              <Flex direction='row' gap={2} alignItems='center'>
                <Checkbox
                  name="entityActive"
                  isChecked={formValues.entityActive}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
                <Text fontSize={12}>Entity Active</Text>
              </Flex>
              <DeleteModal selectedEntity={formValues} disabled={!isEditMode} onCloseAddEntityModal={onClose}/>
              <Button leftIcon={<EditIcon color="white" />} colorScheme='blue' style={{ fontSize: 14 }} onClick={handleAmendClick}
                disabled={!isEditMode}>Amend</Button>
            </Flex>
          </Flex>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Flex gap={8}>
            <Box width='50%' mr={4}>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Description <span style={{ color: 'red' }}>*</span></FormLabel>
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
                <FormLabel fontSize={12}>RAM <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  name="ram"
                  value={formValues.ram}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Created On</FormLabel>
                <Input
                  name="createdOn"
                  type="date"
                  value={formValues.createdOn}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Owner <span style={{ color: 'red' }}>*</span></FormLabel>
                <Select
                  name="owner"
                  options={profilesOptions}
                  value={profilesOptions.find(option => option.value === formValues.owner) || null}
                  onChange={(selectedOption) => handleSelectChange('owner', selectedOption)}
                  isDisabled={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Nominee</FormLabel>
                <Select
                  name="nominee"
                  options={profilesOptions}
                  value={profilesOptions.find(option => option.value === formValues.nominee) || null}
                  onChange={(selectedOption) => handleSelectChange('nominee', selectedOption)}
                  isDisabled={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Reviewer</FormLabel>
                <Select
                  name="reviewer"
                  options={profilesOptions}
                  value={profilesOptions.find(option => option.value === formValues.reviewer) || null}
                  onChange={(selectedOption) => handleSelectChange('reviewer', selectedOption)}
                  isDisabled={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Review Date <span style={{ color: 'red' }}>*</span></FormLabel>
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
                <FormLabel fontSize={12}>Location <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  name="location"
                  type="text"
                  value={formValues.location}
                  onChange={handleChange}
                  isReadOnly={isEditMode}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel fontSize={12}>Business Line <span style={{ color: 'red' }}>*</span></FormLabel>
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
                <Button colorScheme="blue" mr={3} isLoading={loading} onClick={handleSave} disabled={isSaveDisabled}>
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
