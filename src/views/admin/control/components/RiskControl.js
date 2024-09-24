import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Checkbox,
} from '@chakra-ui/react';
import GeneralForm from './GeneralForm'; // Adjust the path as needed

const RiskControl = () => {
  const [formData, setFormData] = useState({
    controlRef: "CTAB097",
    controlCategory: "Preventive",
    description: "Savoir que le client peut...",
    nominee: "Database Administrator",
    reviewer: "Database Administrator",
    reviewDate: "",
    frequency: "N/A",
    lastOperator: "",
    nextOperation: "",
    keyControl: false,
    activeControl: true,
  });

  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!formData.controlRef || !formData.nominee || !formData.reviewer) {
      toast({
        title: "Error.",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log('Form submitted:', formData);
    // Here you can add logic to send the form data to an API or handle it as needed
    toast({
      title: "Success!",
      description: "Form submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="container" p={5}>
      <Heading as="h1" mb={4}>Risk Control</Heading>
      
      <Table variant="simple" mb={6}>
        <Thead bg="blue.100"> 
          <Tr>
            <Th>Ref</Th>
            <Th>Description</Th>
            <Th>Active</Th>
            <Th>Key Ctrl</Th>
            <Th>Last Assess. Date</Th>
            <Th>Last Assess. Design</Th>
            <Th>Last Assess. Performance</Th>
            <Th>Last Assess. Creator</Th>
            <Th>Last Assess. Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{formData.controlRef}</Td>
            <Td>{formData.description}</Td>
            <Td>
              <Checkbox 
                isChecked={formData.activeControl} 
                onChange={handleChange} 
                name="activeControl" 
              />
            </Td>
            <Td>{formData.keyControl ? 'Y' : 'N'}</Td>
            <Td>Acceptable</Td>
            <Td>Not Assessed</Td>
            <Td>Not Attended</Td>
            <Td>---</Td>
            <Td>---</Td>
          </Tr>
        </Tbody>
      </Table>

      <Tabs variant="soft-rounded" colorScheme="green" mt={6} index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Details</Tab>
          <Tab>History</Tab>
          <Tab>Documents</Tab>
          <Tab>Actions</Tab>
          <Tab>Risk focus</Tab>
          <Tab>Risks logs</Tab>
          <Tab>Linked items</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Import the GeneralForm component */}
            <GeneralForm 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
            />
          </TabPanel>
          {/* Additional TabPanels for other tabs can go here */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RiskControl;
