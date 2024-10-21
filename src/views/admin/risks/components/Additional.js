import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  List,
  ListItem,
  Collapse,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdUploadFile } from 'react-icons/md';
import data from '../Data';
import MultiLevelList from './NestedListItem ';

const Additional = ({ onAdditionalChange, event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDescriptions, setSelectedDescriptions] = useState({});
  
  // État pour stocker les descriptions pré-remplies
  const [preFilledDescriptions, setPreFilledDescriptions] = useState({});

  // Remplissage des descriptions à partir de l'objet event
  useEffect(() => {
    if (event && event.additionnalInfo) {
      const descriptions = {};
      event.additionnalInfo.forEach((item, index) => {
        descriptions[index] = item.description; // Assurez-vous que l'index correspond
      });
      setPreFilledDescriptions(descriptions);
    }
  }, [event]);

  const handleCellClick = (index, category) => {
    setSelectedCategory({ index, category });
    setIsOpen(true);
  };

  const handleItemClick = (item) => {
    setSelectedDescriptions(prevState => ({
      ...prevState,
      [selectedCategory.index]: item,
    }));
    setIsOpen(false);
    onAdditionalChange({
      ...selectedDescriptions,
      [selectedCategory.index]: item,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const payload = Object.keys(selectedDescriptions).map(index => ({
      category: data[index].title,
      description: selectedDescriptions[index] || preFilledDescriptions[index] || '', // Inclure la description pré-remplie si aucune sélection
    }));
    console.log('Payload:', payload);
    // Vous pouvez envoyer le payload à un serveur ici si nécessaire
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={12}>Category</Th>
            <Th fontSize={12}>Select</Th>
            <Th fontSize={12}>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td fontSize={12}>{item.title} <span style={{ color: 'red' }}>*</span></Td>
              <Td onClick={() => handleCellClick(index, item.title)}>
                <Button variant="link" color="blue"><MdUploadFile /></Button>
              </Td>
              <Td fontSize={12}>{selectedDescriptions[index] || preFilledDescriptions[index] || ''}</Td> {/* Afficher la description pré-remplie */}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCategory?.category}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCategory && (
              <MultiLevelList
                data={data.find(item => item.title === selectedCategory.category)}
                onItemClick={handleItemClick}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Additional;