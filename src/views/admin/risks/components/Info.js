import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Select,
    Text,
    IconButton,
} from '@chakra-ui/react';
import data from '../Data';
import { MdUploadFile } from 'react-icons/md';

const Info = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubCategory('');
        setSelectedItem('');
    };

    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
        setSelectedItem('');
    };

    const handleItemChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const closeModal = () => {
        onClose();
        setSelectedCategory('');
        setSelectedSubCategory('');
        setSelectedItem('');
    };

    const getSubCategoryOptions = () => {
        if (selectedCategory) {
            const category = data.categories.find(cat => cat.name === selectedCategory);
            return category ? category.subCategories.map(subCat => ({
                value: subCat.name,
                label: subCat.name,
            })) : [];
        }
        return [];
    };

    const getItemOptions = () => {
        if (selectedSubCategory) {
            const category = data.categories.find(cat => cat.name === selectedCategory);
            if (category) {
                const subCategory = category.subCategories.find(subCat => subCat.name === selectedSubCategory);
                return subCategory ? subCategory.items.map(item => ({
                    value: item,
                    label: item,
                })) : [];
            }
        }
        return [];
    };

    return (
        <>
            <IconButton onClick={onOpen}>
                <MdUploadFile />
            </IconButton>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Sélectionner une catégorie:</Text>
                        <Select value={selectedCategory} onChange={handleCategoryChange} placeholder="Select category" mt={2}>
                            {data.categories.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>

                        {selectedCategory && (
                            <>
                                <Text mt={4}>Sélectionner une sous-catégorie:</Text>
                                <Select value={selectedSubCategory} onChange={handleSubCategoryChange} placeholder="Select sub-category" mt={2}>
                                    {getSubCategoryOptions().map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            </>
                        )}

                        {selectedSubCategory && (
                            <>
                                <Text mt={4}>Sélectionner un élément:</Text>
                                <Select value={selectedItem} onChange={handleItemChange} placeholder="Select item" mt={2}>
                                    {getItemOptions().map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            </>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={closeModal}>
                            Fermer
                        </Button>
                        <Button variant="ghost">Action secondaire</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Info;
