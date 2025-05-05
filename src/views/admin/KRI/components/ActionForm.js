import React, { useEffect, useState } from 'react';
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
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { AddActionKRI } from 'redux/actionKRI/action';
import { listActionsKRI } from 'redux/actionKRI/action';
import { AddHistoryKRI } from 'redux/historyKri/action';

const ActionForm = ({ onClose, isActionTab = false, kriData, profilesOptions, formDataHistory, dateFormatee }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
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

  const resetFields = () => {
    setFormData({
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
    })
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '32px',
      height: '32px',
      fontSize: '12px'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '12px',
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

  const handleSave = async () => {
    setIsLoading(true)
    const dataToSave = {
      ...formData,
      owner: formData.owner.label,
      nominee: formData.nominee.label,
      reviewer: formData.reviewer.label,
      idKeyIndicator: kriData._id,
      idEntity: kriData.entityReference
    }
    console.log('Form data:', dataToSave);
    await dispatch(AddActionKRI(dataToSave));
    await dispatch(AddHistoryKRI({...formDataHistory, periode: dateFormatee}));
    dispatch(listActionsKRI(kriData._id));
    resetFields()
    onClose();
  };

  return (
    <>
      <Flex gap={6} flexWrap="wrap" fontSize='12px'>
        {isActionTab && (
          <>
            {/* TABLE DES ACTIONS */}
            <Box flex="1" minW="45%" fontSize='12px'>
              <Table variant="simple" size="sm" fontSize='12px'>
                <Thead bg="blue.100" fontSize='12px'>
                  <Tr>
                    <Th textTransform="none" fontSize='12px'>Action Ref.</Th>
                    <Th textTransform="none" fontSize='12px'>Description</Th>
                    <Th textTransform="none" fontSize='12px'>Target / Completion Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td colSpan={3} textAlign="center" fontSize='12px'>
                      No data to display
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </>
        )}
        <Box flex="1" minW="50%" p={4}>
          <VStack align="start" spacing={3}>
            <Flex flexDirection='column' gap={4} w="100%" fontSize='12px'>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Originating Risk Ref:</Text>
                <Input size="sm" isReadOnly />
              </Flex>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Action State:</Text>
                <Input size="sm" isReadOnly />
              </Flex>
            </Flex>

            <Flex flexDirection='column' gap={4} w="100%" fontSize='12px'>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Source:</Text>
                <Input size="sm" isReadOnly value="Compliance" />
              </Flex>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Priority:</Text>
                <Input size="sm" value="1: High" isReadOnly />
              </Flex>
            </Flex>

            <Flex w="100%" fontSize='12px'>
              <Text w="40%" fontSize='12px'>Description:</Text>
              <Textarea
                size="sm"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Flex>

            {/* Onglets */}
            <Tabs variant="solid-rounded" colorScheme="blue" w="100%" fontSize='12px'>
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
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Owner:</Text>
                <Box w="100%" fontSize='12px'>
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
              </Flex>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Nominee:</Text>
                <Box w="100%" fontSize='12px'>
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
              </Flex>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Reviewer:</Text>
                <Box w="100%" fontSize='12px'>
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
              </Flex>
              <Flex flex="1" fontSize='12px'>
                <Text w="40%" fontSize='12px'>Review Date:</Text>
                <Input
                  size="sm"
                  type="date"
                  name="reviewDate"
                  value={formData.reviewDate}
                  onChange={handleInputChange}
                />
              </Flex>
            </Flex>

            <Flex flexDirection='column' gap={4} flexWrap="wrap" w="100%" fontSize='12px'>
              <HStack spacing={2}>
                <Checkbox />
                <Text w="33%" mb="0" whiteSpace="nowrap" fontSize='12px'>Target Date:</Text>
                <Input
                  size="sm"
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleInputChange}
                />
              </HStack>
              <HStack spacing={2}>
                <Text w="40%" mb="0" whiteSpace="nowrap" fontSize='12px'>Cost:</Text>
                <Input
                  size="sm"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                />
              </HStack>
              <HStack spacing={2}>
                <Text w="40%" mb="0" whiteSpace="nowrap" fontSize='12px'>Currency:</Text>
                <ChakraSelect
                  size="sm"
                  defaultValue="USD"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="USD" fontSize='12px'>USD</option>
                  <option value="EUR" fontSize='12px'>EUR</option>
                  <option value="XAF" fontSize='12px'>XAF</option>
                </ChakraSelect>
              </HStack>
            </Flex>
          </VStack>
          <Flex justifyContent="flex-end" gap={2} alignItems="center" mt={4}>
            <Button
              colorScheme="blue"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Save in progress ...' : 'Save'} 
            </Button>
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default ActionForm;