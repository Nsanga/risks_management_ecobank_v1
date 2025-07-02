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
} from '@chakra-ui/react';
import { MdUploadFile } from 'react-icons/md';
import data from '../Data';
import MultiLevelList from './NestedListItem ';

const Additional = ({ onAdditionalChange, additionalData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDescriptions, setSelectedDescriptions] = useState({});

  // État pour stocker les descriptions pré-remplies
  const [preFilledDescriptions, setPreFilledDescriptions] = useState({});

  // Remplissage des descriptions à partir de l'objet additionalData
  useEffect(() => {
    console.log('additionalData', additionalData);

    const info = additionalData?.additionnalInfo;
    if (!info) return;

    const descriptions = {};

    if (Array.isArray(info)) {
      info.forEach((item, index) => {
        descriptions[index] = item.description;
      });
    } else if (typeof info === 'object') {
      Object.entries(info).forEach(([key, item]) => {
        descriptions[key] = item.description;
      });
    }

    setPreFilledDescriptions(descriptions);
  }, [additionalData]);

  const handleCellClick = (index, category) => {
    setSelectedCategory({ index, category });
    setIsOpen(true);
  };

  const handleItemClick = (item, path) => {
    const topLevel = path.length > 1 ? path[1] : null; // [0] = "No set", [1] = "Retail/ Consumer Banking"

    const payload = {
      index: selectedCategory.index,
      category: selectedCategory.category,
      description: item,
      topLevel,
    };

    setSelectedDescriptions(prevState => ({
      ...prevState,
      [selectedCategory.index]: item,
    }));

    setIsOpen(false);
    onAdditionalChange(payload); // envoie l'objet au parent
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
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
    </Box>
  );
};

export default Additional;