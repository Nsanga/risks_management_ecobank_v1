import React, { useState } from 'react';
import {
  Box,
  VStack,
  Flex,
  Text,
  Input,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select as ChakraSelect,
  Checkbox,
  HStack,
  Button,
  useToast
} from '@chakra-ui/react';
import Select from 'react-select';

const ActionForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    reference: '',
    description: '',
    commentary: '',
    progress: '',
    log: '',
    actionFocus: '',
    owner: null,
    nominee: null,
    reviewer: null,
    reviewDate: '',
    targetDate: '',
    cost: '',
    currency: 'USD'
  });

  const toast = useToast();

  // Options fictives pour les selects (à remplacer par vos vraies données)
  const profilesOptions = [
    { value: 'user1', label: 'User One' },
    { value: 'user2', label: 'User Two' },
    { value: 'user3', label: 'User Three' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '32px',
      height: '32px',
      fontSize: '14px'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '14px'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '14px'
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '14px',
      margin: '0',
      paddingBottom: '0',
      paddingTop: '0'
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption
    });
  };

  const handleTextareaChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log('Form data:', formData);
    
    toast({
      title: 'Form saved',
      description: 'The form data has been logged to console',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box flex="1" minW="50%" p={4}>
      <VStack align="start" spacing={3}>
        <Flex gap={4} w="100%">
          <Box flex="1">
            <Text fontWeight="bold">Action Ref:</Text>
            <Input size="sm" isReadOnly />
          </Box>
          <Box flex="1">
            <Text fontWeight="bold">Originating Risk Ref:</Text>
            <Input size="sm" isReadOnly />
          </Box>
          <Box flex="1">
            <Text fontWeight="bold">Action State:</Text>
            <Input size="sm" isReadOnly />
          </Box>
        </Flex>

        <Flex gap={4} w="100%">
          <Box flex="1">
            <Text>Source:</Text>
            <Input size="sm" isReadOnly value="Compliance" />
          </Box>
          <Box flex="1">
            <Text>Priority:</Text>
            <Input size="sm" value="1: High" isReadOnly />
          </Box>
          <Box flex="1">
            <Text>Reference:</Text>
            <Input 
              size="sm" 
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
            />
          </Box>
        </Flex>

        <Box w="100%">
          <Text>Description:</Text>
          <Input 
            size="sm" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Box>

        {/* Onglets */}
        <Tabs variant="solid-rounded" colorScheme="blue" w="100%">
          <TabList>
            <Tab>Commentary</Tab>
            <Tab>Progress</Tab>
            <Tab>Log</Tab>
            <Tab>Action Focus</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Textarea 
                size="sm" 
                placeholder="Commentary..." 
                value={formData.commentary}
                onChange={(e) => handleTextareaChange('commentary', e)}
              />
            </TabPanel>
            <TabPanel>
              <Textarea 
                size="sm" 
                placeholder="Progress..." 
                value={formData.progress}
                onChange={(e) => handleTextareaChange('progress', e)}
              />
            </TabPanel>
            <TabPanel>
              <Textarea 
                size="sm" 
                placeholder="Log..." 
                value={formData.log}
                onChange={(e) => handleTextareaChange('log', e)}
              />
            </TabPanel>
            <TabPanel>
              <Textarea 
                size="sm" 
                placeholder="Action Focus..." 
                value={formData.actionFocus}
                onChange={(e) => handleTextareaChange('actionFocus', e)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Bas du formulaire */}
        <Flex gap={4} flexWrap="wrap" w="100%" flexDirection='column'>
          <Box flex="1">
            <Text>Owner:</Text>
            <Select
              name="owner"
              options={profilesOptions}
              styles={customStyles}
              onChange={(selected) => handleSelectChange('owner', selected)}
              value={formData.owner}
              placeholder="Select owner"
              isClearable
            />
          </Box>
          <Box flex="1">
            <Text>Nominee:</Text>
            <Select
              name="nominee"
              options={profilesOptions}
              styles={customStyles}
              onChange={(selected) => handleSelectChange('nominee', selected)}
              value={formData.nominee}
              placeholder="Select nominee"
              isClearable
            />
          </Box>
          <Box flex="1">
            <Text>Reviewer:</Text>
            <Select
              name="reviewer"
              options={profilesOptions}
              styles={customStyles}
              onChange={(selected) => handleSelectChange('reviewer', selected)}
              value={formData.reviewer}
              placeholder="Select reviewer"
              isClearable
            />
          </Box>
          <Box flex="1">
            <Text>Review Date:</Text>
            <Input 
              size="sm" 
              type="date" 
              name="reviewDate"
              value={formData.reviewDate}
              onChange={handleInputChange}
            />
          </Box>
        </Flex>

        <Flex gap={4} flexWrap="wrap" w="100%">
          <HStack spacing={2}>
            <Checkbox />
            <Text mb="0" whiteSpace="nowrap">Target Date:</Text>
            <Input 
              size="sm" 
              type="date" 
              name="targetDate"
              value={formData.targetDate}
              onChange={handleInputChange}
            />
          </HStack>
          <HStack spacing={2}>
            <Text mb="0" whiteSpace="nowrap">Cost:</Text>
            <Input 
              size="sm" 
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
            />
          </HStack>
          <HStack spacing={2}>
            <Text mb="0" whiteSpace="nowrap">Currency:</Text>
            <ChakraSelect 
              size="sm" 
              defaultValue="USD"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
            </ChakraSelect>
          </HStack>
        </Flex>
      </VStack>
      <Flex justifyContent="flex-end" gap={2} alignItems="center" mt={4}>
        <Button 
          colorScheme="blue" 
          onClick={handleSave}
        >
          Save
        </Button>
        <Button variant="ghost" onClick={onClose}>Annuler</Button>
        </Flex>
    </Box>
  );
};

export default ActionForm;